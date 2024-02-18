import React from 'react';
import { Layout, Menu ,Button} from 'antd';
import { FileTextOutlined, UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import basic from './basic.module.css'
import { useState } from 'react';


const { Sider, Content, Header } = Layout;

const BasicLayout = () => {
  const [selectedMenuItem, setSelectedMenuItem] = useState('dashboard');
  const navigate=useNavigate()
  const handleLogout = () => {
    
    localStorage.removeItem('token');
  
    
    navigate('/');
  
    console.log('Logged out');
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      
      <Sider width={200} theme="dark">
        <h1 style={{textAlign:'center' ,color:'white'}}>fabbricato</h1>
        <Menu mode="vertical" theme="dark" defaultSelectedKeys={['dashboard']} onSelect={({ key }) => setSelectedMenuItem(key)}>
        <Menu.Item key="dashboard"  icon={<FileTextOutlined />} >
            <Link to="/app">Dashboard</Link>
          </Menu.Item>
          <Menu.SubMenu key="ticketsSubMenu" icon={<FileTextOutlined />} title="Products">
        <Menu.Item key="products">
          <Link to="/app/products">Products</Link>
        </Menu.Item>
        <Menu.Item key="addTickets">
          <Link to="/app/addproducts">Add Products</Link>
        </Menu.Item>
      </Menu.SubMenu>
      <Menu.Item key="bookings" icon={<UserOutlined />}>
            <Link to="/app/bookings">Orders</Link>
          </Menu.Item>
          <Menu.Item key="users" icon={<UserOutlined />}>
            <Link to="/app/users">Users</Link>
          </Menu.Item>
          <Menu.SubMenu key="settings" icon={<FileTextOutlined />} title="Settings">
        <Menu.Item key="password">
          <Link to="/app/resetpass">Reset Password</Link>
        </Menu.Item>
        
      </Menu.SubMenu>
        </Menu>
      </Sider>
      <Layout>
        <Header>
          <h2 >{selectedMenuItem}</h2>
          <Button type='primary'onClick={handleLogout} icon={<LogoutOutlined/>} danger>Logout</Button>
          {/* <Link to="/app/tickets">Manage Tickets</Link>
          <Link to="/app/users">Users</Link>
          <span onClick={handleLogout}>Logout</span> */}
        </Header>
        <Content style={{ padding: '20px', overflowY: 'auto', height: 'calc(100vh - 64px - 20px)' }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default BasicLayout;
