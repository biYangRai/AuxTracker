//import dependencies
import { useState, useRef } from "react";
import { v4 as uuidv4 } from "uuid";

//import style
import "./styles/app.scss";
//import Json
import Data from "./data.json";

//Adding components
import Total from "./components/Total";
import Avaiable from "./components/Available";
import Current from "./components/Current";
import Table from "./components/CustomizedTables";
import axios from "axios";
// import { response } from "express";

//drop menu
const options = [
  { value: "Available", label: "1-Available", uId: uuidv4() },
  { value: "In a Meeting", label: "1-In a Meeting", uId: uuidv4() },
  { value: "Lunch", label: "1-Lunch", uId: uuidv4() },
  { value: "Offline", label: "1-Offline", uId: uuidv4() },
];

// const firstOnlineTime = { startTime: 0 };

function App() {
  //state
  const [selectedOption, setSelectedOption] = useState(options[3]);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [totalIsRunning, setTotalIsRunning] = useState(false);
  const [availSeconds, setAvailSeconds] = useState(0);
  const [availIsRunning, setAvailIsRunning] = useState(false);
  const [auxData, setAuxData] = useState(Data);

  const requestRef = useRef();
  const requestAvailRef = useRef();
  // let requestAvailRefLength = requestAvailRef.current.hasOwnProperty.length;
  ///////////////////////////////////
  //Event Handler - it holds the all logics.
  const auxChangeHandler = (e) => {
    setSelectedOption(options.find((option) => option.value == e.target.value));
    // console.log("prev: ", { selectedOption });
    let currentAux = e.target.value;
    //logic to run the timer based on Aux type selected
    //Perform the CURD operation on the first if statment
    if (currentAux != "Offline") {
      setIsRunning(true);
      setSeconds(0);
      addTime();
    } else {
      setIsRunning(false);
      setSeconds(0);
      addTime();
    }
    //timer for Total card
    if (currentAux != "Offline") {
      setTotalIsRunning(true);
      console.log("asdsadsasdsa");
    } else {
      setTotalIsRunning(false);
    }
    //timer for Available card
    if (currentAux == "Available") {
      setAvailIsRunning(true);
      requestRef.current = Date.now();
    } else {
      setAvailIsRunning(false);
      requestAvailRef.current = availSeconds;
      console.log(requestAvailRef);
    }
    //passing current aux into auxColor function
  };

  ///////////////////////////////////
  //Add Time
  const addTime = () => {
    //create a new time object
    let newTimeRow = {
      id: uuidv4(),
      Aux: selectedOption.value,
      Duration: getTime(seconds),
      TimeStamp: new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }).format(Math.floor(Date.now())),
    };
    //Merged new time row to old time rows
    let timeRow = [...auxData, newTimeRow];
    setAuxData(timeRow);
    //write to Json
    saveJson(timeRow);
  };

  //get time in HH:MM:SS format
  const getTime = (time) => {
    return (
      ("0" + Math.floor((time / 3600) % 24)).slice(-2) +
      ":" +
      ("0" + Math.floor((time / 60) % 60)).slice(-2) +
      ":" +
      ("0" + Math.floor(time % 60)).slice(-2)
    );
  };

  //This function change the color as per aux selected
  const auxColor = () => {
    let currentAux = selectedOption.value;
    let className = "";

    if (currentAux == "Available") {
      className = "classGreen";
    } else if (currentAux == "In a Meeting") {
      className = "classRed";
    } else if (currentAux == "Lunch") {
      className = "classYellow";
    } else {
      className = "classGrey";
    }
    return className;
  };

  //////////////////////////////////
  //write to JSON File
  //this function will recieve all updated state/time entries after every aux change
  const saveJson = (posts) => {
    //api URL //end point from node server / express server
    const url = "http://localhost:5000/write";
    axios.post(url, posts).then((response) => {
      //console.log(response);
    });
  };

  /////////////////////////////////////////////////

  //////////////////////////////////
  //Main Render
  return (
    <div className="App">
      <div className="drop-options">
        <div className="logo"></div>
        <h1>Activity Tracker Central</h1>
        <div className="drop-select">
          <div className={auxColor()}></div>
          <select
            value={selectedOption.value}
            onChange={auxChangeHandler}
            ref={requestRef}
            ref={requestAvailRef}
          >
            {options.map((option) => (
              <option key={option.uId} value={option.value}>
                {option.value}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="clock-container">
        <Total
          totalIsRunning={totalIsRunning}
          totalSeconds={totalSeconds}
          setTotalSeconds={setTotalSeconds}
          getTime={getTime}
        />
        <Avaiable
          availIsRunning={availIsRunning}
          availSeconds={availSeconds}
          setAvailSeconds={setAvailSeconds}
          requestRef={requestRef}
          requestAvailRef={requestAvailRef}
        />
        <Current
          seconds={seconds}
          setSeconds={setSeconds}
          isRunning={isRunning}
          getTime={getTime}
        />
      </div>
      {auxData.length == 0 ? null : <Table rows={auxData} />}
    </div>
  );
}

export default App;
