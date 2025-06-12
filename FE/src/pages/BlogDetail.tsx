import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Card, 
  Typography, 
  Spin, 
  message, 
  Avatar, 
  Tag, 
  Button, 
  Divider,
  Row,
  Col,
  Breadcrumb
} from 'antd';
import { 
  CalendarOutlined, 
  UserOutlined, 
  ArrowLeftOutlined,
  ClockCircleOutlined
} from '@ant-design/icons';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import '../css/BlogDetail.css';
import AvatarImage from '../images/avatar.jpg';

const { Title, Paragraph, Text } = Typography;

interface User {
  id: number;
  username: string;
  createdAt: string;
}

interface Blog {
  id: number;
  title: string;
  content: string;
  imageUrl: string;
  createdAt: string;
  user: User;
}

const BlogDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (id) {
      fetchBlogDetail(id);
    }
  }, [id]);

  const fetchBlogDetail = async (blogId: string) => {
    try {
      const apiUrl = process.env.REACT_APP_API_URL;
      const response = await fetch(`${apiUrl}/api/Blogs/${blogId}`);
      
      if (!response.ok) {
        if (response.status === 404) {
          message.error('Không tìm thấy blog này');
          navigate('/blogs');
          return;
        }
        throw new Error('Failed to fetch blog detail');
      }
      
      const data = await response.json();
      setBlog(data);
    } catch (error) {
      console.error('Error fetching blog detail:', error);
      message.error('Không thể tải chi tiết blog');
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatContent = (content: string) => {
    return content.split('\n').map((paragraph, index) => (
      paragraph.trim() && (
        <Paragraph key={index} className="blog-paragraph">
          {paragraph.trim()}
        </Paragraph>
      )
    ));
  };

  const handleBackToBlogs = () => {
    navigate('/');
  };

  if (loading) {
    return (
      <div className="blog-detail-page">
        <Header />
        <div className="blog-detail-loading">
          <Spin size="large" />
          <Text>Đang tải chi tiết blog...</Text>
        </div>
        <Footer />
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="blog-detail-page">
        <Header />
        <div className="blog-detail-error">
          <Title level={3}>Không tìm thấy blog</Title>
          <Button 
            type="primary" 
            icon={<ArrowLeftOutlined />}
            onClick={handleBackToBlogs}
          >
            Quay lại trang chủ
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="blog-detail-page">
      <Header />
      
      <div className="blog-detail-container">
        <div className="blog-detail-breadcrumb">
          <Breadcrumb>
            <Breadcrumb.Item>
              <Button 
                type="link" 
                icon={<ArrowLeftOutlined />}
                onClick={handleBackToBlogs}
                className="back-button"
              >
                Trang chủ
              </Button>
            </Breadcrumb.Item>
            <Breadcrumb.Item>Chi tiết blog</Breadcrumb.Item>
          </Breadcrumb>
        </div>

        <Card className="blog-detail-card">
          <div className="blog-detail-header">
            <div className="blog-hero-image">
              <img
                src={blog.imageUrl}
                alt={blog.title}
                className="hero-image"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/placeholder-image.jpg';
                }}
              />
              <div className="hero-overlay">
                <div className="hero-content">
                  <Title level={1} className="hero-title">
                    {blog.title}
                  </Title>
                </div>
              </div>
            </div>
          </div>

          <div className="blog-detail-body">
            <Row gutter={[24, 24]}>
              <Col xs={24} lg={16}>
                <div className="blog-main-content">
                  <div className="blog-meta-info">
                    <div className="author-section">
                      <Avatar 
                        size={32} 
                        src={AvatarImage}
                        alt="Admin Avatar"
                        className="user-avatar"
                      />
                      <div className="author-details">
                        <Text strong className="author-name-large">
                          {blog.user.username}
                        </Text>
                        <div className="publish-info">
                          <Tag 
                            icon={<CalendarOutlined />} 
                            className="publish-date-tag"
                          >
                            {formatDate(blog.createdAt)}
                          </Tag>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Divider className="content-divider" />

                  <div className="blog-content-section">
                    <div className="content-text">
                      {formatContent(blog.content)}
                    </div>
                  </div>
                </div>
              </Col>

              <Col xs={24} lg={8}>
                <div className="blog-sidebar">
                  <Card className="sidebar-card">
                    <Title level={4} className="sidebar-title">
                      Thông tin
                    </Title>
                    
                    <div className="sidebar-info">
                      <div className="info-item">
                        <ClockCircleOutlined className="info-icon" />
                        <div className="info-content">
                          <Text className="info-label">Ngày tạo</Text>
                          <Text className="info-value">
                            {formatDate(blog.createdAt)}
                          </Text>
                        </div>
                      </div>

                      <div className="info-item">
                        <UserOutlined className="info-icon" />
                        <div className="info-content">
                          <Text className="info-label">Tác giả</Text>
                          <Text className="info-value">
                            {blog.user.username}
                          </Text>
                        </div>
                      </div>

                      <div className="info-item">
                        <Text className="info-label">Blog ID</Text>
                        <Text className="info-value">#{blog.id}</Text>
                      </div>
                    </div>
                  </Card>
                </div>
              </Col>
            </Row>
          </div>
        </Card>
      </div>

      <Footer />
    </div>
  );
};

export default BlogDetail;