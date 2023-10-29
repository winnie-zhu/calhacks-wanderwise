import NavigationBar from "../Components/NavigationBar";
import "../App.css";
import "./Results.css";
import DayCard from "../Components/DayCard";
import { useState, useEffect } from "react";

function Results() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("http://localhost:9000/itinerary")
      .then((response) => response.json())
      .then((dataResponse) => setData(Object.values(dataResponse)))
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <>
        <NavigationBar />
        <div className="page-container"></div>
      </>
    );
  } else {
    return (
      <>
        <NavigationBar />
        <div className="page-container">
          {data.map((key, index) => {
            // {console.log(key, index)}
            // {console.log(key)}
            return <DayCard key={key} day={index + 1} events={key} />;
          })}
          {/* {console.log(Object?.entries(data))} */}
        </div>
      </>
    );
  }
}

export default Results;
