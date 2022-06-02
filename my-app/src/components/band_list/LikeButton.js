import axios from "axios";
import React, { useEffect, useState } from "react";
import "../component_styles/LikeButton.css";
export default function LikeButton(props) {
  const [likes, setLikes] = useState(props.likes);
  const [isClicked, setIsClicked] = useState(false);
  function upVote() {
    setLikes((prevState) => prevState + 1);
    setIsClicked(true);
  }
  function downVote() {
    setLikes((prevState) => prevState - 1);
    setIsClicked(true);
  }
  useEffect(() => {
    if (isClicked) {
      const incomingLikes = setTimeout(() => {
        axios
          .post(`http://localhost:8000/band/updateLikes/${props.id}`, {
            likes: likes,
          })
          .then(setIsClicked(false))
          .then(setLikes(likes))
          .then(console.log("post", likes));
      }, 1000);
      return () => {
        clearTimeout(incomingLikes);
        console.log("clear");
      };
    }
  }, [likes]);
  return (
    <>
      {/* TODO: Use Stylized Components to start designing button layout  */}
      <li key={props.bandname}>
        <p>{props.bandname}</p>
        <span className="like_buttons">
          <button onClick={upVote}> &#128151; </button> <p> {likes} </p>
          <button onClick={downVote}> &#129324; </button>{" "}
        </span>
      </li>
    </>
  );
}
