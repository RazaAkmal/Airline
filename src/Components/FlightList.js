import React, { useState, useEffect } from 'react'
import isEmpty from 'lodash.isempty';
import { Table, Row, Col } from 'antd';


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
    title: 'Flight To',
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


export default function FlightList(props) {

  const rowSelection = {
    selectedRowKeys: props.rowKey,
    onChange: (selectedRowKeys, selectedRows) => {
      props.handlSelectedFlights(selectedRows, selectedRowKeys)
    },
  };

    const [origin, setOrigin] = useState('');
    const [destination, setDestination] = useState('');

  useEffect(() => {
    setOrigin(props.origin)
    setDestination(props.destination)
  }, [props.isLocationChange]);

  return (
    <div>
      {!isEmpty(props.flightList) &&
        <div>
        <Row justify="center">
            <Col span={12}>
              <p className="content-header__section">Results</p>
              <h1 className="content-header">Flight Schedule For {origin} to {destination}</h1>
              <h3 className="content-header">{props.withoutDate ? "From" : "On"} {props.flightList[0].date} </h3>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Table columns={columns} dataSource={props.flightList} rowSelection={{
                type: "radio",
                ...rowSelection,
              }} />
            </Col>
          </Row>
        </div>
      }
      {props.datacheck === 0 || isEmpty(props.flightList) ? <small style={{ color: "red" }}> No Flight Found. Try Changing date or Location</small> : ''}
    </div>
  )
}


