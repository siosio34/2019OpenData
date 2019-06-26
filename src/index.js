// @format

import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Icon, Layout, Menu } from 'antd';

import EventsPage from './pages/events';
import FixEventPage from './pages/fixEvent';
import AddEventPage from './pages/addEvent';

import 'antd/dist/antd.css';
import './styles.css';

const rootElement = document.getElementById('root');

const { Header, Content, Sider } = Layout;

ReactDOM.render(
  <Layout style={{ minHeight: '100vh' }}>
    <Router>
      <Header className="header">
        <div className="logo" style={{ color: '#ffffff' }}>
          장병혜택백서(관리자)
        </div>
      </Header>

      <Layout>
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
          width={200}
          defaultOpenKeys={['1']}
          style={{ background: '#fff' }}
        >
          <Menu
            mode="inline"
            defaultSelectedKeys={['all']}
            defaultOpenKeys={['events']}
          >
            <Menu.SubMenu
              key="events"
              title={
                <span>
                  <Icon type="gift" />
                  혜택
                </span>
              }
            >
              <Menu.Item key="all">
                <Link to="/">
                  <Icon type="unordered-list" />
                  전체
                </Link>
              </Menu.Item>
              <Menu.Item key="fix">
                <Link to="/fixevent">
                  <Icon type="edit" />
                  수정 요청
                </Link>
              </Menu.Item>
              <Menu.Item key="add">
                <Link to="/addevent">
                  <Icon type="plus" />
                  등록 요청
                </Link>
              </Menu.Item>
            </Menu.SubMenu>
          </Menu>
        </Sider>
        <Layout style={{ padding: '24px 24px' }}>
          <Content
            style={{
              background: '#fff',
              padding: 24,
              margin: 0,
            }}
          >
            <Route exact path="/" component={EventsPage} />
            <Route path="/fixevent" component={FixEventPage} />
            <Route path="/addevent" component={AddEventPage} />
          </Content>
        </Layout>
      </Layout>
    </Router>
  </Layout>,
  rootElement
);
