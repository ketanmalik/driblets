import React from "react";
import { NavLink } from "react-router-dom";
import { Header, Image } from "semantic-ui-react";
import logo from "../../../Assets/Images/logo.png";
import "./Header.css";

const header = (props) => {
  return (
    <div className="header-navabr">
      <div className="header-navbar__logo">
        <Image src={logo} className="logo" />
        <Header size="huge" className="company-name">
          driblets
        </Header>
      </div>
      <div className="header-navbar__item">
        <nav>
          <ul>
            <li>
              <NavLink to="/">HOME</NavLink>
            </li>
            <li>
              <NavLink to="/">ABOUT</NavLink>
            </li>
            <li>
              <NavLink to="/">HOW IT WORKS</NavLink>
            </li>
            <li>
              <NavLink to="/">DO YOUR PART</NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default header;
