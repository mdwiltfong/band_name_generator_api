import { useState } from "react";
import "./App.css";
import axios from "axios";
import BandName from "./component/BandName";
import { useEffect } from "react/cjs/react.development";
/* const adjectives = ["Lilac", "Scary", "Enormous", "Blind", "Hopeful", "Warped", "Vintage", "Great", "Terrible", "Dental", "Filthy", "Brainy", "Cosmic", 
                    "Discretionary", "Slushy", "Opaque", "Wet", "Conspiratorial", "Aluminum", "Brave", "Heartbroken", "Miserable", "Holy", "Plucky", "Sympathetic", "Brass"] 
const nouns = ["Octopi", "Happiness", "Shrubbery", "Bracelets", "Code", "Soap", "Cans", "Messages", "Lighter", "Bass", "Puppies", "Courts", "Pages", "Gasps", "Pendulum",
                "Film", "Bigfoot", "Sons", "Stopwatch", "Cartographer", "Plothole", "Error", "Bass", "Bottle", "Engine", "Landmine", "Sumbarine", "Drugs"]
function GenerateBandName() {

  function randomAjective() {
    return adjectives[(Math.floor(Math.random() * adjectives.length))]

}

function randomNoun() {
    return nouns[(Math.floor(Math.random() * nouns.length))]

}
    return `Hey, we should call the band The ${randomAjective() +  ' ' + randomNoun()}.`
}
 */

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
      </header>
    </div>
  );
};

export default App;
