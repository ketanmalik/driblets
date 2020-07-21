import React from "react";
import { NavLink } from "react-router-dom";
import "./NavigationItems.css";

const navigationItems = (props) => {
  return (
    <ul className="navigation-items">
      <li>
        <NavLink to="/" exact>
          HOME
        </NavLink>
      </li>
      <li>
        <NavLink to="/about">ABOUT</NavLink>
      </li>
      <li>
        <NavLink to="/howitworks">HOW IT WORKS</NavLink>
      </li>
      <li>
        <NavLink to="/doyourpart">DO YOUR PART</NavLink>
      </li>
    </ul>
  );
};

export default navigationItems;
