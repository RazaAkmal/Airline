import React from 'react'
import { Button, TextField, Container, Grid, Card } from '@material-ui/core';
import '../App.css'

export default function LoginPage() {
  return (
    <Container>
      <Grid style={{ textAlign: "center" }}>
        <br />
        <br />
        <h3>Welcome To Airline</h3>
        <br />
        <Card className="p-40">
          <div className="flex-center">

            <div className="w-150">Email</div>

            <TextField id="username"
              required className="w-150" label="" onChange={(e) => {
                this.props.LoginSetErrors("username", false);
                this.setState({ username: e.target.value })
              }} />

          </div>

          <br />

          <div className="flex-center">
            <div className="w-150">Password</div>
            <TextField type="password" id="password"
              required className="w-150" label="" onChange={(e) => {
                this.props.LoginSetErrors("password", false);

                this.setState({ password: e.target.value })
              }} />

          </div>
        </Card>
      </Grid>
    </Container>
  )
}
