import React from "react";
import { Button, Icon, Form, Input } from "semantic-ui-react";
import "./SignUp.css";

const signUp = () => (
  <Form>
    <Form.Group widths="equal">
      <Form.Field required>
        <label>First Name</label>
        <Input placeholder="First Name" />
      </Form.Field>
      <Form.Field required>
        <label>Last Name</label>
        <Input placeholder="Last Name" />
      </Form.Field>
    </Form.Group>
    <Form.Group widths="equal">
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
    </Form.Group>
    <Form.Field required>
      <label>Address</label>
      <Input iconPosition="left" placeholder="Address">
        <Icon name="home" />
        <input />
      </Input>
    </Form.Field>
    <Button type="submit" className="modal-content__btn">
      Sign Up
    </Button>
  </Form>
);

export default signUp;
