import React from "react";

function PopUp(props) {
  return (
    <div className="popup-box">
      <div className="box">{props.content}</div>
    </div>
  );
}

export default PopUp;
