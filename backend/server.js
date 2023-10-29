const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

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

const convertAnswer = (itinerary) => {
    const itineraryLines = itinerary.answer.split('\n');
    const itineraryData = [];
    let currentDay = null;

    for (const line of itineraryLines) {
        if (line.startsWith('Day ')) {
            currentDay = {
            day: line,
            activities: [],
            foodRecommendations: [],
            };
            itineraryData.push(currentDay);
        } else if (line.startsWith('Activities:')) {
            currentDay.activities = [];
        } else if (line.startsWith('Food Recommendations:')) {
            currentDay.foodRecommendations = [];
        } else if (line.trim() !== '') {
            const textWithoutNumbering = line.replace(/^\d+\.\s*/, ''); // Remove numbering
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
  const query =
    `SELECT question, answer
    FROM project_itinerary.openai
    WHERE question = 'Create a ${data.numDays}-day itinerary for ${data.location}
        separated by day with 4 activities and 3 food recommendations.'
    USING max_tokens=3000;
    `;
    try {
        const queryResult = await MindsDB.SQL.runQuery(query);
        if (queryResult.rows.length > 0) {
            const matchingUserRow = queryResult.rows[0];
            return convertAnswer(matchingUserRow);
        }
    } catch (error) {
}
return query;
};

const app = express();

app.use(bodyParser.json());

app.get("/", function (req, res) {
  return res.json("Hello world!");
});

app.post("/itinerary", async function (req, res) {
  let text = req.body;
  console.log("req body:", text);
  // try {
  await connectToMindsDB();
  console.log("connected to minds");
  let itinerary = await getItinerary(text);
  res.json(itinerary);
});

app.get("/itnerary", function (req, res) {
  
})

// Run the API
const port = 9000;
app.listen(port, () => {
  console.log(`Listening at Port ${port}`);
});

module.exports = app;
