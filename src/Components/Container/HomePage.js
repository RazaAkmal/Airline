import React, { Fragment } from 'react'
import '../../App.css'
import { connect } from 'react-redux'
import { fetchPlaces, fetchFlights, fetchCountires, resetState } from '../../actions';
import Countries from '../common/countries.json'
import OverLoader from '../common/loader';
import FlightList from '../FlightList';
import moment from 'moment'
import { Row, Form, Col, Select, Typography, Button, Space, DatePicker, Checkbox, Modal } from 'antd';
import isEmpty from 'lodash.isempty';
import { withTranslation, Trans } from 'react-i18next';
import { Spring, Transition } from 'react-spring/renderprops'
import MapComponent from './MapComponent';


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
    selectedFlights: [],
    country: '',
    destinationCountry: '',
    destination: '',
    origin: '',
    date: moment(Date()).format('YYYY-MM-DD'),
    withoutDate: false,
    originError: false,
    destinationError: false,
    flightsData: [],
    datacheck: 0,
    destinationName: '',
    originName: '',
    oneway: false,
    inboundDate: moment(Date()).format('YYYY-MM-DD'),
    rowKey: []
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


  handlSelectedFlights = (selectedRow, Key) => {
    this.setState({ selectedFlights: selectedRow, rowKey: Key })
  }


  handleCountrySelect = (val) => {
    const path = window.location.pathname
    if (path !== '/international') {
      this.setState({ country: val, origin: '', destination: '', originError: false, destinationError: false })
    } else {
      this.setState({ country: val, origin: '', originError: false })
    }
    this.props.fetchPlaces(val, "local")
  }

  handleDestinationCountrySelect = (val) => {
    if (this.state.country !== val) {
      this.setState({ destinationCountry: val, destination: '', destinationError: false })
      this.props.fetchPlaces(val, "international")
    } else {
      this.setState({ destinationCountry: val })
    }

  }

  handleDestinationSelect = (val) => {
    const { destinationCountry, country } = this.state
    const { places_data, internationa_places_data } = this.props
    const path = window.location.pathname
    if ((path === '/international' && destinationCountry !== country)) {
      internationa_places_data.forEach(element => {
        if (element.PlaceId === val) {
          this.setState({ destinationName: element.PlaceName, destination: val, destinationError: false })
        }
      });
    } else {
      places_data.forEach(element => {
        if (element.PlaceId === val) {
          this.setState({ originName: element.PlaceName, destination: val, destinationError: false })
        }
      });
    }
  }
  handleOriginSelect = (val) => {
    const { places_data } = this.props
    places_data.forEach(element => {
      if (element.PlaceId === val) {
        this.setState({ originName: element.PlaceName, origin: val, originError: false })
      }
    });
  }

  handleRouteSubmit = (noDate) => {
    const data = this.state
    if (data.origin !== '' && data.destination !== '') {
      if (noDate) {
        this.setState({ withoutDate: true, selectedFlights: [], rowKey: [] })
        this.props.fetchFlights(data, true)
      } else {
        this.setState({ withoutDate: false, selectedFlights: [], rowKey: [] })
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
  handleInboundDateChange = val => {
    this.setState({ inboundDate: val })
  }

  disabledDate = (current) => {
    return current && current < moment().endOf('day');
  }

  handleBookFlight = () => {
    const { selectedFlights } = this.state
    let bookedflights = JSON.parse(localStorage.getItem('selectedFlights'))
    let check = 0
    if (selectedFlights) {
      if (bookedflights !== null) {
        bookedflights.forEach(el => {
          if (selectedFlights[0].date === el.date && el.from[0] === selectedFlights[0].from[0] && el.to[0] === selectedFlights[0].to[0]) {
            check++
          }
        })
        if (check !== 0) {
          Modal.error({
            title: 'You Have Already Booked This Flight',
          });
        } else {
          bookedflights.push(selectedFlights[0])
          localStorage.setItem('selectedFlights', JSON.stringify(bookedflights))
          Modal.success({
            content: 'Your Flight Has been Booked Successfully.',
          });
        }
      } else {
        localStorage.setItem('selectedFlights', JSON.stringify(selectedFlights))
        Modal.success({
          content: 'Your Flight Has been Booked Successfully.',
        });
      }
    }
    else
      Modal.error({
        title: 'Please Select the Flight First',
      });
  }

  render() {
    const { places_data, isLoading, flightList, error, place_error, countries_data, internationa_places_data } = this.props
    const { selectedFlights, rowKey, flightsData, inboundDate, datacheck, origin, destination, country, destinationCountry, date, withoutDate, originError, destinationError, destinationName, originName, oneway } = this.state
    const { Option } = Select;
    const { Title } = Typography;
    const path = window.location.pathname

    return (
      <Spring
        from={{ opacity: 0, transform: "translate3d(-50%, 0px, 0px)" }}
        to={{ opacity: 1, transform: "translate3d(0%, 0px, 0px)" }}>
        {props => <div className="content" style={props}>
          {isLoading && <OverLoader />}
          <div style={{ position: 'absolute', height: places_data ? '55vh' : '30vh', width: '50%', right: 10 }}>
            <MapComponent />
          </div>
          <Row >
            <Col span={18}  >
              <h1> <Trans i18nKey="title" /></h1>
            </Col>
          </Row>
          <Form {...formItemLayout}>
            <Row >
              {/* span={path === '/international' ? 6 : 12} offset={path !== '/international' && 6} */}
              <Col span={20} >
                <Form.Item labelCol={{ span: 24 }} label={<Trans i18nKey="country" />} >
                  <Select
                    size="large"
                    showSearch
                    // style={{ maxWidth: "250px" }}
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
            {path === '/international' &&
              <Row>
                <Col span={20} >
                  <Form.Item labelCol={{ span: 24 }} label={<Trans i18nKey="destinationCountry" />} >
                    <Select
                      size="large"
                      showSearch
                      // style={{ width: "250px" }}
                      placeholder="Select the Destination Country"
                      optionFilterProp="children"
                      onChange={this.handleDestinationCountrySelect}
                      filterOption={(input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                      }
                    >
                      {Countries && Countries.map((data, index) => <Option key={index} value={data.name}>{data.name}</Option>)}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
            }
            {(path !== '/international' || destinationCountry || country === destinationCountry) &&
              places_data &&
              <Row>
                <Col span={20} >
                  <Form.Item labelCol={{ span: 24 }} label="Origin"
                    help={originError && "Please Select Origin"}
                    validateStatus={originError && "error"}>
                    <Select
                      size="large"
                      showSearch
                      // style={{ width: "250px" }}
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
                <Col span={20} >
                  <Form.Item labelCol={{ span: 24 }} label="Destination"

                    help={destinationError && "Please Select Destination"}
                    validateStatus={destinationError && "error"}>
                    <Select
                      size="large"
                      showSearch
                      // style={{ width: "250px" }}
                      value={destination}
                      placeholder="Select Destination Place"
                      optionFilterProp="children"
                      onChange={this.handleDestinationSelect}
                      onSearch={() => this.setState({ destinationError: false })}
                      filterOption={(input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                      }
                    >
                      {(path === '/international' && destinationCountry !== country) ? internationa_places_data && internationa_places_data.map((data, index) => <Option key={index} value={data.PlaceId}>{data.PlaceName}</Option>) :
                        places_data.map((data, index) => <Option key={index} value={data.PlaceId}>{data.PlaceName}</Option>)}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
            }
            {(path !== '/international' || destinationCountry || country === destinationCountry) &&
              places_data &&
              <>
                <Row >
                  <Col span={20} >
                    <Checkbox checked={!oneway} onChange={() => this.setState({ oneway: !oneway })}>One Way</Checkbox>
                  </Col>
                </Row>
                <Row>
                  <Col span={20} >
                    <Transition
                      native
                      items={oneway}
                      from={{ opacity: 0 }}
                      enter={{ opacity: 1 }}
                      leave={{ opacity: 0 }}
                    >
                      {show => show && (props => (
                        <div style={props}>
                          <Form.Item labelCol={{ span: 24 }} label="Returning ">
                            <DatePicker size="large"
                              // style={{ width: "250px" }}
                              allowClear={false}
                              format={dateFormat}
                              disabledDate={this.disabledDate}
                              value={moment(inboundDate, dateFormat)}
                              onChange={this.handleInboundDateChange} />
                          </Form.Item>
                        </div>
                      ))}
                    </Transition>
                  </Col>
                </Row>
              </>
            }
            {(path !== '/international' || destinationCountry || country === destinationCountry) &&
              places_data &&
              <Row style={{ marginTop: '10px' }}>
                <Col span={20} >
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
            <Fragment>
              <FlightList handlSelectedFlights={this.handlSelectedFlights} rowKey={rowKey} flightList={flightsData} datacheck={datacheck} withoutDate={withoutDate} origin={originName} destination={destinationName} />
              {!(datacheck === 0 || isEmpty(flightList)) &&
                <Button type="submit" onClick={this.handleBookFlight} type="primary" >Book Flights</Button>
              }
            </Fragment>
          }
          <div className="h-50">
            {
              error &&
              <small style={{ color: "red" }}> No Flight Found. Try Changing date or Location</small>
            }
          </div>
        </div>

        }
      </Spring>
    )
  }
}

const mapStateToProps = ({ flight }) => {
  return {
    isLoading: flight.loading,
    places_data: flight.places_data,
    internationa_places_data: flight.internationa_places_data,
    countries: flight.countries,
    flightList: flight.flight_list,
    error: flight.error,
    place_error: flight.place_error,
    countries_data: flight.countries_data,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPlaces: (country, type) => dispatch(fetchPlaces(country, type)),
    fetchFlights: (data) => dispatch(fetchFlights(data)),
    fetchCountires: () => dispatch(fetchCountires()),
    resetState: () => dispatch(resetState()),
  }
}

const HomePageComponent = withTranslation()(HomePage)


export default connect(mapStateToProps, mapDispatchToProps)(HomePageComponent)
