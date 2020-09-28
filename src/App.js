import React, { Fragment, useState, useEffect } from 'react';
import logo from './logo.png';
import './App.css';
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
import HomePage from './Components/Container/HomePage';
import { useTranslation } from 'react-i18next'



function App() {
  const islogin = localStorage.getItem('login');
  const login = useSelector(state => state.login)
  const { Header, Content, Sider } = Layout;
  const path = window.location.pathname
  const height = useWindowWidth()
  const { t, i18n } = useTranslation()


  const changeLanguage = (language) => {
    i18n.changeLanguage(language)
  }
  return (
    <Layout>
      <Header className="header" style={{ position: 'fixed', zIndex: 1, width: '100%', }}>
        <Row>
          <Col span={4}>
            <h1 style={{ color: "white" }}>Airline</h1>
          </Col>
          {(login.isLoggedIn || islogin) &&
            <Fragment>
              <Col span={14}>
                <Menu theme="dark" style={{ height: "64px" }} mode="horizontal" defaultSelectedKeys={(path === "/international" && ['2']) || (path === "/booking" && ['3']) || (path === "/" && ['1']) || ['0']}>

                  <Menu.Item key="1"><Link to="/">{t('localFlight')}</Link></Menu.Item>
                  <Menu.Item key="2"><Link to="/international">{t('internationalFlight')}</Link></Menu.Item>
                  <Menu.Item key="3"><Link to="/booking">{t('booking')}</Link></Menu.Item>

                </Menu>

              </Col>
              <Col span={1}>
                <Button type="link" onClick={() => {
                  changeLanguage("en")
                }}>EN</Button>
              </Col>
              <Col span={3}>
                <Button type="link" onClick={() => {
                  changeLanguage("de")
                }}>DE</Button>
              </Col>
              <Col span={2}>
                <Button type="link" onClick={() => {
                  localStorage.removeItem("login")
                  window.location.reload()
                }}>{t('logout')}</Button>
              </Col>
            </Fragment>
          }
        </Row>
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
