import { useState, useEffect } from "react";

const Avaiable = ({
  availIsRunning,
  setAvailIsRunning,
  availSeconds,
  setAvailSeconds,
  getTime,
}) => {
  //timer
  useEffect(() => {
    if (availIsRunning) {
      const id = window.setInterval(() => {
        setAvailSeconds((availSeconds) => availSeconds + 1);
      }, 1000);
      return () => window.clearInterval(id);
    }
    return undefined;
  }, [availIsRunning]);

  return (
    <div className="card-container">
      <h2>Available Time</h2>
      <p>{getTime(availSeconds)}</p>
    </div>
  );
};
export default Avaiable;
