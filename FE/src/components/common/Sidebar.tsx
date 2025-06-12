import React from 'react';
import { 
  FileTextOutlined,
  EditOutlined,
  LogoutOutlined} from '@ant-design/icons';
import { Layout, Menu, Avatar, Button, Modal } from 'antd';
import type { MenuProps } from 'antd';
import '../../css/Sidebar.css';
import Logo from '../../images/logo.png';
import AvatarImage from '../../images/avatar.jpg';

const { Sider } = Layout;

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  selectedKey: string;
  setSelectedKey: (key: string) => void;
}

type MenuItem = Required<MenuProps>['items'][number];

const Sidebar: React.FC<SidebarProps> = ({ 
  collapsed, 
  selectedKey, 
  setSelectedKey 
}) => {
  const menuItems: MenuItem[] = [
    {
      key: '1',
      icon: <EditOutlined />,
      label: 'Viết tin tức',
    },
    {
      key: '2',
      icon: <FileTextOutlined />,
      label: 'Quản lý bài viết',
    },
  ];

  const handleLogout = () => {
    Modal.confirm({
      title: 'Xác nhận đăng xuất',
      content: 'Bạn có chắc chắn muốn đăng xuất khỏi hệ thống?',
      okText: 'Đăng xuất',
      cancelText: 'Hủy',
      onOk: () => {
        localStorage.clear();      
        sessionStorage.clear();      
        if ('authToken' in window) delete (window as any).authToken;
        if ('accessToken' in window) delete (window as any).accessToken;
        if ('refreshToken' in window) delete (window as any).refreshToken;
        window.location.href = '/';

      }
    });
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
            <img 
              src={Logo}
              alt="Logo" 
              className="logo-image"
              style={{
                height: collapsed ? '32px' : '40px',
                width: 'auto',
                objectFit: 'contain',
                transition: 'all 0.3s ease'
              }}
            />           
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
              <Avatar 
                size={32} 
                src={AvatarImage}
                alt="Admin Avatar"
                className="user-avatar"
              />
              <div className="user-details">
                <div className="user-name">Admin</div>
                <div className="user-role">Quản trị viên</div>
              </div>
            </div>
            <Button 
              type="text" 
              icon={<LogoutOutlined />} 
              onClick={handleLogout}
              className="logout-btn"
              style={{
                width: '100%',
                marginTop: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
                color: '#ff4d4f',
                padding: '8px 16px'
              }}
            >
              Đăng xuất
            </Button>
          </div>
        )}
        
        {collapsed && (
          <div className="sidebar-footer-collapsed">
            <Button 
              type="text" 
              icon={<LogoutOutlined />} 
              onClick={handleLogout}
              className="logout-btn-collapsed"
              style={{
                width: '100%',
                height: '48px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ff4d4f',
                marginTop: '8px'
              }}
              title="Đăng xuất"
            />
          </div>
        )}
      </Sider>
    </>
  );
};

export default Sidebar;