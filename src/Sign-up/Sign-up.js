import React, { useState } from "react";
import "../Forgot-password/reset.css";
import params from "../auth0-param.json";
import auth0 from "auth0-js";
import "./sign-up.css";
import { Form, Input, Button } from "antd";


const SignUp = () => {
  var auth0Client = new auth0.WebAuth({
    domain: params.domain,
    clientID: params.clientId,
    audience: params.apiAudience,
    redirectUri: params.callbackUrl,
    scope: params.scope,
    responseType: "token id_token",
  });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [username, setUsername] = useState("");

  const onSignUpHandler = (e) => {
    auth0Client.signup(
      {
        connection: "Username-Password-Authentication",
        email,
        password,
        confirmpassword,
        username,
        user_metadata: { plan: "silver", team_id: "a111" },
      },
      function (err) {
        if (err) return alert("Something went wrong: " + err.message);
        return alert("success signup without login!");
      }
    );
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    onSignUpHandler(email,password,confirmpassword,username);
  };

  return (
    <div className="wrapper">
      <div className="form-wrapper">
        <div className="login-title">
          <strong>create user account </strong>
        </div>
        <div className="container">
          <Form>
            <Form.Item>
              <Input
                size="large"
                type="email"
                className="input"
                placeholder="Email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </Form.Item>
            <Form.Item>
              <Input
                size="large"
                type="password"
                className="input"
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </Form.Item>
            <Form.Item>
              <Input
                size="large"
                type="confirmpassword"
                className="input"
                placeholder="Confirm Password"
                value={password}
                onChange={(e) => {
                  setConfirmpassword(e.target.value);
                }}
              />
            </Form.Item>
            <Form.Item>
              <Input
                size="large"
                type="text"
                className="input"
                placeholder="Username"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                size="large"
                onClick={onSubmitHandler}
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
          <a href="/">Back to login</a>
        </div>
      </div>
    </div>
  );
};
export default SignUp;
