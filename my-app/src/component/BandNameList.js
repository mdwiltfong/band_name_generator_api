import axios from "axios";
import React, { useEffect, useState } from "react";
import LikeButton from "./LikeButton";
export default function BandNameList() {
  const [bandnames, setBandnames] = useState();
  const [triggerApiCall, setTriggerApiCall] = useState(false);
  function handleClick() {
    setTriggerApiCall((prevState) => !prevState);

    if (bandnames) {
      setBandnames();
    }
  }

  useEffect(() => {
    if (!bandnames && triggerApiCall == true) {
      axios
        .get("http://localhost:8000/bandname/")
        .then((resp) => setBandnames(resp.data));
    }
  }, [triggerApiCall]);

  return (
    <>
      <button
        className="App-button"
        type="button"
        id="button"
        onClick={handleClick}
      >
        {bandnames
          ? `Hide List of upvoted band names`
          : ` See a list of upvoted band names!`}
      </button>
      <ul>
        {bandnames != null
          ? bandnames.map((bandname) => {
              return (
                <LikeButton
                  bandname={bandname.name}
                  likes={bandname.likes}
                  id={bandname.id}
                  key={bandname.id.toString()}
                />
              );
            })
          : null}
      </ul>
    </>
  );
}
