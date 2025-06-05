import React from 'react';
import { Layout } from 'antd';
import Header from './Header';
import Footer from './Footer';
import HomePage from '../../pages/HomePage';

const { Content } = Layout;

interface AppLayoutProps {
  children?: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header />
      <Content style={{ flex: 1 }}>
        {children || <HomePage />}
      </Content>
      <Footer />
    </Layout>
  );
};

export default AppLayout;