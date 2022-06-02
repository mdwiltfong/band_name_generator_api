import axios from "axios";
import { useState } from "react";
import Band from "./Band";
export default function BandList() {
  const [bands, setBands] = useState([]);
  const [display, setDisplay] = useState(false);

  async function getBands() {
    const response = await axios.get("http://localhost:8000/band/bands");
    return response.data.bands;
  }
  async function handleClick(e) {
    e.preventDefault();

    if (!display) {
      const bands = await getBands();
      setBands(bands);
    }

    setDisplay(!display);
  }
  return (
    <div className="band-list">
      <button
        className="App-button"
        type="button"
        id="button"
        onClick={handleClick}
      >
        {display
          ? `Hide List of upvoted band names`
          : ` See a list of upvoted band names!`}
      </button>
      <div className="bands">
        {display &&
          bands.map((band, i) => {
            return <Band band={band} key={i} />;
          })}
      </div>
    </div>
  );
}
