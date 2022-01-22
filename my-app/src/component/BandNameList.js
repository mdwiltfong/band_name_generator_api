import axios from "axios";
import React, { useState } from "react";

export default function BandNameList() {
  function handleClick() {}

  return (
    <>
      <button
        className="App-button"
        type="button"
        id="button"
        onClick={handleClick}
      >
        What should we call the band?
      </button>
    </>
  );
}
