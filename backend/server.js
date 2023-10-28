const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const request = require('request');

const MindsDB = require("mindsdb-js-sdk");

dotenv.config({ path: '.env' });

const mdbUser = {
    mdbUser: process.env.MINDSDB_USER,
    password: process.env.MINDSDB_PASS,
};

const connectToMindsDB = async (mdbUser) => {
    await MindsDB.default.connect(mdbUser);
};

const getItinerary = async (location, numDays) => {
    const model = await MindsDB.default.Models.getModel(
        "openai",
        "project_itinerary"
    );

    const queryOptions = {
        where: [`text_long = "Create a ${numDays}-day itinerary for ${location}"`],
    };

    const prediction = await model.query(queryOptions);
    const x = await model.describe();
    console.log("hello", x);
    return prediction;
};

const app = express();
app.use(cors(({origin: "*"})));
app.use(bodyParser.urlencoded({extended: false,}));
app.use(bodyParser.json());
app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Access-Control-Allow-Origin: *",
        "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization"
    );
    next();
});

app.get("/", function (req, res) {
    return res.json("Hello world!");
});

app.post("/itinerary", async function (req, res) {
    console.log("IN POST!!!!");
    let text = req.body.text;
    try {
        await connectToMindsDB(mdbUser);
        let itinerary = await getItinerary(text);
        res.json("hello in /itinerary");
    } catch (error) {
        console.log(`Error: ${error}`);
        res.json(error);
    }
});

// Run the API
const port = 9000;
app.listen(port, () => {
    console.log(`Listening at Port ${port}`);
});


module.exports = app;