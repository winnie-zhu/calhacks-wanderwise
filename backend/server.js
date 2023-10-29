const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const Sequelize = require("sequelize-cockroachdb");
const cors = require("cors");

const MindsDB = require("mindsdb-js-sdk").default;

dotenv.config({ path: ".env" });

const connectToMindsDB = async () => {
  try {
    await MindsDB.connect({
      user: process.env.MINDSDB_USER,
      password: process.env.MINDSDB_PASS,
    });
  } catch (error) {
    console.log(`Error: ${error}`);
  }
};

// Connect to CockroachDB through Sequelize.
const sequelize = new Sequelize({
  username: process.env.COCKROACHLABS_USER,
  password: process.env.COCKROACHLABS_PASS,
  host: process.env.COCKROACHLABS_HOST,
  port: process.env.COCKROACHLABS_PORT,
  database: process.env.COCKROACHLABS_DB,
  logging: false,
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      // ca: process.env.COCKROACHLABS_CERT,
    },
  },
});

// defining the model
const Trip = sequelize.define("trip", {
  trip_id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  numDays: {
    type: Sequelize.INTEGER,
  },
  location: {
    type: Sequelize.STRING,
  },
  email: {
    type: Sequelize.STRING,
  },
});

const Day = sequelize.define("day", {
  trip_id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  dayNum: {
    type: Sequelize.INTEGER,
    primaryKey: true,
  },
});

const Event = sequelize.define("event", {
  trip_id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  dayNum: {
    type: Sequelize.INTEGER,
    primaryKey: true,
  },
  description: {
    type: Sequelize.STRING,
  },
  category: {
    type: Sequelize.STRING,
  },
});

const convertAnswer = (itinerary) => {
  const itineraryLines = itinerary.answer.split("\n");
  const itineraryData = [];
  let currentDay = null;

  for (const line of itineraryLines) {
    if (line.startsWith("Day ")) {
      currentDay = {
        day: parseInt(line.replace(/\D/g, ""), 10),
        activities: [],
        foodRecommendations: [],
      };
      itineraryData.push(currentDay);
    } else if (line.startsWith("Activities:")) {
      currentDay.activities = [];
    } else if (line.startsWith("Food Recommendations:")) {
      currentDay.foodRecommendations = [];
    } else if (line.trim() !== "") {
      const textWithoutNumbering = line.replace(/^\d+\.\s*/, ""); // Remove numbering
      if (currentDay.activities.length < 4) {
        currentDay.activities.push(textWithoutNumbering.trim());
      } else {
        currentDay.foodRecommendations.push(textWithoutNumbering.trim());
      }
    }
  }

  return itineraryData;
};

const getItinerary = async (data) => {
  const query = `SELECT question, answer
    FROM project_itinerary.openai
    WHERE question = 'Create a ${data.numDays}-day itinerary for ${data.location}
        separated by day with 4 activities and 3 food recommendations.'
    USING max_tokens=2000;
    `;
  try {
    const queryResult = await MindsDB.SQL.runQuery(query);
    if (queryResult.rows.length > 0) {
      const matchingUserRow = queryResult.rows[0];
      return convertAnswer(matchingUserRow);
    }
  } catch (error) {}
  return query;
};

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get("/", function (req, res) {
  return res.json("Hello world!");
});

app.get("/itinerary", async function (req, res) {
  try {
    const events = await Event.findAll();
    console.log("events:", events);
    const separatedData = events.reduce((result, item) => {
      const dayNum = item.dayNum;

      if (!result[dayNum]) {
        result[dayNum] = [];
      }

      result[dayNum].push(item);
      return result;
    }, {});

    res.json(separatedData);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});



app.post("/itinerary", async function (req, res) {
  let text = req.body;
  console.log("req body:", text);
  await connectToMindsDB();
  console.log("connected to minds");
  let itinerary = await getItinerary(text);
  console.log("itinerary:", itinerary);
  await sendTrip(text);
  await sendDayAndEvents(itinerary);
  res.json(itinerary);
});

const sendTrip = async (body) => {
  try {
    await Trip.destroy({ where: {} });
    const cypher = await Trip.create({
      // trip_id: body.trip_id,
      numDays: body.numDays,
      location: body.location,
      email: null,
    });
    console.log("trip:", cypher);
  } catch (error) {
    console.log(error);
  }
};

const sendDayAndEvents = async (data) => {
  try {
    await Day.destroy({ where: {} });
    await Event.destroy({ where: {} });
    for (i = 0; i < data.length; i++) {
      const day6 = await Day.create({
        // trip_id: data.trip_id,
        dayNum: data[i].day,
      });
      // console.log("day:", day6);

      for (j = 0; j < data[i].activities.length; j++) {
        const event = await Event.create({
          // trip_id: data.trip_id,
          dayNum: data[i].day,
          description: data[i].activities[j],
          category: "activity",
        });
        // console.log("event:", event);
      }

      for (k = 0; k < data[i].foodRecommendations.length; k++) {
        const event = await Event.create({
          // trip_id: data.trip_id,
          dayNum: data[i].day,
          description: data[i].foodRecommendations[k],
          category: "food",
        });
        // console.log("event:", event);
      }
    }
  } catch (error) {
    console.log(error);
  }
};

// app.post("/test", async function (req, res) {
//   try {
//     await Day.sync({ force: true });
//     console.log("table created????");
//   } catch (error) {
//     console.log(error);
//   }
// });

// Run the API
const port = 9000;
app.listen(port, () => {
  console.log(`Listening at Port ${port}`);
});

module.exports = app;
