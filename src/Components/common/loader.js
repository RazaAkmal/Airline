import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Loader from 'react-loader-spinner'
import React, { Component } from 'react';


const LoaderStyle = {
  backgroundOverlay: {
    zIndex: "9999",
    width: "100%",
    height: "100%",
    position: "fixed",
    top: 0,
    left: 0,
  },
  loader: {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)"
  }
}

export default class OverLoader extends Component {
  //other logic
  render() {
    return (
      <div style={LoaderStyle.backgroundOverlay}>
        <div style={LoaderStyle.loader}>
          <Loader
            type="Oval"
            color="#214764"
            height={40}
            width={40}
          />
        </div>
      </div>
    );
  }
}