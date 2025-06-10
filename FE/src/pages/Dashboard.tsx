import React, { useState, useEffect } from 'react';
import { 
  Layout, 
  Card, 
  Row, 
  Col, 
  Table, 
  Button, 
  Tag, 
  Space,
  Input,
  Form,
  message,
  Modal} from 'antd';
import { 
  EditOutlined, 
  EyeOutlined, 
  DeleteOutlined,
  PlusOutlined,
  BarChartOutlined,
  LoadingOutlined
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import Sidebar from '../components/common/Sidebar';
import '../css/Dashboard.css';

const { Content } = Layout;
const { TextArea } = Input;

interface BlogData {
  key: string;
  id: string;
  title: string;
  content: string;
  imageUrl?: string;
  userId: string;
  createdAt: string;
  user?: {
    id: string;
    username: string;
    createdAt: string;
  };
}

interface BlogFormData {
  title: string;
  content: string;
  imageUrl?: string;
}

const Dashboard: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState('2'); 
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [blogsData, setBlogsData] = useState<BlogData[]>([]);
  const [tableLoading, setTableLoading] = useState(false);

  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

  const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
    const defaultOptions: RequestInit = {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    const response = await fetch(url, defaultOptions);
    return response;
  };

  const fetchBlogs = async () => {
    console.log('Fetching blogs...'); 
    setTableLoading(true);
    try {
      const fullUrl = `${apiBaseUrl}/api/Blogs`;
      console.log('API URL:', fullUrl); 
      
      const response = await fetchWithAuth(fullUrl, {
        method: 'GET',
      });

      console.log('Response status:', response.status); 

      if (response.status === 302) {
        message.error('Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại!');
        return;
      }

      if (response.ok) {
        const data = await response.json();
        console.log('Fetched blogs data:', data);
        
        const formattedData = data.map((blog: any, index: number) => ({
          key: blog.id || index.toString(),
          id: blog.id,
          title: blog.title,
          content: blog.content,
          imageUrl: blog.imageUrl,
          userId: blog.userId,
          createdAt: new Date(blog.createdAt || Date.now()).toLocaleDateString('vi-VN'),
          user: blog.user
        }));
        setBlogsData(formattedData);
        console.log('Formatted data:', formattedData); 
      } else {
        const errorText = await response.text();
        console.error('API Error:', errorText); 
        message.error(`Không thể tải danh sách blog. Status: ${response.status}`);
      }
    } catch (error) {
      console.error('Fetch error:', error); 
      message.error('Lỗi kết nối khi tải blog'); 
    } finally {
      setTableLoading(false);
    }
  };

  useEffect(() => {
    console.log('Component mounted, selectedKey:', selectedKey); 
    fetchBlogs(); 
  }, []); 

  useEffect(() => {
    console.log('selectedKey changed:', selectedKey); 
    if (selectedKey === '3') {
      fetchBlogs();
    }
  }, [selectedKey]);

  const handleFinish = async (values: BlogFormData) => {
    setLoading(true);
    
    try {
      const userInfo = localStorage.getItem('userInfo');
      let userId = '1'; 
      
      if (userInfo) {
        try {
          const user = JSON.parse(userInfo);
          userId = user.id || user.userId || '1';
        } catch (parseError) {
          console.error('Error parsing user info:', parseError);
        }
      }

      const blogData = {
        userId: userId,
        title: values.title,
        content: values.content,
        imageUrl: values.imageUrl || ''
      };

      console.log('Creating blog with data:', blogData);

      const response = await fetchWithAuth(`${apiBaseUrl}/api/Blogs`, {
        method: 'POST',
        body: JSON.stringify(blogData),
      });

      if (response.status === 302) {
        message.error('Phiên đăng nhập đã hết hạn hoặc không có quyền truy cập. Vui lòng đăng nhập lại!');
        return;
      }

      if (response.ok) {
        const responseData = await response.json();
        console.log('Blog created successfully:', responseData);
        
        message.success('Bài viết đã được tạo thành công!');
        form.resetFields();
        
        fetchBlogs();
      } else {
        const errorData = await response.text();
        console.error('API Error:', errorData);
        console.error('Response status:', response.status);
        console.error('Response statusText:', response.statusText);
        
        message.error(`Không thể tạo bài viết. Lỗi: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error creating blog:', error);
      message.error('Lỗi kết nối. Vui lòng kiểm tra mạng và thử lại!');
    } finally {
      setLoading(false);
    }
  };

  // Handle blog deletion
  const handleDelete = async (blogId: string) => {
    Modal.confirm({
      title: 'Xác nhận xóa',
      content: 'Bạn có chắc chắn muốn xóa bài viết này?',
      okText: 'Xóa',
      cancelText: 'Hủy',
      okType: 'danger',
      onOk: async () => {
        try {
          console.log('Deleting blog:', blogId);
          
          const response = await fetchWithAuth(`${apiBaseUrl}/api/Blogs/${blogId}`, {
            method: 'DELETE',
          });

          console.log('Delete response status:', response.status);

          if (response.status === 302) {
            message.error('Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại!');
            return;
          }

          if (response.ok) {
            message.success('Xóa bài viết thành công!');
            fetchBlogs(); // Refresh the list
          } else {
            const errorText = await response.text();
            console.error('Delete error:', errorText);
            message.error(`Không thể xóa bài viết! Status: ${response.status}`);
          }
        } catch (error) {
          console.error('Error deleting blog:', error);
          message.error('Lỗi kết nối khi xóa bài viết!');
        }
      },
    });
  };

  const columns: ColumnsType<BlogData> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 80,
    },
    {
      title: 'Tiêu đề',
      dataIndex: 'title',
      key: 'title',
      render: (text: string) => (
        <div className="article-title" style={{ maxWidth: 300 }}>
          {text}
        </div>
      ),
    },
    {
      title: 'Nội dung',
      dataIndex: 'content',
      key: 'content',
      render: (text: string) => (
        <div style={{ maxWidth: 200 }}>
          {text.length > 100 ? `${text.substring(0, 100)}...` : text}
        </div>
      ),
    },
    {
      title: 'Hình ảnh',
      dataIndex: 'imageUrl',
      key: 'imageUrl',
      render: (imageUrl: string) => (
        imageUrl ? (
          <img 
            src={imageUrl} 
            alt="Blog" 
            style={{ width: 50, height: 50, objectFit: 'cover', borderRadius: 4 }}
          />
        ) : (
          <Tag>Không có ảnh</Tag>
        )
      ),
    },
    {
      title: 'Tác giả',
      dataIndex: 'user',
      key: 'author',
      render: (user: any) => (
        user ? user.username : 'Unknown'
      ),
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
    {
      title: 'Hành động',
      key: 'actions',  
      render: (_, record) => (
        <Space size="small">
          <Button 
            type="text" 
            icon={<EyeOutlined />} 
            size="small"
            onClick={() => {
              Modal.info({
                title: record.title,
                content: (
                  <div>
                    {record.imageUrl && (
                      <img 
                        src={record.imageUrl} 
                        alt="Blog" 
                        style={{ width: '100%', maxWidth: 400, marginBottom: 16 }}
                      />
                    )}
                    <p>{record.content}</p>
                    <div style={{ marginTop: 16, fontSize: '12px', color: '#666' }}>
                      <p>Tác giả: {record.user?.username || 'Unknown'}</p>
                      <p>Ngày tạo: {record.createdAt}</p>
                    </div>
                  </div>
                ),
                width: 600,
              });
            }}
          />
          <Button 
            type="text" 
            icon={<EditOutlined />} 
            size="small"
            onClick={() => {
              // You can implement edit functionality here
              message.info('Chức năng chỉnh sửa sẽ được phát triển');
            }}
          />
          <Button 
            type="text" 
            icon={<DeleteOutlined />} 
            size="small" 
            danger
            onClick={() => handleDelete(record.id)}
          />
        </Space>
      ),
    },
  ];

  const renderContent = () => {
    switch (selectedKey) {
      case '1':
        return (
          <div className="write-article">
            <Card 
              title="Viết bài viết mới" 
              className="article-form-card"
            >
              <Form
                form={form}
                layout="vertical"
                onFinish={handleFinish}
              >
                <Row gutter={24}>
                  <Col xs={24} lg={16}>
                    <Form.Item
                      label="Tiêu đề bài viết"
                      name="title"
                      rules={[{ required: true, message: 'Vui lòng nhập tiêu đề!' }]}
                    >
                      <Input placeholder="Nhập tiêu đề bài viết..." size="large" />
                    </Form.Item>

                    <Form.Item
                      label="Nội dung"
                      name="content"
                      rules={[{ required: true, message: 'Vui lòng nhập nội dung!' }]}
                    >
                      <TextArea
                        placeholder="Nhập nội dung bài viết..."
                        rows={12}
                        showCount
                      />
                    </Form.Item>
                  </Col>
                  
                  <Col xs={24} lg={8}>
                    <Form.Item label="URL hình ảnh (tùy chọn)" name="imageUrl">
                      <Input 
                        placeholder="Nhập URL hình ảnh..." 
                        size="large"
                      />
                    </Form.Item>

                    <div className="form-actions">
                      <Space direction="vertical" style={{ width: '100%', gap: 12 }}>
                        <Button 
                          type="primary" 
                          htmlType="submit"
                          icon={loading ? <LoadingOutlined /> : <PlusOutlined />}
                          size="large"
                          block
                          loading={loading}
                        >
                          {loading ? 'Đang tạo...' : 'Tạo bài viết'}
                        </Button>
                      </Space>
                    </div>
                  </Col>
                </Row>
              </Form>
            </Card>
          </div>
        );

      case '2':
        return (
          <div className="article-management">
            <Card 
              title="Quản lý bài viết" 
              extra={
                <Space>
                  <Button 
                    icon={<BarChartOutlined />}
                    onClick={() => fetchBlogs()}
                  >
                    Làm mới
                  </Button>
                  <Button 
                    type="primary" 
                    icon={<PlusOutlined />}
                    onClick={() => setSelectedKey('1')}
                  >
                    Thêm bài viết
                  </Button>
                </Space>
              }
            >
              <Table
                columns={columns}
                dataSource={blogsData}
                loading={tableLoading}
                pagination={{ 
                  pageSize: 10,
                  showSizeChanger: true,
                  showQuickJumper: true,
                  showTotal: (total, range) => 
                    `${range[0]}-${range[1]} của ${total} bài viết`
                }}
                scroll={{ x: 1200 }}
              />
            </Card>
          </div>
        );

      default:
        return (
          <div className="default-content">
            <Card>
              <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <BarChartOutlined style={{ fontSize: '48px', color: '#d9d9d9' }} />
                <h3>Chọn một mục từ menu để bắt đầu</h3>
                <p>Bắt đầu bằng cách viết bài viết mới hoặc quản lý các bài viết hiện có</p>
              </div>
            </Card>
          </div>
        );
    }
  };

  return (
    <Layout className="dashboard-layout">
      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        selectedKey={selectedKey}
        setSelectedKey={setSelectedKey}
      />
      
      <Layout 
        className="main-layout"
        style={{
          marginLeft: collapsed ? 80 : 280,
          paddingTop: 64,
          transition: 'all 0.2s ease'
        }}
      >
        <Content className="dashboard-content">
          <div className="content-wrapper">
            {renderContent()}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;