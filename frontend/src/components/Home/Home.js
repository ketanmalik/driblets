import React, { Component } from "react";
import Btn from "../UI/Button/Btn";
import Jumbotron from "../UI/Jumbotron/Jumbotron";
import "./Home.css";

class Home extends Component {
  render() {
    return (
      <div className="home-wrapper">
        <Jumbotron>
          <div className="jumbotron-content">
            <h1>#everydropmatters!</h1>
            <h3>
              <i>Thousands have lived without love, not one without water.</i>
            </h3>
            <p>
              We're putting our constant efforts to combat water wastage and
              water scarcity. Your contribution matters!
            </p>
            <Btn type="primary" text="Do your part" width="15rem" />
          </div>
        </Jumbotron>
      </div>
    );
  }
}

export default Home;
