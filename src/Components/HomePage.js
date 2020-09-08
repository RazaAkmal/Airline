import React from 'react'
import '../App.css'
import { Button, TextField, Container, Grid, Card } from '@material-ui/core';
import { connect } from 'react-redux'
import { fetchPlaces } from '../actions';
import Countries from './common/countries.json'
import NativeSelect from '@material-ui/core/NativeSelect';
// import option from '@material-ui/core/option';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import OverLoader from './common/loader';

class HomePage extends React.Component {

  state = {
    country: ''
  }

  componentDidMount = () => {
    // this.props.fetchPlaces()
  }

  handleCountrySelect = (e) => {
    this.setState({ country: e.target.value })
    this.props.fetchPlaces(e.target.value)
  }


  render() {
    const { places_data, isLoading } = this.props
    return (
      <Container>
        {isLoading && <OverLoader />}
        <Grid style={{ textAlign: "center" }}>
          <br />
          <br />
          <FormControl variant="outlined" >
            <InputLabel id="demo-simple-select-outlined-label">Select the Country</InputLabel>
            <NativeSelect
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              style={{ minWidth: "300px" }}
              onChange={this.handleCountrySelect}
              label="Age"
            >
              <option aria-label="None" value="" />
              {Countries.map((data, index) => <option key={index} value={data.name}>{data.name}</option>)}
            </NativeSelect>
          </FormControl>
          <br />
          <br />
          <br />
          {places_data &&
            <div>
              <FormControl variant="outlined" >
                <InputLabel id="demo-simple-select-outlined-label">Select Origin Place</InputLabel>
                <NativeSelect
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  style={{ minWidth: "300px" }}
                  // onChange={this.handleCountrySelect}
                  label="Age"
                >
                  <option aria-label="None" value="" />
                  {places_data.map((data, index) => <option key={index} value={data.PlaceId}>{data.PlaceName}</option>)}
                </NativeSelect>
              </FormControl>
              <FormControl style={{ marginLeft: "15px" }}>
                <InputLabel id="demo-simple-select-outlined-label">Select Destination Place</InputLabel>
                <NativeSelect
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  style={{ minWidth: "300px" }}
                  // onChange={this.handleCountrySelect}
                  label="Age"
                >
                  <option aria-label="None" value="" />
                  {places_data.map((data, index) => <option key={index} value={data.PlaceId}>{data.PlaceName}</option>)}
                </NativeSelect>
              </FormControl>
            </div>
          }
        </Grid>
      </Container >

    )
  }
}

const mapStateToProps = ({ flight }) => {
  return {
    isLoading: flight.loading,
    places_data: flight.places_data,
    countries: flight.countries
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPlaces: (country) => dispatch(fetchPlaces(country)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
