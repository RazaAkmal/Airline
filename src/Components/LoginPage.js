import React from 'react'
import OverLoader from './common/loader'
import '../App.css'
import { login_user, removeError } from '../actions';
import { connect } from 'react-redux'
import {
  UserOutlined,
  KeyOutlined
} from '@ant-design/icons';
import { Form, Input, Button, Card } from 'antd';

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 8,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 3,
    span: 12,
  },
};




class LoginPage extends React.Component {

  state = {
    username: '',
    password: '',
    passwordError: false,
    usernameError: false
  }

  handleSubmit = () => {
    const { login_user } = this.props;
    const { username, password } = this.state;
    if ((username && password) !== '')
      login_user(username, password);
    else
      if (password === '' && username === '')
        this.setState({ passwordError: true, usernameError: true })
      else if (username === '')
        this.setState({ usernameError: true });
      else if (password === "")
        this.setState({ passwordError: true });
  }

  render() {
    const { isLoading, credential_error, removeError } = this.props

    return (
      <div className="site-card-border-less-wrapper flex-center">
        {isLoading && <OverLoader />}
        <Card title="Welcome To Airline" style={{ width: 900 }}>
          <Form
            {...layout}
            name="basic"
          >
            <Form.Item
              label="Username"
              name="username"
              help={this.state.usernameError && "Please input your username!"}
              validateStatus={this.state.usernameError && "error"}
            >
              <Input prefix={<UserOutlined />} value={this.state.username} onChange={(e) => {
                this.setState({ username: e.target.value, usernameError: false })
              }} />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              help={credential_error ? "User with Entered Password Doesn't Exist" : this.state.passwordError && "Please input your password!"}
              validateStatus={(credential_error || this.state.passwordError) && "error"}
            >
              <Input.Password prefix={<KeyOutlined />} value={this.state.password} onChange={(e) => {
                this.setState({ password: e.target.value, passwordError: false })
                if (credential_error)
                  removeError()
              }} />
            </Form.Item>
            <Form.Item {...tailLayout}>
              <Button onClick={this.handleSubmit} type="primary" >
                Submit
        </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>



















      // <Container>
      //   {isLoading && <OverLoader />}
      //   <Grid style={{ textAlign: "center" }}>
      //     <br />
      //     <br />
      //     <h3>Welcome To Airline</h3>
      //     <br />
      //     <Card className="p-40">
      //       <div className="flex-center">

      //         <div className="w-150">Email</div>

      //         <TextField
      //           required className="w-150" label="" onChange={(e) => {
      //             this.setState({ username: e.target.value })
      //           }} />

      //       </div>

      //       <br />

      //       <div className="flex-center">
      //         <div className="w-150">Password</div>
      //         <TextField type="password"
      //           required className="w-150" label="" onChange={(e) => {
      //             this.setState({ password: e.target.value })
      //           }} />

      //       </div>
      //       <br />
      //       <br />
      //       {credential_error && <div>
      //         <span style={{ color: "red" }}>User with Entered Password Doesn't Exist</span>
      //       </div>}
      //       <br />

      //       <Button type="submit" onClick={this.handleSubmit} variant="outlined" color="primary" className="m-10">Sign In</Button>
      //     </Card>
      //   </Grid>
      // </Container>
    )
  }
}

const mapStateToProps = ({ login }) => {
  return {
    isLoading: login.loading,
    credential_error: login.credential_error
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    login_user: (username, password) => dispatch(login_user(username, password)),
    removeError: () => dispatch(removeError())
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
