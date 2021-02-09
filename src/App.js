//import style
import "./styles/app.scss";

//Adding components
import TimeHolder from "./components/TimeHolder";
import Card from "./components/Card";

function App() {
  return (
    <div className="App">
      <Card />
      <TimeHolder />
    </div>
  );
}

export default App;
