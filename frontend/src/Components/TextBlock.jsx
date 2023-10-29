import "./TextBlock.css";

const categories = ["activity", "food", "airport"];

function TextBlock(props) {
  //   const backgroundColor = color_map[props.type] || color_map["default"];

  const color = categories.includes(props.category) ? props.category : "default";
  return (
    <div className={"text-box " + color}>
      <div className="text-content">
        <h2>{props.text}</h2>
      </div>
    </div>
  );
}

export default TextBlock;
