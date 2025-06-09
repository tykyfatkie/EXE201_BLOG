import React, { useState, useEffect } from 'react';
import { Layout, Button, Typography, Row, Col, Card, Spin, message } from 'antd';
import { CalendarOutlined, ArrowRightOutlined } from '@ant-design/icons';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import '../css/HomePage.css'

const { Title, Text } = Typography;

interface NewsItem {
  id: number;
  title: string;
  content: string;
  imageUrl: string;
  createdAt: string;
  user: {
    id: number;
    username: string;
    createdAt: string;
  };
}

interface HomePageProps {
  // Props có thể được thêm vào sau nếu cần
}

const HomePage: React.FC<HomePageProps> = () => {
  const [newsData, setNewsData] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchNews = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/Blogs');
      
      if (!response.ok) {
        throw new Error('Không thể tải tin tức');
      }
      
      const data = await response.json();
      setNewsData(data);
    } catch (error) {
      console.error('Lỗi khi tải tin tức:', error);
      message.error('Không thể tải tin tức. Vui lòng thử lại sau.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit'
    });
  };

  const truncateContent = (content: string, limit: number = 100) => {
    if (content.length <= limit) return content;
    return content.substring(0, limit) + '...';
  };

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

              {loading ? (
                <div style={{ textAlign: 'center', padding: '50px 0' }}>
                  <Spin size="large" />
                  <Text style={{ display: 'block', marginTop: '16px', color: '#666' }}>
                    Đang tải tin tức...
                  </Text>
                </div>
              ) : newsData.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '50px 0' }}>
                  <Text style={{ fontSize: '16px', color: '#666' }}>
                    Chưa có tin tức nào được đăng tải.
                  </Text>
                </div>
              ) : (
                <>
                  <Row gutter={[24, 24]}>
                    {newsData.slice(0, 4).map((news) => (
                      <Col xs={24} sm={12} lg={6} key={news.id}>
                        <Card
                          hoverable
                          cover={
                            news.imageUrl ? (
                              <div style={{ 
                                height: '200px', 
                                backgroundImage: `url(${news.imageUrl})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center'
                              }} />
                            ) : (
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
                                Tin tức
                              </div>
                            )
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
                              {formatDate(news.createdAt)}
                            </Text>
                          </div>
                          
                          <Title level={4} style={{ 
                            fontSize: '16px', 
                            lineHeight: '1.4',
                            marginBottom: '12px',
                            color: '#2c2c2c',
                            minHeight: '64px'
                          }}>
                            {news.title}
                          </Title>

                          <Text style={{
                            color: '#666',
                            fontSize: '14px',
                            lineHeight: '1.4',
                            display: 'block',
                            marginBottom: '16px'
                          }}>
                            {truncateContent(news.content)}
                          </Text>

                          <div style={{ marginBottom: '16px' }}>
                            <Text style={{ fontSize: '12px', color: '#999' }}>
                              Bởi: {news.user.username}
                            </Text>
                          </div>
                          
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
                      onClick={() => {

                      }}
                    >
                      Xem thêm các tin tức khác
                    </Button>
                  </div>
                </>
              )}
            </div>
          </section>
        </div>
      </Layout.Content>
      
      <Footer />
    </Layout>
  );
};

export default HomePage;