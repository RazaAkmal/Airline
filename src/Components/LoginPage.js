import React from 'react'
import { Button, TextField, Container, Grid, Card } from '@material-ui/core';
import OverLoader from './common/loader'
import '../App.css'
import { login_user } from '../actions';
import { connect } from 'react-redux'

class LoginPage extends React.Component {

  state = {
    username: '',
    password: ''
  }

  handleSubmit = () => {
    const { login_user } = this.props;
    const { username, password } = this.state;
    login_user(username, password);
  }

  render() {
    const { isLoading, credential_error } = this.props

    return (
      <Container>
        {isLoading && <OverLoader />}
        <Grid style={{ textAlign: "center" }}>
          <br />
          <br />
          <h3>Welcome To Airline</h3>
          <br />
          <Card className="p-40">
            <div className="flex-center">

              <div className="w-150">Email</div>

              <TextField
                required className="w-150" label="" onChange={(e) => {
                  this.setState({ username: e.target.value })
                }} />

            </div>

            <br />

            <div className="flex-center">
              <div className="w-150">Password</div>
              <TextField type="password"
                required className="w-150" label="" onChange={(e) => {
                  this.setState({ password: e.target.value })
                }} />

            </div>
            <br />
            <br />
            {credential_error && <div>
              <span style={{ color: "red" }}>User with Entered Password Doesn't Exist</span>
            </div>}
            <br />

            <Button type="submit" onClick={this.handleSubmit} variant="outlined" color="primary" className="m-10">Sign In</Button>
          </Card>
        </Grid>
      </Container>
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
    login_user: (username, password) => dispatch(login_user(username, password))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
