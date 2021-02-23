import { useState, useEffect } from "react";

const Current = ({ isRunning, seconds, setSeconds, getTime }) => {
  //timer
  useEffect(() => {
    if (isRunning) {
      const id = window.setInterval(() => {
        setSeconds((seconds) => seconds + 1);
      }, 1000);
      return () => window.clearInterval(id);
    }
    return undefined;
  }, [isRunning]);

  return (
    <div className="card-container">
      <h2>Current Aux</h2>
      <p>{getTime(seconds)}</p>
    </div>
  );
};
export default Current;
