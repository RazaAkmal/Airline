import React, { useState } from 'react'
import { Button, TextField, Container, Grid, Card } from '@material-ui/core';
import '../App.css'

export default function LoginPage() {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  function handleSubmit() {

  }
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

            <TextField
              required className="w-150" label="" onChange={(e) => {
                setUsername(e.target.value)
              }} />

          </div>

          <br />

          <div className="flex-center">
            <div className="w-150">Password</div>
            <TextField type="password"
              required className="w-150" label="" onChange={(e) => {
                setPassword(e.target.value)
              }} />

          </div>
          <br />
          <br />
          <br />
          <Button type="submit" onClick={handleSubmit} variant="outlined" color="primary" className="m-10">Sign In</Button>

        </Card>
      </Grid>
    </Container>
  )
}
