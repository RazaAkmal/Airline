import React, { Component } from 'react'
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';


const mapStyles = {
  width: '100%',
  height: '100%',
};

const stores = [{ lat: 30.375320, lng: 69.345116 }, { lat: 52.5170365, lng: 13.3888599 },
{ lat: 33.939110, lng: 67.709953 },]


class MapComponent extends Component {

  displayMarkers = () => {
    return stores.map((store, index) => {
      return <Marker key={index} id={index} position={{
        lat: store.lat,
        lng: store.lng
      }} />
    })
  }

  render() {
    return (
      <div>
        <Map
          google={this.props.google}
          zoom={12}
          style={mapStyles}
          initialCenter={{ lat: 52.5170365, lng: 13.3888599 }}
        >
          {this.displayMarkers()}
        </Map>
      </div>
    )
  }
}


export default GoogleApiWrapper({
  apiKey: 'AIzaSyAPlwVfE2V3tKZoGCWgpKoRDJ6MeiGmSbw'
})(MapComponent);