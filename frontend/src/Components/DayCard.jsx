import TextBlock from "./TextBlock";

function DayCard({day, events}) {
  return (
    <div className="scroll-container">
      <div className="day-itinerary">
        <h1>Day {day}</h1>
        <hr />
        <div>
          {events.map((id) => {
            {console.log(id)}
            return <TextBlock key={id} text={id.description} category={id.category} />;
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
