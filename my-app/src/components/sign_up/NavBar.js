import React from "react";
import { NavLink } from "react-router-dom";
export default function NavBar() {
  return (
    <>
      <ul>
        <li>
          <NavLink to="/signup">Sign Up Form!</NavLink>
        </li>
      </ul>
    </>
  );
}
