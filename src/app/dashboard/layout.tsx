'use client'
import React, { useEffect, useState } from 'react';
import {
  CarOutlined, 
  HomeOutlined, 
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined, 
  ReconciliationOutlined,
  RestOutlined, 
  SolutionOutlined, 
  UserOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import {  Button, Flex, Layout, Menu, Spin,  } from 'antd';
import DumpsterLogo from '@/app/ui/components/logo'; 
import { useAuth } from '../hooks/useAuth';
import { useRouter } from 'next/navigation';

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}
 
  

const items: MenuItem[] = [
  getItem('Home', '/dashboard/home',<HomeOutlined />),
  getItem('Dumpsters', '/dashboard/dumpsters' ,<RestOutlined />),
  getItem('Customers', '/dashboard/customers',<SolutionOutlined />),
  getItem('Contract Management', 'sub1' ,<ReconciliationOutlined />, [
    getItem('Contracts', '/dashboard/contracts'),
    getItem('Fixs', '/dashboard/fixs',) 
  ]),
   getItem('Drivers', '/dashboard/drivers',<CarOutlined />),
   getItem('User Management', '/dashboard/userManagement', <UserOutlined />),
    
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false); 
  const { user, loading, login, logout } = useAuth();
  const router = useRouter();
 
const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // Forzar repaint para aplicar estilos correctamente
    setTimeout(() => window.dispatchEvent(new Event('resize')), 100);
  }, []);
   

 const handleMenuClick = (event:any) => {
    router.push(event.key)  
  }

  return ( 
    
    <Layout   style={{ minHeight: '100vh',visibility: isMounted ? 'visible' : 'hidden' }}>
      <Sider  trigger={null} collapsible collapsed={collapsed}>
        <div className="w-32 text-white md:w-40">
          {!collapsed ? <DumpsterLogo />:<></> }
        </div>
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} onClick={handleMenuClick} />
      </Sider>
      <Layout >
        <Header className="main-header" >
          <Flex   justify='space-between' align='center'> 
            <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '24px',
              width: 64,
              height: 64,
              color:'#fff'
            }}
          />
           
          <div className="flex justify-end items-center">
             
           <Button
            type="text"
            icon={ <LogoutOutlined />}
            onClick={() => {logout();  router.push("/") }}
            style={{
              fontSize: '24px',
              width: 64,
              height: 64,
              color:'#fff'
            }}
          />        
          
          </div>
          </Flex>
        </Header>
        <Content style={{ margin: '0 16px' }}>
            {children}
        </Content>
        <Footer style={{ textAlign: 'center' }}>
         
        </Footer>
      </Layout>
    </Layout>
   
    
  );
};

