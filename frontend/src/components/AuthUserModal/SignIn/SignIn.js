import React from "react";
import { Button, Icon, Form, Input } from "semantic-ui-react";
import "./SignIn.css";

const signInFormHandler = (e) => {
  //   console.log(e);
};

const inputChangeHandler = (e, d) => {
  //   console.log("inp", e, d);
};

const signIn = () => (
  <Form onSubmit={(e) => signInFormHandler(e)}>
    <Form.Field required>
      <label>Username</label>
      <Input
        iconPosition="left"
        placeholder="Email"
        onChange={(event, data) => inputChangeHandler(event, data)}
      >
        <Icon name="at" />
        <input />
      </Input>
    </Form.Field>
    <Form.Field required>
      <label>Password</label>
      <Input iconPosition="left" placeholder="Password" type="password">
        <Icon name="key" />
        <input />
      </Input>
    </Form.Field>
    <Button type="submit" className="modal-content__btn">
      Log In
    </Button>
  </Form>
);

export default signIn;
