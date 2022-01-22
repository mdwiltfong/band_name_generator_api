import React, { useState } from "react";

export default function LikeButton(props) {
  const [likes, setLikes] = useState(0);

  return (
    <>
      <button onClick={() => setLikes(likes + 1)}> UpVote </button>{" "}
      {props.isLoading ? "" : <p> {props.data.likes} </p>}{" "}
      <button onClick={() => setLikes(likes - 1)}> DownVote </button>{" "}
    </>
  );
}
