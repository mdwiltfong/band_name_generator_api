import axios from "axios";
import React, { useEffect, useState } from "react";
import "./component_styles/LikeButton.css";
export default function LikeButton(props) {
  const [likes, setLikes] = useState(props.likes);
  const [isClicked, setIsClicked] = useState(false);
  const [count, setCount] = useState(0);
  function upVote() {
    setCount((prevState) => prevState + 1);
    setIsClicked(true);
  }
  function downVote() {
    setCount((prevState) => prevState - 1);
    setIsClicked(true);
  }
  useEffect(() => {
    if (isClicked) {
      const incomingLikes = setTimeout(() => {
        axios
          .post(`http://localhost:8000/bandname/like/${props.id}`, {
            likes: count,
          })
          .then(setIsClicked(false))
          .then(console.log("post", count));
      }, 1000);
      return () => {
        clearTimeout(incomingLikes);
        console.log("clear");
      };
    }
  }, [count]);
  return (
    <>
      <p>{props.bandname}</p>
      <span className="like_buttons">
        <button onClick={upVote}> UpVote </button> <p> {likes + count} </p>
        <button onClick={downVote}> DownVote </button>{" "}
      </span>
    </>
  );
}
