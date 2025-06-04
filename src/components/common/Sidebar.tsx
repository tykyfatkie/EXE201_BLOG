import React, { useState } from 'react';
import { 
  MenuFoldOutlined, 
  MenuUnfoldOutlined,
  DashboardOutlined,
  FileTextOutlined,
  EditOutlined,
  TeamOutlined,
  SettingOutlined,
  LogoutOutlined,
  BellOutlined,
  BarChartOutlined
} from '@ant-design/icons';
import { Layout, Menu, Button, Avatar, Dropdown, Badge } from 'antd';
import type { MenuProps } from 'antd';
import '../../css/Sidebar.css';

const { Sider, Header } = Layout;

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  selectedKey: string;
  setSelectedKey: (key: string) => void;
}

type MenuItem = Required<MenuProps>['items'][number];

const Sidebar: React.FC<SidebarProps> = ({ 
  collapsed, 
  setCollapsed, 
  selectedKey, 
  setSelectedKey 
}) => {
  const menuItems: MenuItem[] = [
    {
      key: '1',
      icon: <DashboardOutlined />,
      label: 'Dashboard',
    },
    {
      key: '2',
      icon: <EditOutlined />,
      label: 'Viết tin tức',
    },
    {
      key: '3',
      icon: <FileTextOutlined />,
      label: 'Quản lý bài viết',
      children: [
        {
          key: '3-1',
          label: 'Tất cả bài viết',
        },
        {
          key: '3-2',
          label: 'Bài viết nháp',
        },
        {
          key: '3-3',
          label: 'Bài viết đã xuất bản',
        },
      ],
    },
    {
      key: '4',
      icon: <BarChartOutlined />,
      label: 'Thống kê',
    },
    {
      key: '5',
      icon: <TeamOutlined />,
      label: 'Quản lý người dùng',
    },
    {
      key: '6',
      icon: <SettingOutlined />,
      label: 'Cài đặt',
    },
  ];

  const userMenuItems: MenuProps['items'] = [
    {
      key: 'profile',
      label: 'Hồ sơ của tôi',
    },
    {
      key: 'settings',
      label: 'Cài đặt tài khoản',
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      label: 'Đăng xuất',
      icon: <LogoutOutlined />,
      danger: true,
    },
  ];

  const handleUserMenuClick = ({ key }: { key: string }) => {
    switch (key) {
      case 'logout':
        // Clear authentication data if needed
        localStorage.removeItem('authToken');
        sessionStorage.removeItem('userData');
        
        // Redirect to home page
        window.location.href = '/';
        break;
      case 'profile':
        // Handle profile navigation
        console.log('Navigate to profile');
        break;
      case 'settings':
        // Handle settings navigation
        console.log('Navigate to settings');
        break;
      default:
        break;
    }
  };

  const handleMenuClick = ({ key }: { key: string }) => {
    setSelectedKey(key);
  };

  return (
    <>
      <Sider 
        trigger={null} 
        collapsible 
        collapsed={collapsed}
        className="sidebar"
        width={280}
        collapsedWidth={80}
      >
        <div className="sidebar-logo">
          <div className="logo-container">
            <div className="logo-icon">
              {collapsed ? 'N' : 'NewsAdmin'}
            </div>
          </div>
        </div>
        
        <Menu
          theme="light"
          mode="inline"
          selectedKeys={[selectedKey]}
          items={menuItems}
          onClick={handleMenuClick}
          className="sidebar-menu"
        />
        
        {!collapsed && (
          <div className="sidebar-footer">
            <div className="user-info">
              <Avatar size={32} className="user-avatar">
                A
              </Avatar>
              <div className="user-details">
                <div className="user-name">Admin User</div>
                <div className="user-role">Quản trị viên</div>
              </div>
            </div>
          </div>
        )}
      </Sider>

      <Header className="dashboard-header">
        <div className="header-left">
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            className="collapse-btn"
          />
          <h2 className="page-title">Dashboard Quản trị</h2>
        </div>
        
        <div className="header-right">
          <Badge count={5} size="small" className="notification-badge">
            <Button 
              type="text" 
              icon={<BellOutlined />} 
              className="notification-btn"
            />
          </Badge>
          
          <Dropdown 
            menu={{ items: userMenuItems, onClick: handleUserMenuClick }} 
            placement="bottomRight"
            trigger={['click']}
          >
            <div className="user-dropdown">
              <Avatar size={36} className="header-avatar">
                A
              </Avatar>
              <span className="user-name-header">Admin</span>
            </div>
          </Dropdown>
        </div>
      </Header>
    </>
  );
};

export default Sidebar;