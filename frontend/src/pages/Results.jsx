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

class ScrollContainer extends Component {
  render() {
    return (
      <div className="scroll-container">
        <div className="day-itinerary">
          <h1>Day {this.props.day}</h1>
          <hr />
          <div>
            {tempArr.map((id) => {
              return <TextBlock text={filler_text} category="airport" />;
            })}
          </div>
          <div className="price">
            <h2>Price: </h2>
          </div>
        </div>
      </div>
    );
  }
}

function Results() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("http://localhost:9000/itinerary")
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);

  return (
    <>
      <NavigationBar />
      <div className="page-container">
        {console.log("data",data)}
        {data !== null ? console.log(data[1][1].category) : null}
        {/* {data !== null ?
          data.forEach((day) => {
            console.log(day)
          })
          :console.log("hello")
        } */}
        {/* {data !== null ?  console.log(Object.keys(data.json())) : null} */}
        {tempArr.map((id) => {
          return <DayCard key={id} day={id + 1} />;
        })}
      </div>
    </>
  );
}

export default Results;
