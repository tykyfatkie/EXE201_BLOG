import React from 'react';
import { 
  FileTextOutlined,
  EditOutlined,
  TeamOutlined,
  SettingOutlined,
  LogoutOutlined,
  BarChartOutlined
} from '@ant-design/icons';
import { Layout, Menu, Avatar, Button, Modal } from 'antd';
import type { MenuProps } from 'antd';
import '../../css/Sidebar.css';
import Logo from '../../images/logo.png';

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
      children: [
        {
          key: '2-1',
          label: 'Tất cả bài viết',
        },
        {
          key: '2-2',
          label: 'Bài viết đã xuất bản',
        },
        {
          key: '2-3',
          label: 'Bài viết đã xóa',
        },
      ],
    },
    {
      key: '3',
      icon: <BarChartOutlined />,
      label: 'Thống kê',
    },
    {
      key: '4',
      icon: <TeamOutlined />,
      label: 'Quản lý người dùng',
    },
    {
      key: '5',
      icon: <SettingOutlined />,
      label: 'Cài đặt',
    },
  ];

  const handleLogout = () => {
    Modal.confirm({
      title: 'Xác nhận đăng xuất',
      content: 'Bạn có chắc chắn muốn đăng xuất khỏi hệ thống?',
      okText: 'Đăng xuất',
      cancelText: 'Hủy',
      onOk: () => {
        // Xóa localStorage
        localStorage.clear();
        
        // Xóa sessionStorage
        sessionStorage.clear();
        
        // Xóa tất cả cookies
        document.cookie.split(";").forEach(cookie => {
          const eqPos = cookie.indexOf("=");
          const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
          // Xóa cookie cho domain hiện tại
          document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
          // Xóa cookie cho subdomain
          document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=" + window.location.hostname;
          // Xóa cookie cho domain gốc
          document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=." + window.location.hostname.split('.').slice(-2).join('.');
        });
        
        // Xóa authentication tokens khỏi window object (nếu có)
        if ('authToken' in window) delete (window as any).authToken;
        if ('accessToken' in window) delete (window as any).accessToken;
        if ('refreshToken' in window) delete (window as any).refreshToken;
        
        // Redirect về trang login
        window.location.href = '/login';
        // Hoặc nếu dùng React Router:
        // navigate('/login');
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
              <Avatar size={32} className="user-avatar">
                Phat
              </Avatar>
              <div className="user-details">
                <div className="user-name">Admin Phat</div>
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