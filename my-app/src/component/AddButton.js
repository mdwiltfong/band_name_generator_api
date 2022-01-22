import axios from "axios";
import React, { useState } from "react";

export default function AddButton(props) {
  const [error, setError] = useState(false);
  const [added, setAdded] = useState(false);

  function clickHandler() {
    axios
      .post("http://localhost:8001/bandname/add", {
        name: props.bandname,
        likes: 0,
      })
      .then((response) => {
        setAdded(true);
      })
      .catch((error) => {
        setError(true);
        setAdded(false);
      });
  }

  if (!added && !error) {
    return (
      <>
        <button onClick={clickHandler}> Add Band </button>{" "}
      </>
    );
  } else if (error) {
    return <p>Error!</p>;
  } else if (added) {
    return (
      <>
        <p> Nice! it's in our database!</p>
        <button onClick={() => props.setBandname(undefined)}>Ok!</button>
      </>
    );
  } else {
    return <p>We found a bug!</p>;
  }
}
