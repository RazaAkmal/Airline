import React, { Component } from 'react'
import '../App.css'
import { Table, Button, Row, Col, ConfigProvider, Modal } from 'antd';
import { Link } from 'react-router-dom'
import { Trans } from 'react-i18next';
import fire from '../config/firebase'
import { connect } from 'react-redux'

const columns = [
  {
    title: 'Departure Date',
    dataIndex: 'date',
    sorter: {
      compare: (a, b) => new Date(a.date) - new Date(b.date),
    },
  },
  {
    title: 'Flight From',
    dataIndex: 'from',
  },
  {
    title: 'Fligh To',
    dataIndex: 'to',
  },
  {
    title: 'Direct Flight',
    dataIndex: 'direct',
    sorter: {
      compare: (a, b) => a.direct.length - b.direct.length,
    },
  },
  {
    title: 'Carriers',
    dataIndex: 'carriers',
  },
  {
    title: 'Ticket Price',
    dataIndex: 'price',
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

class Booking extends Component {

  state = {
    selectedFlights: '',
    dataKeys: '',
    selectedRow: ''
  }

  componentDidMount = () => {
    const { user } = this.props
    const rootRef = fire.database().ref().child('bookings/' + user.uid)
    rootRef.orderByKey().on('value', snap => {
      let data = snap.val()
      if (data !== null) {
        let flightsDataKeys = Object.keys(data)
        let flightsData = Object.values(data)
        flightsData.forEach((element, index) => {
          element.key = index
        })
        this.setState({ selectedFlights: flightsData, dataKeys: flightsDataKeys })
      }
    })
  }

  handleCancelFlight = () => {
    const { selectedRow, dataKeys } = this.state
    const { user } = this.props

    fire.database().ref(`bookings/${user.uid}/${dataKeys[selectedRow]}`).remove().then(res => {
      Modal.success({
        content: 'Your Flight Has been Cancelled Successfully.',
      });
    })
      .catch((err) => {
        Modal.error({
          content: 'Something went wrong!',
        });
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
              <Table columns={columns} dataSource={this.state.selectedFlights} rowSelection={{
                type: "radio",
                onChange: (selectedRowKeys, selectedRows) => {
                  this.setState({ selectedRow: selectedRowKeys })
                },
              }} />
            </Col>
          </Row>
          <Button onClick={this.handleCancelFlight} type="primary" >Cancel Flight</Button>
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
