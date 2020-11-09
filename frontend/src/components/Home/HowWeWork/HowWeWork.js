import React from "react";
import Card from "../../UI/Card/Card";
import details from "../../../Assets/Images/details1.jpg";
import map from "../../../Assets/Images/map1.png";
import success from "../../../Assets/Images/success1.png";
import "./HowWeWork.css";

const howWeWork = (props) => {
  const images = [map, details, success];
  const headings = [`Find Location`, `Enter Details`, `Confirmation`];
  const descriptions = [
    <div>
      <p>
        Visit <i>Do Your Part</i> and search for the address or click on the map where water leakage
        is present
      </p>
      <p>
        We'll put a pin at the nearest known location of the incident
      </p>
    </div>,
    <div>
      <p>
        Provide & Verify additional details such as contact information and
        intensity of the incident you want to report
      </p>
    </div>,
    <div>
      <p>
        The submitted report will be evaluated and if no errors are found then
        you'll get further information to track the issue
      </p>
    </div>,
  ];
  const cards = images.map((img, i) => (
    <div key={i} className="hww__cards-card">
      <Card img={img} header={headings[i]} description={descriptions[i]} />
    </div>
  ));
  return (
    <div className="hww-wrapper">
      <h1>How We Work</h1>
      <div className="hww__cards-wrapper">{cards}</div>
    </div>
  );
};

export default howWeWork;
