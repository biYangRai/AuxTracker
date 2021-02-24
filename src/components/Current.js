import { useState, useEffect, useLayoutEffect, useRef } from "react";

const Current = ({ isRunning, seconds, setSeconds, getTime }) => {
  //timer
  // useEffect(() => {
  //   if (isRunning) {
  //     const id = window.setInterval(() => {
  //       setSeconds((seconds) => seconds + 1);
  //     }, 1000);
  //     return () => window.clearInterval(id);
  //   }
  //   return undefined;
  // }, [isRunning]);

  // useEffect(() => {
  //   if (isRunning) {
  //     const id = window.setInterval(() => {
  //       setSeconds(() => Date.now() - new Date(currentStartTime).getTime());
  //     }, 1000);
  //     return () => window.clearInterval(id);
  //   }
  //   return undefined;
  // }, [isRunning]);

  // Use useRef for mutable variables that we want to persist
  // without triggering a re-render on their change
  const requestRef = useRef();
  const previousTimeRef = useRef();

  const animate = (time) => {
    if (previousTimeRef.current != undefined) {
      const deltaTime = time - previousTimeRef.current;

      // Pass on a function to the setter of the state
      // to make sure we always have the latest state
      setSeconds((seconds) => seconds + deltaTime * 0.001);
    }
    previousTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animate);
  };

  useLayoutEffect(() => {
    if (isRunning) {
      requestRef.current = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(requestRef.current);
    }
  }, [isRunning]); // Make sure the effect runs only once

  return (
    <div className="card-container">
      <h2>Current Aux</h2>
      <p>{getTime(seconds)}</p>
    </div>
  );
};
export default Current;
