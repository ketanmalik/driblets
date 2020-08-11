import React from "react";
import { Button, Icon, Form, Input } from "semantic-ui-react";
import "./SignIn.css";

const signIn = () => (
  <Form>
    <Form.Field required>
      <label>Username</label>
      <Input iconPosition="left" placeholder="Email">
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
