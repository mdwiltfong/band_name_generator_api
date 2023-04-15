import axios from "axios";
import React from "react";
import BandResult from "./BandResult";
import { useState } from "react";
export default function BandName() {
  const [bandName, setBandName] = useState("");

  async function getRandomBandName() {
    const response = await axios.get("http://localhost:8000/band/randomName", {
      withCredentials: true,
    });
    return response.data.bandName;
  }

  async function handleClick(e) {
    e.preventDefault();
    const randomBandName = await getRandomBandName();
    setBandName(randomBandName);
  }

  return (
    <>
      <button
        className="App-button"
        type="button"
        id="button"
        onClick={handleClick}
        data-testid="generate-btn"
      >
        What should we call the band?
      </button>
      {bandName && <BandResult bandName={bandName} setBandName={setBandName} />}
    </>
  );
}
