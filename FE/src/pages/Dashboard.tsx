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
  Select,
  DatePicker,
  Upload,
  message,
  Modal,
  Spin
} from 'antd';
import { 
  EditOutlined, 
  EyeOutlined, 
  DeleteOutlined,
  PlusOutlined,
  UploadOutlined,
  BarChartOutlined,
  LoadingOutlined
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import type { UploadFile, UploadProps } from 'antd/es/upload';
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
}

interface BlogFormData {
  title: string;
  content: string;
  imageUrl?: string;
}

const Dashboard: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState('1');
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [blogsData, setBlogsData] = useState<BlogData[]>([]);
  const [tableLoading, setTableLoading] = useState(false);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [imageUrl, setImageUrl] = useState<string>('');

  // Get API base URL
  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL || 'https://localhost:7159';

  // Fetch blogs data
  const fetchBlogs = async () => {
    setTableLoading(true);
    try {
      const response = await fetch(`${apiBaseUrl}/api/Blogs`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        const formattedData = data.map((blog: any, index: number) => ({
          key: blog.id || index.toString(),
          id: blog.id,
          title: blog.title,
          content: blog.content,
          imageUrl: blog.imageUrl,
          userId: blog.userId,
          createdAt: new Date(blog.createdAt || Date.now()).toLocaleDateString('vi-VN'),
        }));
        setBlogsData(formattedData);
      } else {
        message.error('Không thể tải danh sách blog');
      }
    } catch (error) {
      console.error('Error fetching blogs:', error);
      message.error('Lỗi kết nối khi tải blog');
    } finally {
      setTableLoading(false);
    }
  };

  // Load blogs when component mounts or when switching to blog management
  useEffect(() => {
    if (selectedKey === '3' || selectedKey === '3-1' || selectedKey === '3-2' || selectedKey === '3-3') {
      fetchBlogs();
    }
  }, [selectedKey]);

  // Handle image upload
  const handleImageUpload: UploadProps['customRequest'] = async (options) => {
    const { file, onSuccess, onError } = options;
    
    try {
      const formData = new FormData();
      formData.append('file', file as File);

      // Upload image to your image upload API
      const response = await fetch(`${apiBaseUrl}/api/Upload/image`, {
        method: 'POST',
        credentials: 'include',
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        setImageUrl(result.imageUrl || result.url || '');
        onSuccess?.(result);
        message.success('Upload ảnh thành công!');
      } else {
        throw new Error('Upload failed');
      }
    } catch (error) {
      console.error('Upload error:', error);
      onError?.(error as Error);
      message.error('Upload ảnh thất bại!');
    }
  };

  const handleFileChange: UploadProps['onChange'] = (info) => {
    setFileList(info.fileList);
  };

  // Handle form submission
  const handleFinish = async (values: BlogFormData) => {
    setLoading(true);
    
    try {
      // Get current user info (you might need to adjust this based on how you store user info)
      const userInfo = localStorage.getItem('userInfo');
      let userId = '1'; // Default fallback
      
      if (userInfo) {
        const user = JSON.parse(userInfo);
        userId = user.id || user.userId || '1';
      }

      const blogData = {
        userId: userId,
        title: values.title,
        content: values.content,
        imageUrl: imageUrl || values.imageUrl || ''
      };

      console.log('Sending blog data:', blogData);

      const response = await fetch(`${apiBaseUrl}/api/Blogs`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(blogData),
      });

      if (response.ok) {
        message.success('Bài viết đã được tạo thành công!');
        form.resetFields();
        setFileList([]);
        setImageUrl('');
        
        // Refresh blogs list if currently viewing it
        if (selectedKey === '3' || selectedKey === '3-1' || selectedKey === '3-2' || selectedKey === '3-3') {
          fetchBlogs();
        }
      } else {
        const errorData = await response.text();
        console.error('API Error:', errorData);
        message.error('Không thể tạo bài viết. Vui lòng thử lại!');
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
          const response = await fetch(`${apiBaseUrl}/api/Blogs/${blogId}`, {
            method: 'DELETE',
            credentials: 'include',
          });

          if (response.ok) {
            message.success('Xóa bài viết thành công!');
            fetchBlogs(); // Refresh the list
          } else {
            message.error('Không thể xóa bài viết!');
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
            <Card title="Viết bài viết mới" className="article-form-card">
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

                    <Form.Item label="Upload hình ảnh">
                      <Upload
                        listType="picture-card"
                        fileList={fileList}
                        maxCount={1}
                        customRequest={handleImageUpload}
                        onChange={handleFileChange}
                        beforeUpload={(file) => {
                          const isImage = file.type?.startsWith('image/');
                          if (!isImage) {
                            message.error('Chỉ được upload file ảnh!');
                          }
                          const isLt5M = file.size / 1024 / 1024 < 5;
                          if (!isLt5M) {
                            message.error('Ảnh phải nhỏ hơn 5MB!');
                          }
                          return isImage && isLt5M;
                        }}
                      >
                        {fileList.length >= 1 ? null : (
                          <div>
                            <PlusOutlined />
                            <div style={{ marginTop: 8 }}>Upload</div>
                          </div>
                        )}
                      </Upload>
                    </Form.Item>
                  </Col>
                  
                  <Col xs={24} lg={8}>
                    <Form.Item label="URL hình ảnh (tùy chọn)" name="imageUrl">
                      <Input 
                        placeholder="Hoặc nhập URL hình ảnh..." 
                        size="large"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                      />
                    </Form.Item>

                    <div className="form-actions">
                      <Space direction="vertical" style={{ width: '100%', gap: 12 }}>
                        <Button 
                          type="primary" 
                          htmlType="submit"
                          icon={loading ? <LoadingOutlined /> : <UploadOutlined />}
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

      case '3':
      case '3-1':
      case '3-2':
      case '3-3':
        return (
          <div className="article-management">
            <Card 
              title="Quản lý bài viết" 
              extra={
                <Button 
                  type="primary" 
                  icon={<PlusOutlined />}
                  onClick={() => setSelectedKey('1')}
                >
                  Thêm bài viết
                </Button>
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
                scroll={{ x: 1000 }}
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