import { useState } from "react";

const TimeHolder = () => {
  //state
  const [timeInfo, setTimeInfo] = useState({
    timerOn: false,
    timerStart: 0,
    timerTime: 0,
  });

  return (
    <div className="button-container">
      <div className="button1">
        <h2>Total Time</h2>
        <p>Timer1</p>
      </div>
      <div className="button2">
        <h2>Total Available</h2>
        <p>Timer2</p>
      </div>
      <div className="button3">
        <h2>Current Aux</h2>
        <p>Timer3</p>
      </div>
    </div>
  );
};

export default TimeHolder;
