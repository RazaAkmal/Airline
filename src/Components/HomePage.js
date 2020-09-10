import React from 'react'
import '../App.css'
import { Button, TextField, Container, Grid, Card } from '@material-ui/core';
import { connect } from 'react-redux'
import { fetchPlaces, fetchFlights, fetchCountires } from '../actions';
import Countries from './common/countries.json'
import NativeSelect from '@material-ui/core/NativeSelect';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import OverLoader from './common/loader';
import FlightList from './FlightList';
import moment from 'moment'


class HomePage extends React.Component {

  state = {
    country: '',
    destination: '',
    origin: '',
    date: moment(Date()).format('YYYY-MM-DD'),
    withoutDate: false,
    originError: false,
    destinationError: false
  }

  handleCountrySelect = (e) => {
    this.setState({ country: e.target.value, origin: '', destination: '' })
    this.props.fetchPlaces(e.target.value)
  }

  handleDestinationSelect = (e) => {
    this.setState({ destination: e.target.value, destinationError: false })
  }
  handleOriginSelect = (e) => {
    this.setState({ origin: e.target.value, originError: false })
  }

  handleRouteSubmit = (noDate) => {
    const data = this.state
    if (data.origin !== '' && data.destination !== '') {
      if (noDate) {
        this.setState({ withoutDate: true })
        this.props.fetchFlights(data, true)
      } else {
        this.setState({ withoutDate: false })
        this.props.fetchFlights(data, false)
      }
    } else if (data.origin === '' && data.destination === '') {
      this.setState({ originError: true, destinationError: true })
    } else if (data.origin !== '' && data.destination === '') {
      this.setState({ destinationError: true })
    } else if (data.origin === '' && data.destination !== '') {
      this.setState({ originError: true })
    }
  }

  handleDateChange = e => {
    this.setState({ date: e.target.value })
  }



  render() {
    const { places_data, isLoading, flightList, error, place_error, countries_data } = this.props
    const { origin, destination, date, withoutDate, originError, destinationError } = this.state
    return (
      <Container>
        {isLoading && <OverLoader />}
        <Grid style={{ textAlign: "center" }}>
          <h3>Welcome To AirLine </h3>
          <br />
          <br />
          <FormControl variant="outlined" >
            <InputLabel id="demo-simple-select-outlined-label">Select the Country</InputLabel>
            <NativeSelect
              labelid="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              style={{ minWidth: "300px" }}
              error={place_error}
              onChange={this.handleCountrySelect}
              label="Age"
            >
              <option aria-label="None" value="" />
              {Countries && Countries.map((data, index) => <option key={index} value={data.name}>{data.name}</option>)}
            </NativeSelect>
          </FormControl>
          <div className="h-50">
            {
              place_error &&
              <small style={{ color: "red" }}> No Places Found For This Country</small>
            }
          </div>
          <br />
          <br />
          <br />
          {places_data &&
            <div>
              <FormControl variant="outlined" >
                <InputLabel id="demo-simple-select-outlined-label">Select Origin Place</InputLabel>
                <NativeSelect
                  labelid="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  style={{ minWidth: "300px" }}
                  value={origin}
                  error={originError}
                  onChange={this.handleOriginSelect}
                  label="Age"
                >
                  <option aria-label="None" value="" />
                  {places_data.map((data, index) => <option key={index} value={data.PlaceId}>{data.PlaceName}</option>)}
                </NativeSelect>
                {originError &&
                  <div className="errorSpan">
                    <span>
                      Please Select Origin
                    </span>
                  </div>
                }
              </FormControl>
              <FormControl style={{ marginLeft: "15px" }}>
                <InputLabel id="demo-simple-select-outlined-label">Select Destination Place</InputLabel>
                <NativeSelect
                  labelid="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  style={{ minWidth: "300px" }}
                  error={destinationError}
                  onChange={this.handleDestinationSelect}
                  value={destination}
                  label="Age"
                >
                  <option aria-label="None" value="" />
                  {places_data.map((data, index) => <option key={index} value={data.PlaceId}>{data.PlaceName}</option>)}
                </NativeSelect>
                {destinationError &&
                  <div className="errorSpan">
                    <span>
                      Please Select Destination
                    </span>
                  </div>
                }
              </FormControl>
              <br />
              <TextField
                style={{
                  width: "300px",
                  marginTop: "20px"
                }}
                label="Departure Date"
                type="date"
                onChange={this.handleDateChange}
                defaultValue={date}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <br />
              <br />
              <Button type="submit" onClick={() => this.handleRouteSubmit(false)} variant="outlined" color="primary" className="m-10">Browse Flights</Button>
              <Button style={{ marginLeft: "10px" }} type="submit" onClick={() => this.handleRouteSubmit(true)} variant="outlined" color="primary" className="m-10">Browse Flights Without Date</Button>
            </div>
          }
          <br />
          {flightList &&
            <FlightList flightList={flightList} date={date} withoutDate={withoutDate} />
          }
          <div className="h-50">
            {
              error &&
              <small style={{ color: "red" }}> No Flight Found. Try Changing date or Location</small>
            }
          </div>
        </Grid>
      </Container >

    )
  }
}

const mapStateToProps = ({ flight }) => {
  return {
    isLoading: flight.loading,
    places_data: flight.places_data,
    countries: flight.countries,
    flightList: flight.flight_list,
    error: flight.error,
    place_error: flight.place_error,
    countries_data: flight.countries_data,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPlaces: (country) => dispatch(fetchPlaces(country)),
    fetchFlights: (data) => dispatch(fetchFlights(data)),
    fetchCountires: () => dispatch(fetchCountires()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
