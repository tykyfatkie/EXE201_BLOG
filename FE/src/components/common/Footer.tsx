import React from 'react';
import { Layout, Row, Col, Typography, Space, Button, Divider } from 'antd';
import { 
  FacebookOutlined, 
  TwitterOutlined, 
  InstagramOutlined, 
  LinkedinOutlined,
  YoutubeOutlined,
  AppleOutlined,
  AndroidOutlined
} from '@ant-design/icons';
import '../../css/Footer.css';

const { Footer: AntFooter } = Layout;
const { Title, Text, Link } = Typography;

interface FooterProps {
  // Props có thể được thêm vào sau nếu cần
}

const Footer: React.FC<FooterProps> = () => {
  const currentYear = new Date().getFullYear();

  return (
    <AntFooter className="grab-footer">
      <div className="footer-container">
        {/* Main Footer Content */}
        <div className="footer-main">
          <Row gutter={[32, 32]}>
            {/* Company Info */}
            <Col xs={24} sm={12} md={6}>
              <div className="footer-section">
                <div className="footer-logo">
                  <Text className="logo-text">Chợ Dân Cư</Text>
                </div>
                <Text className="footer-description">
                  Chợ Dân Cư là ứng dụng duy nhất và đầu tiên tại Vinhomes Grand Park Q9 cung cấp các dịch vụ 
                  đi lại, giao đồ ăn, thanh toán và nhiều hơn nữa.
                </Text>
                
                {/* Social Media */}
                <div className="social-media">
                  <Title level={5} className="section-title">Theo dõi chúng tôi</Title>
                  <Space size="middle">
                    <Button 
                      type="text" 
                      icon={<FacebookOutlined />} 
                      className="social-btn"
                    />
                    <Button 
                      type="text" 
                      icon={<TwitterOutlined />} 
                      className="social-btn"
                    />
                    <Button 
                      type="text" 
                      icon={<InstagramOutlined />} 
                      className="social-btn"
                    />
                    <Button 
                      type="text" 
                      icon={<LinkedinOutlined />} 
                      className="social-btn"
                    />
                    <Button 
                      type="text" 
                      icon={<YoutubeOutlined />} 
                      className="social-btn"
                    />
                  </Space>
                </div>
              </div>
            </Col>


            <Col xs={24} sm={12} md={6}>
              <div className="footer-section">
                <Title level={5} className="section-title">  </Title>
                <div className="footer-links">
                  {/* <Link href="#" className="footer-link">GrabCar</Link>
                  <Link href="#" className="footer-link">GrabBike</Link>
                  <Link href="#" className="footer-link">GrabFood</Link>
                  <Link href="#" className="footer-link">GrabExpress</Link>
                  <Link href="#" className="footer-link">GrabMart</Link>
                  <Link href="#" className="footer-link">GrabPay</Link> */}
                </div>
              </div>
            </Col>


            <Col xs={24} sm={12} md={6}>
              <div className="footer-section">
                <Title level={5} className="section-title">Liên hệ trực tiếp</Title>
                <div className="footer-links">
                  <Link href="https://www.facebook.com/anhlinh0301" className="footer-link">Facebook: Nguyễn Dương Ánh Linh</Link>
                  <Link href="https://www.facebook.com/ngoc.hanh.172661" className="footer-link">Facebook: Vương Ngọc Hạnh</Link>
                </div>
              </div>
            </Col>


            <Col xs={24} sm={12} md={6}>
              <div className="footer-section">               
                <div className="app-download">
                  <Title level={5} className="section-title">Tải ứng dụng</Title>
                  <Space direction="vertical" size="small">
                    <Button className="download-btn">
                      <AppleOutlined />
                      <div className="download-text">
                        <Text className="download-label">Tải trên</Text>
                        <Text className="download-store">App Store</Text>
                      </div>
                    </Button>
                    <Button className="download-btn">
                      <AndroidOutlined />
                      <div className="download-text">
                        <Text className="download-label">Tải trên</Text>
                        <Text className="download-store">Google Play</Text>
                      </div>
                    </Button>
                  </Space>
                </div>
              </div>
            </Col>
          </Row>
        </div>

        <Divider className="footer-divider" />

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <Row justify="space-between" align="middle">
            <Col xs={24} md={12}>
              <Text className="copyright">
                © {currentYear} Chợ Dân Cư. Tất cả quyền được bảo lưu.
              </Text>
            </Col>
            <Col xs={24} md={12}>
              <div className="footer-bottom-links">
                <Space split={<span className="separator">|</span>}>
                  <Link href="#" className="bottom-link">Chính sách cookie</Link>
                  <Link href="#" className="bottom-link">Pháp lý</Link>
                  <Link href="#" className="bottom-link">Sitemap</Link>
                </Space>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </AntFooter>
  );
};

export default Footer;