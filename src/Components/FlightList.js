import React from 'react'
import isEmpty from 'lodash.isempty';
import { Table, Button, Row, Col } from 'antd';


const columns = [
  {
    title: 'Departure Date',
    dataIndex: 'date',
    key: 'date',
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
  },
];


export default function FlightList(props) {

  const rowSelection = {
    selectedRowKeys: props.rowKey,
    onChange: (selectedRowKeys, selectedRows) => {
      props.handlSelectedFlights(selectedRows, selectedRowKeys)
    },
  };

  return (
    <div>
      {!isEmpty(props.flightList) &&
        <div>
          <Row justify="center">
            <Col span={12}>
              <p className="content-header__section">Results</p>
              <h1 className="content-header">Flight Schadule For {props.origin} to {props.destination}</h1>
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


