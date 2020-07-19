import React from "react";
import { NavLink } from "react-router-dom";
import "./Header.css";

const header = (props) => {
  return (
    <header className="header-navabr">
      <nav>
        <ul>
          <li>
            <NavLink to="/"> About </NavLink>
          </li>
          <li>
            <NavLink to="/"> How It Works </NavLink>
          </li>
          <li>
            <NavLink to="/"> Do Your Part </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default header;
