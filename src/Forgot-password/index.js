import React, { useState } from "react";
import "../Forgot-password/reset.css";
import params from "../auth0-param.json";
import auth0 from "auth0-js";
import "./reset.css";
import { Form, Input, Button, message } from "antd";


const ForgotPassword = () => {
  var auth0Client = new auth0.WebAuth({
    domain: params.domain,
    clientID: params.clientId,
    audience: params.apiAudience,
    redirectUri: params.callbackUrl,
    scope: params.scope,
    responseType: "token id_token",
  });
  const [email, setEmail] = useState("");

  const onResetPasswordHandler = (e) => {
    auth0Client.changePassword(
      {
        connection: "Username-Password-Authentication",
        email,
      },
      (err, result) => {
        if (err) {
        } else {
          message.success(result);
        }
      }
    );
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    onResetPasswordHandler(email);
  };

  return (
    <div className="wrapper">
      <div className="form-wrapper">
        <div className="login-title">
          <strong>Reset Password</strong>
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
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                size="large"
                onClick={onSubmitHandler}
              >
                Send Reset Request
              </Button>
            </Form.Item>
          </Form>
          <a href="/">Back to login</a>
        </div>
      </div>
    </div>
  );
};
export default ForgotPassword;
