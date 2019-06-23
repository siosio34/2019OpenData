import React from "react";
import ReactDOM from "react-dom";
import { Layout, Menu } from "antd";
import AcceptPage from "./pages/accept";
import "antd/dist/antd.css";

import "./styles.css";

const rootElement = document.getElementById("root");

const { Header, Content, Sider } = Layout;

ReactDOM.render(
  <Layout>
    <Header className="header">
      <div className="logo" style={{ color: "#ffffff" }}>
        장병혜택백서(관리자)
      </div>
    </Header>

    <Layout>
      <Sider width={200} style={{ background: "#fff" }}>
        <Menu
          mode="inline"
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          style={{ height: "100%", borderRight: 0 }}
        >
          <Menu.Item key="1">혜택 사항</Menu.Item>
          <Menu.Item key="2">수정요청사항</Menu.Item>
          <Menu.Item key="3">추가혜택사항</Menu.Item>
        </Menu>
      </Sider>
      <Layout style={{ padding: "24px 24px" }}>
        <Content
          style={{
            background: "#fff",
            padding: 24,
            margin: 0,
            minHeight: 280
          }}
        >
          <AcceptPage />
        </Content>
      </Layout>
    </Layout>
  </Layout>,
  rootElement
);
