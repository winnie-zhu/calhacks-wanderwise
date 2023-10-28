import NavigationBar from "../Components/NavigationBar";
import "../App.css";
import './Results.css';
import { Component } from "react";

class TextBlock extends Component {
  render() {
    let backgroundColor= "#AAAAAA";
    if(this.props.type === "activity") {
      backgroundColor = "#AA0000";
    } else if(this.props.type === "food") {
      backgroundColor = "#0000AA";
    } else if(this.props.type === "airport") {
      backgroundColor = "#00AA00";
    }
    return (
      <div className="text-box" style={{backgroundColor: backgroundColor}}>
        <h2>{this.props.text}</h2>
      </div>
    )
  }
}

class ScrollContainer extends Component {
 render() {
  return (
    <div className="scroll-container">
       <div className="day-itinerary">
        <h1>Day {this.props.day}</h1>
        <hr/>
        <TextBlock text={"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ultricies tristique nulla aliquet enim tortor at auctor urna nunc."}/>
        <TextBlock text={"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. In nulla posuere sollicitudin aliquam."}/>
        <TextBlock text={"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. In nulla posuere sollicitudin aliquam."}/>
        <TextBlock text={"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. In nulla posuere sollicitudin aliquam."}/>
        <TextBlock text={"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. In nulla posuere sollicitudin aliquam."}/>
        <TextBlock text={"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. In nulla posuere sollicitudin aliquam."}/>
        <TextBlock text={"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Et aliquet incididunt tortor."}/>
        <div className="price">
          <h2>Price: </h2>
        </div>
      </div>

    </div>
  );
 }
}

function Results() {
  return (
    <>
    <NavigationBar />
    <div className="page-container">
      <ScrollContainer day={1}/>
      <ScrollContainer day={2}/>
      <ScrollContainer day={3}/>
      <ScrollContainer day={4}/>
      <ScrollContainer day={5}/>
      <ScrollContainer day={6}/>
      <ScrollContainer day={7}/>
    </div>
    </>
  );
}

export default Results;
