import React, { Component } from 'react'
import { Form, Input, Button, Card, Row, Col, Result,Modal } from "antd";
import OverLoader from './common/loader';
import { login_user, removeError, stopLoading } from "../actions";
import { connect } from "react-redux";
import { UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import fire from '../config/firebase'


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


class ForgotPassword extends Component {


  state = {
    email: "",
    passwordError: false,
    usernameError: false,
    errorUser: "",
    networkError: false,
  };


  handleSubmit = () => {
    let auth = fire.auth()
    if (this.state.email !== "") {
      auth.sendPasswordResetEmail(this.state.email).then(() => {
              Modal.success({
              content: `The Password Reset email has been sent to ${this.state.email}`,
              });
      }).catch((err) => {
        // eslint-disable-next-line default-case
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
    }
  }

  render() {
    const { isLoading} = this.props
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
                name="email"
                help={this.state.usernameError && this.state.errorUser}
                validateStatus={this.state.usernameError && "error"}
              >
                <Input
                  prefix={<UserOutlined />}
                  value={this.state.email}
                  onChange={(e) => {
                    this.setState({
                      email: e.target.value,
                      usernameError: false,
                    });
                  }}
                />
              </Form.Item>
              <Form.Item>
                  <Row style={{ marginTop: "10px" }}>
                    <Col>
                      <Button onClick={this.handleSubmit} type="primary">
                        Reset Password
                      </Button>
                        </Col>
                        <Col style={{ margin: "5px" }}>
                        <Link to='/'>Back To Home</Link>
                        </Col>
                  </Row>
              </Form.Item>
            </Form>
          </Card>
        )}
      </div>
    )
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

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
