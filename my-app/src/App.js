import { useState } from "react";
import "./App.css";
import axios from "axios";
import BandName from "./component/BandName";
import BandNameList from "./component/BandNameList";
import { useEffect } from "react/cjs/react.development";
const App = () => {
  const [bandname, setBandname] = useState();
  const [triggerApiCall, setTriggerApiCall] = useState(false);

  function handleClick(e) {
    e.preventDefault();
    setTriggerApiCall(true);
    setBandname(undefined);
  }

  useEffect(() => {
    if (!bandname && triggerApiCall === true) {
      setTriggerApiCall(false);
      axios.get("http://localhost:8000/bandname/random").then((resp) => {
        setBandname(resp.data.bandName);
      });
    }
  }, [bandname, triggerApiCall]);

  return (
    <div className="App">
      <header className="App-header">
        <button
          className="App-button"
          type="button"
          id="button"
          onClick={handleClick}
        >
          What should we call the band?
        </button>
        <span className="App-message">
          {bandname != null ? (
            <BandName bandname={bandname} setBandname={setBandname} />
          ) : null}
        </span>
        <BandNameList />
      </header>
    </div>
  );
};

export default App;
