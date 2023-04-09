import { NavLink } from "react-router-dom";
import React, { useState } from "react";
import { Navbar, Nav, NavItem } from "reactstrap";

export default function NavBar() {
  return (
    <>
      <div>
        <Navbar>
          <Nav>
            <NavItem className="mx-3">
              <NavLink to="/">Home</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/signup">Sign Up Form!</NavLink>
            </NavItem>
          </Nav>
        </Navbar>
      </div>
    </>
  );
}
