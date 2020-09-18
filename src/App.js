import React, { useState, useEffect } from 'react';
import logo from './logo.png';
import './App.css';
import HomePage from './Components/HomePage'
import LoginPage from './Components/LoginPage'
import { useSelector } from 'react-redux'
import 'antd/dist/antd.css';
import {
  Route,
  Link,
  Switch
} from "react-router-dom";
import InternationalPage from './Components/InternationalPage';
import { Layout, Menu, Button, Row, Col } from 'antd';
import airplane from './background-img.jpg'
import Booking from './Components/Booking';
import PageNotFound from './Components/PageNotFound';

function App() {
  const islogin = localStorage.getItem('login');
  const login = useSelector(state => state.login)
  const { Header, Content, Sider } = Layout;
  const path = window.location.pathname
  const height = useWindowWidth()

  return (
    <Layout>
      <Header className="header" style={{ position: 'fixed', zIndex: 1, width: '100%', }}>
        <div className="logo" >
          <h1>Airline</h1>
        </div>
        {(login.isLoggedIn || islogin) &&
          <Row>
            <Col span={22}>
              <Menu theme="dark" style={{ height: "64px" }} mode="horizontal" defaultSelectedKeys={(path === "/international" && ['2']) || (path === "/booking" && ['3']) || (path === "/" && ['1']) || ['0']}>

                <Menu.Item key="1"><Link to="/">Local Flights</Link></Menu.Item>
                <Menu.Item key="2"><Link to="/international">International Flights</Link></Menu.Item>
                <Menu.Item key="3"><Link to="/booking">Bookings</Link></Menu.Item>

              </Menu>

            </Col>
            <Col span={2}>
              <Button type="link" onClick={() => {
                localStorage.removeItem("login")
                window.location.reload()
              }}>Logout</Button>
            </Col>
          </Row>
        }
      </Header>
      <Content
        style={{
          padding: 24,
          marginTop: 64,
          minHeight: height,
          background: `url(${airplane})`,
          backgroundSize: "cover",
        }}
      >
        {(login.isLoggedIn || islogin) ?
          <div>
            <Switch>
              <Route path="/international">
                <InternationalPage />
              </Route>
              <Route exact path="/">
                <HomePage />
              </Route>
              <Route exact path="/booking">
                <Booking />
              </Route>
              <Route>
                <PageNotFound />
              </Route>
            </Switch>
          </div>
          : <LoginPage />}
      </Content>
    </Layout>
  );
}


function useWindowWidth() {

  const [height, setHeight] = useState(window.innerHeight)
  useEffect(() => {
    const handleResize = () => setHeight(window.innerHeight)
    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  })

  return height
}

export default App;
