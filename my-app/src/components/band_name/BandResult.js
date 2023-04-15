import axios from "axios";
import { useState, useEffect } from "react";

const BandResult = ({ bandName, setBandName }) => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    setMessage("");
  }, [bandName]);

  async function addBand(bandName) {
    try {
      await axios.post("http://localhost:8000/band/add", {
        bandName,
      });
      setMessage(`Nice! it's in our database!`);
    } catch (error) {
      console.log(error);
      setMessage(`Something went wrong.`);
    }
  }

  async function handleClick(e) {
    e.preventDefault();
    await addBand(bandName);
  }

  function clearData() {
    setMessage("");
    setBandName("");
  }

  return (
    <div className="band-result">
      <div>Hey, we should call the band {bandName}</div>
      <button data-testid="add-band-btn" onClick={handleClick}>
        Add Band
      </button>
      <div className="App-message">{message}</div>
      {message && <button onClick={clearData}>Ok!</button>}
    </div>
  );
};

export default BandResult;
