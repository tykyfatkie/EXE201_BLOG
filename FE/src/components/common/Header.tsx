import React, { useState } from 'react';
import { 
  Layout, 
  Button, 
  Drawer} from 'antd';
import { 
  MenuOutlined, 
  UserOutlined 
} from '@ant-design/icons';
import '../../css/Header.css';
import { Link } from 'react-router-dom';

const { Header: AntHeader } = Layout;

interface HeaderProps {
  // Props có thể được thêm vào sau nếu cần
}

const Header: React.FC<HeaderProps> = () => {
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false);

  const showMobileMenu = () => {
    setMobileMenuVisible(true);
  };

  const closeMobileMenu = () => {
    setMobileMenuVisible(false);
  };

  return (
    <AntHeader className="grab-header">
      <div className="header-container">
        {/* Logo */}
        <div className="logo-section">
          <div className="grab-logo">
            <img 
              src="/logo.png" 
              alt="Logo" 
              className="logo-image"
              style={{
                height: '40px',
                width: 'auto',
                objectFit: 'contain'
              }}
            />
          </div>
        </div>

        <div className="header-actions">
       
          <Button type="text" className="help-btn">
            Trung tâm Hỗ trợ
          </Button>


          <Link to="/login">
            <Button type="default" className="signin-btn">
              <UserOutlined />
              Đăng nhập
            </Button>
          </Link>

          <Button
            type="text"
            icon={<MenuOutlined />}
            className="mobile-menu-btn"
            onClick={showMobileMenu}
          />
        </div>
      </div>

      {/* Mobile Drawer */}
      <Drawer
        title="Menu"
        placement="right"
        onClose={closeMobileMenu}
        open={mobileMenuVisible}
        className="mobile-drawer"
      >
        <div className="mobile-actions">
          <Button type="primary" block className="mobile-signin">
            Đăng nhập
          </Button>
          <Button type="default" block className="mobile-help">
            Trung tâm Hỗ trợ
          </Button>
        </div>
      </Drawer>
    </AntHeader>
  );
};

export default Header;