import React from 'react';
import logo from './logo.png';
import './App.css';
import HomePage from './Components/HomePage'
import LoginPage from './Components/LoginPage'
import { useSelector } from 'react-redux'
import 'antd/dist/antd.css';
import {
  Route,
  Link,
} from "react-router-dom";
import InternationalPage from './Components/InternationalPage';
import { Layout, Menu, Button } from 'antd';


function App() {
  const islogin = localStorage.getItem('login');
  const login = useSelector(state => state.login)
  const { Header, Content, Sider } = Layout;
  const path = window.location.pathname
  return (
    <Layout>
      <Header className="header" style={{ position: 'fixed', zIndex: 1, width: '100%', }}>
        <div className="logo" >
          <h2>AirLine</h2>
        </div>
        {(login.isLoggedIn || islogin) &&
          <Menu theme="dark" style={{ height: "64px" }} mode="horizontal" defaultSelectedKeys={path === "/international" ? ['2'] : ['1']}>

            <Menu.Item key="1"><Link to="/">Local Flights</Link></Menu.Item>
            <Menu.Item key="2"><Link to="/international">International Flights</Link></Menu.Item>

          </Menu>

        }
        <Button type="link" onClick={() => {
          localStorage.clear()
          window.location.reload()
        }}>Logout</Button>
      </Header>
      <Content
        className="site-layout-background"
        style={{
          padding: 24,
          marginTop: 64,
          minHeight: 380,
        }}
      >
        {(login.isLoggedIn || islogin) ?
          <div>
            <Route path="/international">
              <InternationalPage />
            </Route>
            <Route exact path="/">
              <HomePage />
            </Route>
          </div>
          : <LoginPage />}
      </Content>
    </Layout>
  );
}

export default App;
