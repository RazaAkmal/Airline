import React from 'react';
import logo from './logo.svg';
import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import HomePage from './Components/HomePage'
import LoginPage from './Components/LoginPage'
import {
  Link
} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function App() {
  const classes = useStyles();
  const login = localStorage.getItem('login');
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <img src={logo} className="App-logo" alt="logo" />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            AirLine
          </Typography>
          {login && <Link to="home">Home</Link>}

        </Toolbar>
      </AppBar>
      {login ? <HomePage /> : <LoginPage />}
    </div>
  );
}

export default App;
