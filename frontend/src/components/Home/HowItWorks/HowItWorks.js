import React from "react";
import Card from "../../UI/Card/Card";
import map from "../../../Assets/Images/map.png";
import details from "../../../Assets/Images/details.jpg";
import success from "../../../Assets/Images/success.jpg";
import "./HowItWorks.css";

const images = [map, details, success];

const howItWorks = (props) => {
  let texts = [
    <div className="hiw-card-content">
      <h1>Find Location</h1>
      <p>
        Visit <i>Do Your Part</i> and search for the address you want to report
      </p>
      <p>
        Click on <i>Add Feature</i> to add your address and fill in the details
      </p>
    </div>,
    <div className="hiw-card-content">
      <h1>Enter Details</h1>
      <p>
        Provide other necessarcy deails in the next step such as contact
        information and briefly describle the incident
      </p>
      <p>
        With this your report is complete and ready to be <i>submitted</i>
      </p>
    </div>,
    <div className="hiw-card-content">
      <h1>Confirmation</h1>
      <p>
        At this point you'll receive confirmation of your submitted report and
        further information to track the status of your report
      </p>
    </div>,
  ];

  const cards = images.map((img, i) => <Card img={img} content={texts[i]} />);

  return (
    <div className="hiw-wrapper">
      <div className="hiw-heading">
        <h1>How It Works</h1>
      </div>
      <div className="hiw-process">
        <div className="hiw-card__wrapper">{cards}</div>
      </div>
    </div>
  );
};

export default howItWorks;
