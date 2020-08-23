import React from "react";
import { Icon } from "semantic-ui-react";
import "./Footer.css";
const footer = (props) => {
  return (
    <div className="footer">
      <div>
        <a href="https://github.com/ketanmalik" target="_blank">
          <Icon name="github" /> GitHub
        </a>
        &nbsp;&nbsp;|&nbsp;&nbsp;
        <a href="https://www.linkedin.com/in/ketanmalik/" target="_blank">
          <Icon name="linkedin" /> LinkedIn
        </a>
        &nbsp;&nbsp;|&nbsp;&nbsp;
        <a href="mailto:malik.ke@northeastern.edu">
          <Icon name="mail" />
          malik.ke@northeastern.edu
        </a>
      </div>
      <div style={{ height: "10%" }}></div>
      <div>
        &copy;&nbsp;&nbsp;Ketan Malik&nbsp;&nbsp;|&nbsp;&nbsp; Northeastern
        University 2020&nbsp;&nbsp;&nbsp;&nbsp;
      </div>
    </div>
  );
};

export default footer;
