import { useState, useEffect } from "react";

const Total = ({
  totalIsRunning,
  setTotalIsRunning,
  totalSeconds,
  setTotalSeconds,
  getTime,
}) => {
  //timer
  useEffect(() => {
    if (totalIsRunning) {
      const id = window.setInterval(() => {
        setTotalSeconds((totalSeconds) => totalSeconds + 1);
      }, 1000);
      return () => window.clearInterval(id);
    }
    return undefined;
  }, [totalIsRunning]);

  return (
    <div className="card-container">
      <h2>Total Time</h2>
      <p>{getTime(totalSeconds)}</p>
    </div>
  );
};
export default Total;
