/* eslint-disable default-case */
import React from "react";
import OverLoader from "./common/loader";
import "../App.css";
import { login_user, removeError, stopLoading } from "../actions";
import { connect } from "react-redux";
import { UserOutlined, KeyOutlined } from "@ant-design/icons";
import { Form, Input, Button, Card, Row, Col, Result } from "antd";
import firebase from "firebase"
import fire from "../config/firebase";
import { Link } from "react-router-dom";

const layout = {
  labelCol: {
    span: 24,
    offset: 5,
  },
  wrapperCol: {
    span: 15,
    offset: 5,
  },
};

class LoginPage extends React.Component {
  state = {
    username: "",
    password: "",
    passwordError: false,
    usernameError: false,
    errorUser: "",
    networkError: false,
    errorPassword: "",
    hasAccount: true,
  };

  handleSubmit = () => {
    const { login_user, stopLoading } = this.props;
    const { username, password } = this.state;
    login_user();
    fire
      .auth()
      .signInWithEmailAndPassword(username, password)
      .then((res) => {
        stopLoading();
      })
      .catch((err) => {
        switch (err.code) {
          case "auth/invalid-email":
          case "auth/user-dsiabled":
          case "auth/user-not-found":
            this.setState({ errorUser: err.message, usernameError: true });
            stopLoading();

            break;
          case "auth/wrong-password":
            this.setState({ errorPassword: err.message, passwordError: true });
            stopLoading();

            break;
          case "auth/network-request-failed":
            stopLoading();
            this.setState({ networkError: true });
            break;
        }
      });
  };

  handleGoogleSubmit = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    fire.auth().signInWithPopup(provider).then(function (result) {
      // const token = result.credential.accessToken;
      // const user = result.user;
    }).catch(function (error) {
      console.log(error);
      // const errorCode = error.code;
      // const errorMessage = error.message;
      // const email = error.email;
      // const credential = error.credential;
    });
  }

  handleSignUp = () => {
    const { username, password } = this.state;
    this.props.login_user();
    fire
      .auth()
      .createUserWithEmailAndPassword(username, password)
      .then((res) => {
        this.props.stopLoading();
      })
      .catch((err) => {
        switch (err.code) {
          case "auth/email-already-in-use":
          case "auth/invalid-email":
            this.setState({ errorUser: err.message, usernameError: true });
            this.props.stopLoading();

            break;
          case "auth/weak-password":
            this.setState({ errorPassword: err.message, passwordError: true });
            this.props.stopLoading();

            break;
          case "auth/network-request-failed":
            stopLoading();
            this.setState({ networkError: true });
            break;
        }
      });
  };

  render() {
    const { isLoading, credential_error, removeError } = this.props;
    return (
      <div className="site-card-border-less-wrapper flex-center">
        {isLoading && <OverLoader />}
        {this.state.networkError ? (
          <Result
            status="500"
            title="No Internet"
            subTitle="There is no internet connection, Please Connect to the internet"
            extra={
              <Button
                type="primary"
                onClick={() => this.setState({ networkError: false })}
              >
                Back Home
              </Button>
            }
          />
        ) : (
            <Card title="Welcome To Airline" style={{ minWidth: 700 }}>
              <Form {...layout} name="basic">
                <Form.Item
                  label="Email"
                  name="username"
                  help={this.state.usernameError && this.state.errorUser}
                  validateStatus={this.state.usernameError && "error"}
                >
                  <Input
                    prefix={<UserOutlined />}
                    value={this.state.username}
                    onChange={(e) => {
                      this.setState({
                        username: e.target.value,
                        usernameError: false,
                      });
                    }}
                  />
                </Form.Item>

                <Form.Item
                  label="Password"
                  name="password"
                  help={this.state.passwordError && this.state.errorPassword}
                  validateStatus={
                    (credential_error || this.state.passwordError) && "error"
                  }
                >
                  <Input.Password
                    prefix={<KeyOutlined />}
                    value={this.state.password}
                    onChange={(e) => {
                      this.setState({
                        password: e.target.value,
                        passwordError: false,
                      });
                      if (credential_error) removeError();
                    }}
                  />
                </Form.Item>
                <Form.Item>
                  {this.state.hasAccount ? (
                    <>
                      <Row>
                        <Col>
                          <Button onClick={this.handleSubmit} type="primary">
                            Sign In
                      </Button>
                        </Col>
                        <Col style={{ margin: "5px" }}>
                          <Link to='/forgotPassword'>Forgot Password?</Link>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <p style={{ margin: "5px" }}>
                            Dont Have an account ?{" "}
                            <a
                              href="/"
                              onClick={(e) => {
                                e.preventDefault();
                                this.setState({ hasAccount: false });
                              }}
                            >
                              Sign Up
                        </a>
                            {" "} or Sign In Via  <a
                              href="/"
                              onClick={(e) => {
                                e.preventDefault();
                                this.handleGoogleSubmit();
                              }}
                            >
                              Google
                        </a>
                          </p>
                        </Col>
                      </Row>
                    </>
                  ) : (
                      <>
                        <Row>
                          <Col>
                            <Button onClick={this.handleSignUp} type="primary">
                              Sign Up
                      </Button>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <p style={{ margin: "5px" }}>
                              Have an account ?{" "}
                              <a
                                href="/"
                                onClick={(e) => {
                                  e.preventDefault();
                                  this.setState({ hasAccount: true });
                                }}
                              >
                                Sign In{" "}
                              </a>
                             or Sign In Via  <a
                                href="/"
                                onClick={(e) => {
                                  e.preventDefault();
                                  this.handleGoogleSubmit();
                                }}
                              >
                                Google
                        </a>
                            </p>
                          </Col>
                        </Row>
                      </>
                    )}
                </Form.Item>
              </Form>
            </Card>
          )}
      </div>
    );
  }
}

const mapStateToProps = ({ login }) => {
  return {
    isLoading: login.loading,
    credential_error: login.credential_error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login_user: () => dispatch(login_user()),
    removeError: () => dispatch(removeError()),
    stopLoading: () => dispatch(stopLoading()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
