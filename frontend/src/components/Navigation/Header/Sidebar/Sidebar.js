import React from "react";
import Backdrop from "../../../UI/Backdrop/Backdrop";
import NavigationItems from "../NavigationItems/NavigationItems";
import "./Sidebar.css";

const sidebar = (props) => {
  let attachedClasses = `sidebar close`;
  if (props.show) {
    attachedClasses = `sidebar open`;
  }
  return (
    <React.Fragment>
      <Backdrop show={props.show} clicked={props.clicked} />
      <div className={attachedClasses}>
        <nav className="mobile-only">
          <NavigationItems />
        </nav>
      </div>
    </React.Fragment>
  );
};

export default sidebar;
