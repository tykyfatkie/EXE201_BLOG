import React from 'react';
import { Layout, Button, Typography, Row, Col } from 'antd';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import '../css/HomePage.css'

const { Title, Text } = Typography;

interface HomePageProps {
  // Props có thể được thêm vào sau nếu cần
}

const HomePage: React.FC<HomePageProps> = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header />
      
      <Layout.Content style={{ flex: 1 }}>
        <div className="homepage-container">
          {/* Hero Section */}
          <section className="hero-section">
            <div className="hero-overlay">
              <div className="hero-content">
                <Row justify="start" align="middle" style={{ height: '100%', paddingLeft: '5%' }}>
                  <Col xs={24} md={16} lg={12}>
                    <div className="hero-text">
                      <Title level={1} className="hero-title">
                        Chợ Dân Cư. Giúp cuộc sống tốt hơn mỗi ngày.
                      </Title>
                      
                      <div className="hero-buttons">
                        <Button 
                          type="primary" 
                          size="large" 
                          className="hero-btn primary-btn"
                          style={{ marginBottom: '16px', display: 'block', width: 'fit-content' }}
                        >
                          Xem Thêm Về Chúng Tôi
                        </Button>
                        
                        <Button 
                          type="default" 
                          size="large" 
                          className="hero-btn secondary-btn"
                          style={{ display: 'block', width: 'fit-content' }}
                        >
                          Tải Ứng Dụng
                        </Button>
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
            </div>
          </section>

          {/* Additional sections can be added here */}
          <section className="content-section">
            <div className="container">
              <Row gutter={[32, 32]} style={{ padding: '80px 0' }}>
                <Col xs={24} md={8}>
                  <div className="service-card">
                    <Title level={3}>GrabCar</Title>
                    <Text>Tiện lợi với các loại xe đa dạng</Text>
                  </div>
                </Col>
                <Col xs={24} md={8}>
                  <div className="service-card">
                    <Title level={3}>GrabFood</Title>
                    <Text>Đặt món ăn yêu thích từ hàng ngàn nhà hàng</Text>
                  </div>
                </Col>
                <Col xs={24} md={8}>
                  <div className="service-card">
                    <Title level={3}>GrabExpress</Title>
                    <Text>Giao hàng nhanh chóng trong thành phố</Text>
                  </div>
                </Col>
              </Row>
            </div>
          </section>
        </div>
      </Layout.Content>
      
      <Footer />
    </Layout>
  );
};

export default HomePage;