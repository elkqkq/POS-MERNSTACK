import React, { useState } from "react";
import { useSelector } from "react-redux"
import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  LogoutOutlined,
  HomeOutlined,
  CopyOutlined,
  UnorderedListOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import "../styles/DefaultLayout.css";
const { Header, Sider, Content } = Layout;

 const DefaultLayout =({children}) => {
    const {cartItems} = useSelector(state => state.rootReducer)
    const [collapsed, setCollapsed] = useState(false)
    

  const toggle = () => {
    setCollapsed(
      !collapsed,
    );
  };

  
    return (
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="logo">
            <h1 className="text-center text-light font-wight-bold mt-4">POS</h1>
          </div>
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={window.location.pathname}
          >
           <Menu.Item key="/" icon={<HomeOutlined />}>
                <Link to="/" style={{ textDecoration: 'none' }}>Home</Link>
            </Menu.Item>
            <Menu.Item key="/bills" icon={<CopyOutlined />}>
             <Link to="/bills" style={{ textDecoration: 'none' }}>Bills</Link>
            </Menu.Item>
            <Menu.Item key="/items" icon={<UnorderedListOutlined />}>
             <Link to="/items" style={{ textDecoration: 'none' }}>Items</Link>
            </Menu.Item>
            <Menu.Item key="/customers" icon={<UserOutlined />}>
                <Link to="/customers" style={{ textDecoration: 'none' }}>Cutomers</Link>
            </Menu.Item>
            <Menu.Item key="/logout" icon={<LogoutOutlined />}>
             Logout
            </Menu.Item>

          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }}>
            {React.createElement(
              collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: "trigger",
                onClick: toggle,
              }
            )}
            <div className="cartItems">
            <p>{cartItems && cartItems.length}</p>
                <ShoppingCartOutlined />
            </div>
          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    );
  
}

export default DefaultLayout