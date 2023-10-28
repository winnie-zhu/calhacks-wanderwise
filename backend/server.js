const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
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

const getItinerary = async (data) => {
  // const database = await MindsDB.Databases.getDatabase("cockroachdb");
  // database.getModel("openai", "project_itinerary");
  const prompt = `Create a ${data.numDays}-day itinerary for ${data.location}`;
  console.log("prompt", prompt);
  const query = `INSERT INTO wwdb.questions (question)
  VALUES ("${prompt}");`;
  try {
    const queryResult = await MindsDB.SQL.runQuery(query);
    if (queryResult.rows.length > 0) {
      const matchingUserRow = queryResult.rows[0];
      // Do something with returned data.
      // {
      //   user: 'raw_unsafe_username',
      //   email: 'useremail@gmail.com',
      //   other_data: 9001,
      //   ...
      // }
    }
  } catch (error) {
    // Something went wrong sending the API request or executing the query.
    console.log(error);
  }

  const model = await MindsDB.Models.getModel("openai", "project_itinerary");
  const queryOptions = {
    where: [
      `text_long = "Create a ${data.numDays}-day itinerary for ${data.location}"`,
    ],
  };

  const prediction = await model.query(queryOptions);
  const x = await model.describe();
  console.log("hello", x);

  return prediction;
};

const app = express();
// app.use(cors({ origin: "*" }));
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(function (req, res, next) {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET, POST, OPTIONS, PUT, PATCH, DELETE"
//   );
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "Access-Control-Allow-Origin: *",
//     "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization"
//   );
//   next();
// });

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
  //   console.log("Itinerary", itinerary);
  //   res.json("hello in /itinerary");
  // } catch (error) {
  //   console.log(`Error: ${error}`);
  //   res.json(error);
  //   const allProjects = await MindsDB.Projects.getAllProjects();
  //   allProjects.forEach((p) => {
  //     console.log(p.name);
  //   });
  // }
});

// Run the API
const port = 9000;
app.listen(port, () => {
  console.log(`Listening at Port ${port}`);
});

module.exports = app;
