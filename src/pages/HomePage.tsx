import React from 'react';
import { Layout, Button, Typography, Row, Col, Card } from 'antd';
import { CalendarOutlined, ArrowRightOutlined } from '@ant-design/icons';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import '../css/HomePage.css'

const { Title, Text } = Typography;

interface HomePageProps {
  // Props có thể được thêm vào sau nếu cần
}

const HomePage: React.FC<HomePageProps> = () => {
  // Dữ liệu tin tức mẫu
  const newsData = [
    {
      id: 1,
      date: '05/05/25',
      title: 'Grab bổ nhiệm Giám đốc Điều hành mới tại Singapore và Việt Nam',
      image: '/images/news1.jpg',
      category: 'Công ty'
    },
    {
      id: 2,
      date: '31/03/25',
      title: 'Grab triển khai tính năng Đặt trước chuyến xe tại Việt Nam',
      image: '/images/news2.jpg',
      category: 'Sản phẩm'
    },
    {
      id: 3,
      date: '26/03/25',
      title: 'Quỹ hỗ trợ phát triển du lịch và Grab Việt Nam ký kết thỏa thuận hợp tác',
      image: '/images/news3.jpg',
      category: 'Hợp tác'
    },
    {
      id: 4,
      date: '28/02/25',
      title: 'Thành phố Huế và Grab Việt Nam ký kết biên bản thỏa thuận năm thức hiện',
      image: '/images/news4.jpg',
      category: 'Hợp tác'
    }
  ];

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

          {/* News Center Section */}
          <section className="news-section" style={{ padding: '80px 20px', backgroundColor: '#f8f9fa' }}>
            <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
              <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                <Title level={2} style={{ color: '#2c2c2c', marginBottom: '16px' }}>
                  Trung tâm tin tức
                </Title>
                <Text style={{ fontSize: '16px', color: '#666' }}>
                  Cập nhật những tin tức mới nhất từ Chợ Dân Cư
                </Text>
              </div>

              <Row gutter={[24, 24]}>
                {newsData.map((news) => (
                  <Col xs={24} sm={12} lg={6} key={news.id}>
                    <Card
                      hoverable
                      cover={
                        <div style={{ 
                          height: '200px', 
                          background: `linear-gradient(135deg, #00b14f, #00d16a)`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'white',
                          fontSize: '18px',
                          fontWeight: 'bold'
                        }}>
                          {news.category}
                        </div>
                      }
                      style={{ 
                        borderRadius: '12px', 
                        overflow: 'hidden',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                        transition: 'all 0.3s ease'
                      }}
                      bodyStyle={{ padding: '20px' }}
                    >
                      <div style={{ marginBottom: '12px' }}>
                        <Text style={{ 
                          color: '#00b14f', 
                          fontSize: '14px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}>
                          <CalendarOutlined />
                          {news.date}
                        </Text>
                      </div>
                      
                      <Title level={4} style={{ 
                        fontSize: '16px', 
                        lineHeight: '1.4',
                        marginBottom: '16px',
                        color: '#2c2c2c',
                        minHeight: '64px'
                      }}>
                        {news.title}
                      </Title>
                      
                      <Button 
                        type="link" 
                        style={{ 
                          padding: 0, 
                          color: '#00b14f',
                          fontWeight: '500',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}
                      >
                        Xem thêm
                        <ArrowRightOutlined style={{ fontSize: '12px' }} />
                      </Button>
                    </Card>
                  </Col>
                ))}
              </Row>

              <div style={{ textAlign: 'center', marginTop: '50px' }}>
                <Button 
                  size="large"
                  style={{
                    borderColor: '#00b14f',
                    color: '#00b14f',
                    padding: '8px 40px',
                    height: 'auto',
                    borderRadius: '8px',
                    fontWeight: '500'
                  }}
                >
                  Xem thêm các tin tức khác
                </Button>
              </div>
            </div>
          </section>
        </div>
      </Layout.Content>
      
      <Footer />
    </Layout>
  );
};

export default HomePage;