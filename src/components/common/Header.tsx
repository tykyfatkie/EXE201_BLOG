import React, { useState } from 'react';
import { 
  Layout, 
  Button, 
  Drawer,
  Typography
} from 'antd';
import { 
  MenuOutlined, 
  UserOutlined 
} from '@ant-design/icons';
import '../../css/Header.css';

const { Header: AntHeader } = Layout;
const { Text } = Typography;

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
            <Text className="logo-text">CDC</Text>
          </div>
        </div>

        <div className="header-actions">
       
          <Button type="text" className="help-btn">
            Trung tâm Hỗ trợ
          </Button>


          <Button type="default" className="signin-btn">
            <UserOutlined />
            Đăng nhập
          </Button>

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