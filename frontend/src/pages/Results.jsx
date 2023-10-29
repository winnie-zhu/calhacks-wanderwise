import NavigationBar from "../Components/NavigationBar";
import "../App.css";
import "./Results.css";
import { Component } from "react";
import TextBlock from "../Components/TextBlock";
import DayCard from "../Components/DayCard";
import { useState, useEffect } from "react";

const filler_text =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. In nulla posuere sollicitudin aliquam.";
const tempArr = [0, 1, 2, 3, 4, 5, 6, 7];

function Results() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:9000/itinerary")
      .then((response) => response.json())
      .then((dataResponse) => setData(Object.values(dataResponse)));
  }, []);

  return (
    <>
      <NavigationBar />
      <div className="page-container">
        {data.map((key, index) => {
          // {console.log(key, index)}
          // {console.log(key)}
          return <DayCard key={key} day={index + 1} events={key}/>;
        })}
        {/* {console.log(Object?.entries(data))} */}
      </div>
    </>
  );
}

export default Results;
