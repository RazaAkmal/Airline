import React, { Component }from 'react'
import '../App.css'
import { Table, Button, Row, Col, ConfigProvider } from 'antd';
import { Link } from 'react-router-dom'
import { Trans } from 'react-i18next';
import fire from '../config/firebase'
import {connect} from 'react-redux'

const columns = [
  {
    title: 'Departure Date',
    dataIndex: 'date',
    key: 'date',
    sorter: {
      compare: (a, b) => new Date(a.date) - new Date(b.date),
    },
  },
  {
    title: 'Flight From',
    dataIndex: 'from',
    key: 'from',
  },
  {
    title: 'Fligh To',
    dataIndex: 'to',
    key: 'to',
  },
  {
    title: 'Direct Flight',
    dataIndex: 'direct',
    key: 'direct',
    sorter: {
      compare: (a, b) => a.direct.length - b.direct.length,
    },
  },
  {
    title: 'Carriers',
    dataIndex: 'carriers',
    key: 'carriers',
  },
  {
    title: 'Ticket Price',
    dataIndex: 'price',
    key: 'price',
    sorter: {
      compare: (a, b) => Number(a.price.slice(1)) - Number(b.price.slice(1)),
    },
  },
];

const customizeRenderEmpty = () => (
  <div style={{ textAlign: 'center' }}>
    <img alt='No Data img' src="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
      imagestyle={{
        height: 60,
      }} />
    <p style={{ color: "rgba(0, 0, 0, 0.85)" }}>No Flights Booked Yet!</p>
    <Button type="primary"><Link to="/">Book Now</Link></Button>
  </div>
);

class Booking extends Component{

  state = {
    selectedFlights: ''
  }

  componentDidMount = () => {
    const {user} = this.props
    const rootRef = fire.database().ref().child('bookings/'+ user.uid )
    rootRef.orderByKey().on('value', snap => {
      let data = snap.val()
      if (data !== null) {
        let flightsData = Object.values(data)
        this.setState({ selectedFlights: flightsData })
      }
    })
  }


  render() {
    return (
      <ConfigProvider renderEmpty={customizeRenderEmpty}>
        <div className="content">
          <Row justify="center">
            <Col span={12}>
              <h1 className="content-header"><Trans i18nKey="bookingTitle" /></h1>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Table columns={columns} dataSource={this.state.selectedFlights} />
            </Col>
          </Row>
        </div>
      </ConfigProvider>
    )
  }
}

const mapStateToProps = ({ login }) => {
  return {
    user: login.user
  }
}

export default connect(mapStateToProps, null)(Booking) 
