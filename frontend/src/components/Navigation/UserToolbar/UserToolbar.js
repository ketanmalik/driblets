import React from "react";
import { Button } from "semantic-ui-react";
import "./UserToolbar.css";

const userToolbar = (props) => {
  return (
    <div className="user-toolbar">
      <nav className="user-toolbar__item">
        <ul>
          <li>
            <Button basic className="sign-up__btn">
              Sign up
            </Button>
          </li>
          <li>
            <Button basic className="login__btn">
              Login
            </Button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default userToolbar;
