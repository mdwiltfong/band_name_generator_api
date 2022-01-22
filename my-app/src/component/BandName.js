import React from "react";
import AddButton from "./AddButton";
export default function BandName(props) {
  return (
    <>
      {props.bandname ? `Hey, we should call the band ${props.bandname}` : null}

      <AddButton {...props} />
    </>
  );
}
