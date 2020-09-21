import React from 'react'
import '../App.css'
import { Table, Button, Row, Col, ConfigProvider } from 'antd';
import { Link } from 'react-router-dom'
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
    <img src="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
      imageStyle={{
        height: 60,
      }} />
    <p style={{ color: "rgba(0, 0, 0, 0.85)" }}>No Flights Booked Yet!</p>
    <Button type="primary"><Link to="/">Book Now</Link></Button>
  </div>
);

export default function Booking() {
  let selectedFlights = JSON.parse(localStorage.getItem('selectedFlights'))
  return (
    <ConfigProvider renderEmpty={customizeRenderEmpty}>
      <div className="content">
        <Row justify="center">
          <Col span={12}>
            <h1 className="content-header">Your Booking</h1>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Table columns={columns} dataSource={selectedFlights} />
          </Col>
        </Row>
      </div>
    </ConfigProvider>
  )
}
