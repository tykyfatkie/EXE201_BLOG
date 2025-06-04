import React from 'react';
import { Layout as AntLayout, Menu, Button, Avatar, Dropdown } from 'antd';
import { UserOutlined, PlusOutlined, HomeOutlined, LogoutOutlined } from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const { Header, Content, Footer } = AntLayout;

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuth();

  const handleMenuClick = (key: string) => {
    navigate(key);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const userMenuItems = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: 'Hồ sơ',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Đăng xuất',
      onClick: handleLogout,
    },
  ];

  return (
    <AntLayout className="min-h-screen">
      <Header className="flex items-center justify-between bg-white shadow-sm">
        <div className="flex items-center">
          <div className="text-xl font-bold text-blue-600 mr-8">
            Tin Tức 24h
          </div>
          
          <Menu
            mode="horizontal"
            selectedKeys={[location.pathname]}
            className="border-0"
            items={[
              {
                key: '/',
                icon: <HomeOutlined />,
                label: 'Trang chủ',
                onClick: () => handleMenuClick('/'),
              },
              {
                key: '/news',
                label: 'Tin tức',
                onClick: () => handleMenuClick('/news'),
              },
            ]}
          />
        </div>

        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => navigate('/news/create')}
              >
                Đăng tin
              </Button>
              
              <Dropdown
                menu={{ items: userMenuItems }}
                placement="bottomRight"
              >
                <div className="flex items-center gap-2 cursor-pointer">
                  <Avatar icon={<UserOutlined />} />
                  <span>{user?.fullName}</span>
                </div>
              </Dropdown>
            </>
          ) : (
            <div className="flex gap-2">
              <Button onClick={() => navigate('/login')}>
                Đăng nhập
              </Button>
              <Button type="primary" onClick={() => navigate('/register')}>
                Đăng ký
              </Button>
            </div>
          )}
        </div>
      </Header>

      <Content className="px-6 py-4">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </Content>

      <Footer className="text-center bg-gray-50">
        Tin Tức 24h ©2024 Created by Your Team
      </Footer>
    </AntLayout>
  );
};

export default Layout;