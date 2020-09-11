import React from 'react'
import '../App.css'
import { connect } from 'react-redux'
import { fetchPlaces, fetchFlights, fetchCountires, resetState } from '../actions';
import Countries from './common/countries.json'
import OverLoader from './common/loader';
import FlightList from './FlightList';
import moment from 'moment'
import { Row, Form, Col, Select, Typography, Button, Space, DatePicker } from 'antd';
import isEmpty from 'lodash.isempty';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 5 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 12 },
  },
};

const dateFormat = 'YYYY-MM-DD';


class HomePage extends React.Component {

  state = {
    country: '',
    destination: '',
    origin: '',
    date: moment(Date()).format('YYYY-MM-DD'),
    withoutDate: false,
    originError: false,
    destinationError: false,
    flightsData: [],
    datacheck: 0
  }

  componentDidMount = () => {
    this.props.resetState()
  }


  UNSAFE_componentWillReceiveProps = (nextProps) => {
    const { flightList } = this.props
    const { date, withoutDate } = this.state
    let datasource = []
    let check = 0
    if (nextProps.flightList !== flightList) {
      if (nextProps.flightList)
        if (!isEmpty(nextProps.flightList.Quotes)) {
          nextProps.flightList.Quotes.map((quote, index) => {
            if (moment(quote.OutboundLeg.DepartureDate).format("YYYY-MM-DD") === date || withoutDate === true) {
              check++
              let fromData = nextProps.flightList.Places && nextProps.flightList.Places.map(places => {
                if (places.PlaceId === quote.OutboundLeg.OriginId) {
                  return places.Name
                }
                return false
              })

              let toData = nextProps.flightList.Places && nextProps.flightList.Places.map(places => {
                if (places.PlaceId === quote.OutboundLeg.DestinationId)
                  return places.Name
                return false
              })

              let carrierData = nextProps.flightList.Carriers && nextProps.flightList.Carriers.map(carrier => {
                return quote.OutboundLeg.CarrierIds.map(id => {
                  if (carrier.CarrierId === id)
                    return carrier.Name
                })
                return false
              })

              datasource.push({
                key: index,
                date: moment(quote.OutboundLeg.DepartureDate).format("YYYY-MM-DD"),
                from: !isEmpty(fromData) && fromData.filter(Boolean),
                to: !isEmpty(toData) && toData.filter(Boolean),
                direct: quote.Direct ? "Yes" : "No",
                carriers: !isEmpty(carrierData) && carrierData.filter(Boolean),
                price: `$${quote.MinPrice}`
              })
            }
          })
          this.setState({ flightsData: datasource, datacheck: check })
        }
    }
  }



  handleCountrySelect = (val) => {
    this.setState({ country: val, origin: '', destination: '', originError: false, destinationError: false })
    this.props.fetchPlaces(val)
  }

  handleDestinationSelect = (val) => {
    this.setState({ destination: val, destinationError: false })
  }
  handleOriginSelect = (val) => {
    this.setState({ origin: val, originError: false })
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

  handleDateChange = val => {
    this.setState({ date: val })
  }

  disabledDate = (current) => {
    return current && current < moment().endOf('day');
  }


  render() {
    const { places_data, isLoading, flightList, error, place_error, countries_data } = this.props
    const { flightsData, datacheck, origin, destination, date, withoutDate, originError, destinationError } = this.state
    const { Option } = Select;
    const { Title } = Typography;
    return (
      <div style={{ marginTop: "20px" }}>
        {isLoading && <OverLoader />}
        <Row>
          <Col span={12} offset={10}>
            <h2>Welcome To Airline </h2>
          </Col>
        </Row>
        <Form {...formItemLayout}>
          <Row>
            <Col span={12} offset={9}>
              <Form.Item label="Country" labelCol={{ span: 24 }}>
                <Select
                  size="large"
                  showSearch
                  style={{ width: "300px" }}
                  placeholder="Select the Country"
                  optionFilterProp="children"
                  onChange={this.handleCountrySelect}
                  filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {Countries && Countries.map((data, index) => <Option key={index} value={data.name}>{data.name}</Option>)}

                </Select>
              </Form.Item>
            </Col>
          </Row>
          {
            places_data &&
            <Row justify="center">
              <Col span={6} >
                <Form.Item label="Origin" labelCol={{ span: 24 }}
                  help={originError && "Please Select Origin"}
                  validateStatus={originError && "error"}>
                  <Select
                    size="large"
                    showSearch
                    style={{ width: "300px" }}
                    value={origin}
                    placeholder="Select Origin Place"
                    optionFilterProp="children"
                    onChange={this.handleOriginSelect}
                    onSearch={() => this.setState({ originError: false })}
                    filterOption={(input, option) =>
                      option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {places_data.map((data, index) => <Option key={index} value={data.PlaceId}>{data.PlaceName}</Option>)}

                  </Select>
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label="Destination"
                  labelCol={{ span: 24 }}
                  help={destinationError && "Please Select Destination"}
                  validateStatus={destinationError && "error"}>
                  <Select
                    size="large"
                    showSearch
                    style={{ width: "300px" }}
                    value={destination}
                    placeholder="Select Destination Place"
                    optionFilterProp="children"
                    onChange={this.handleDestinationSelect}
                    onSearch={() => this.setState({ destinationError: false })}
                    filterOption={(input, option) =>
                      option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {places_data.map((data, index) => <Option key={index} value={data.PlaceId}>{data.PlaceName}</Option>)}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item labelCol={{ span: 24 }} label="Departure Date">
                  <DatePicker size="large"
                    style={{ width: "300px" }}
                    allowClear={false}
                    format={dateFormat}
                    disabledDate={this.disabledDate}
                    value={moment(date, dateFormat)}
                    onChange={this.handleDateChange} />
                </Form.Item>
              </Col>
            </Row>
          }
          {
            places_data &&
            <Row justify="center" style={{ marginTop: 10 }}>
              <Col span={12} offset={6}>
                <Button type="submit" onClick={() => this.handleRouteSubmit(false)} type="primary" >Browse Flights</Button>
                <Button style={{ marginLeft: "10px" }} type="submit" onClick={() => this.handleRouteSubmit(true)} variant="outlined" color="primary" >Browse Flights Without Date</Button>
              </Col>
            </Row>
          }
        </Form >
        <br />
        <br />
        {
          flightList &&
          <FlightList flightList={flightsData} datacheck={datacheck} withoutDate={withoutDate} />
        }
        <div className="h-50">
          {
            error &&
            <small style={{ color: "red" }}> No Flight Found. Try Changing date or Location</small>
          }
        </div>
      </div >

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
    resetState: () => dispatch(resetState()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
