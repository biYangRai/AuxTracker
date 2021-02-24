import { useState, useEffect, useRef, useLayoutEffect } from "react";

const Total = ({ totalIsRunning, totalSeconds, setTotalSeconds, getTime }) => {
  //timer
  // useEffect(() => {
  //   if (totalIsRunning) {
  //     const id = window.setInterval(() => {
  //       setTotalSeconds((totalSeconds) => totalSeconds + 1);
  //     }, 1000);
  //     return () => window.clearInterval(id);
  //   }
  //   return undefined;
  // }, [totalIsRunning]);

  const requestRef = useRef();
  const previousTimeRef = useRef();

  const animate = (time) => {
    if (previousTimeRef.current != undefined) {
      const deltaTime = time - previousTimeRef.current;

      // Pass on a function to the setter of the state
      // to make sure we always have the latest state
      setTotalSeconds((totalSeconds) => totalSeconds + deltaTime * 0.001);
    }
    previousTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animate);
  };

  useLayoutEffect(() => {
    if (totalIsRunning) {
      requestRef.current = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(requestRef.current);
    }
  }, [totalIsRunning]); // Make sure the effect runs

  return (
    <div className="card-container">
      <h2>Total Time</h2>
      <p>{getTime(totalSeconds)}</p>
    </div>
  );
};
export default Total;
