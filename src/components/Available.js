import { useState, useEffect, useRef, useLayoutEffect } from "react";

const Avaiable = ({
  availIsRunning,
  availSeconds,
  setAvailSeconds,
  requestRef,
  requestAvailRef,
}) => {
  //timer
  // useEffect(() => {
  //   if (availIsRunning) {
  //     const id = window.setInterval(() => {
  //       setAvailSeconds((availSeconds) => availSeconds + 1);
  //     }, 1000);
  //     return () => window.clearInterval(id);
  //   }
  //   return undefined;
  // }, [availIsRunning]);

  useEffect(() => {
    if (availIsRunning) {
      const id = window.setInterval(() => {
        setAvailSeconds(
          requestAvailRef.current > 0
            ? requestAvailRef.current +
                (Date.now() - new Date(requestRef.current).getTime())
            : Date.now() - new Date(requestRef.current).getTime()
        );
      }, 1000);
      return () => window.clearInterval(id);
    }
    return undefined;
  }, [availIsRunning]);

  //get time in HH:MM:SS format
  const getTime = (time) => {
    return (
      ("0" + Math.floor((time / 3600000) % 24)).slice(-2) +
      ":" +
      ("0" + Math.floor((time / 60000) % 60)).slice(-2) +
      ":" +
      ("0" + Math.floor((time / 1000) % 60)).slice(-2)
    );
  };

  return (
    <div className="card-container">
      <h2>Available Time</h2>
      <p>{getTime(availSeconds)}</p>
    </div>
  );
};
export default Avaiable;
