import TextBlock from "./TextBlock";


const filler_text =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. In nulla posuere sollicitudin aliquam.";
const tempArr = [0, 1, 2, 3, 4, 5, 6, 7];
function DayCard(props) {
  return (
    <div className="scroll-container">
      <div className="day-itinerary">
        <h1>Day {props.day}</h1>
        <hr />
        <div>
          {tempArr.map((id) => {
            return <TextBlock key={id} text={filler_text} category="airport" />;
          })}
        </div>
        <div className="price">
          <h2>Price: </h2>
        </div>
      </div>
    </div>
  );
}

export default DayCard;
