import React, { useState } from 'react';
import { 
  Layout, 
  Card, 
  Row, 
  Col, 
  Statistic, 
  Table, 
  Button, 
  Tag, 
  Space,
  Input,
  Form,
  Select,
  DatePicker,
  Upload,
  message
} from 'antd';
import { 
  EditOutlined, 
  EyeOutlined, 
  DeleteOutlined,
  PlusOutlined,
  UploadOutlined,
  FileTextOutlined,
  UserOutlined,
  BarChartOutlined,
  RiseOutlined
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import Sidebar from '../components/common/Sidebar';
import '../css/Dashboard.css';

const { Content } = Layout;
const { TextArea } = Input;
const { Option } = Select;

interface ArticleData {
  key: string;
  id: string;
  title: string;
  category: string;
  status: 'draft' | 'published' | 'pending';
  author: string;
  createdAt: string;
  views: number;
}

const Dashboard: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState('1');
  const [form] = Form.useForm();

  // Sample data for articles
  const articlesData: ArticleData[] = [
    {
      key: '1',
      id: 'ART001',
      title: 'Xu hướng công nghệ 2024',
      category: 'Công nghệ',
      status: 'published',
      author: 'Admin',
      createdAt: '2024-01-15',
      views: 1250
    },
    {
      key: '2',
      id: 'ART002',
      title: 'Tips học lập trình hiệu quả',
      category: 'Giáo dục',
      status: 'draft',
      author: 'Admin',
      createdAt: '2024-01-14',
      views: 890
    },
    {
      key: '3',
      id: 'ART003',
      title: 'Tin tức thị trường crypto',
      category: 'Tài chính',
      status: 'pending',
      author: 'Admin',
      createdAt: '2024-01-13',
      views: 2340
    }
  ];

  const columns: ColumnsType<ArticleData> = [
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
        <div className="article-title">{text}</div>
      ),
    },
    {
      title: 'Danh mục',
      dataIndex: 'category',
      key: 'category',
      render: (category: string) => (
        <Tag color="blue">{category}</Tag>
      ),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const statusConfig = {
          published: { color: 'green', text: 'Đã xuất bản' },
          draft: { color: 'orange', text: 'Bản nháp' },
          pending: { color: 'blue', text: 'Chờ duyệt' }
        };
        const config = statusConfig[status as keyof typeof statusConfig];
        return <Tag color={config.color}>{config.text}</Tag>;
      },
    },
    {
      title: 'Lượt xem',
      dataIndex: 'views',
      key: 'views',
      render: (views: number) => views.toLocaleString(),
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
          <Button type="text" icon={<EyeOutlined />} size="small" />
          <Button type="text" icon={<EditOutlined />} size="small" />
          <Button type="text" icon={<DeleteOutlined />} size="small" danger />
        </Space>
      ),
    },
  ];

  const handleFinish = (values: any) => {
    console.log('Form values:', values);
    message.success('Bài viết đã được lưu thành công!');
    form.resetFields();
  };

  const renderContent = () => {
    switch (selectedKey) {
      case '1':
        return (
          <div className="dashboard-overview">
            <Row gutter={[24, 24]}>
              <Col xs={24} sm={12} lg={6}>
                <Card className="stat-card">
                  <Statistic
                    title="Tổng bài viết"
                    value={156}
                    prefix={<FileTextOutlined />}
                    valueStyle={{ color: '#3f8600' }}
                  />
                </Card>
              </Col>
              <Col xs={24} sm={12} lg={6}>
                <Card className="stat-card">
                  <Statistic
                    title="Lượt xem"
                    value={89564}
                    prefix={<EyeOutlined />}
                    valueStyle={{ color: '#1890ff' }}
                  />
                </Card>
              </Col>
              <Col xs={24} sm={12} lg={6}>
                <Card className="stat-card">
                  <Statistic
                    title="Người dùng"
                    value={1234}
                    prefix={<UserOutlined />}
                    valueStyle={{ color: '#722ed1' }}
                  />
                </Card>
              </Col>
              <Col xs={24} sm={12} lg={6}>
                <Card className="stat-card">
                  <Statistic
                    title="Tăng trưởng"
                    value={12.5}
                    prefix={<RiseOutlined />}
                    suffix="%"
                    valueStyle={{ color: '#cf1322' }}
                  />
                </Card>
              </Col>
            </Row>

            <Row gutter={[24, 24]} style={{ marginTop: 24 }}>
              <Col span={24}>
                <Card title="Bài viết gần đây" className="recent-articles">
                  <Table
                    columns={columns}
                    dataSource={articlesData}
                    pagination={{ pageSize: 5 }}
                    scroll={{ x: 800 }}
                  />
                </Card>
              </Col>
            </Row>
          </div>
        );

      case '2':
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

                    <Form.Item label="Ảnh đại diện">
                      <Upload
                        listType="picture-card"
                        maxCount={1}
                        beforeUpload={() => false}
                      >
                        <div>
                          <PlusOutlined />
                          <div style={{ marginTop: 8 }}>Upload</div>
                        </div>
                      </Upload>
                    </Form.Item>
                  </Col>
                  
                  <Col xs={24} lg={8}>
                    <Form.Item
                      label="Danh mục"
                      name="category"
                      rules={[{ required: true, message: 'Vui lòng chọn danh mục!' }]}
                    >
                      <Select placeholder="Chọn danh mục" size="large">
                        <Option value="tech">Công nghệ</Option>
                        <Option value="education">Giáo dục</Option>
                        <Option value="finance">Tài chính</Option>
                        <Option value="health">Sức khỏe</Option>
                        <Option value="lifestyle">Lối sống</Option>
                      </Select>
                    </Form.Item>

                    <Form.Item
                      label="Trạng thái"
                      name="status"
                      initialValue="draft"
                    >
                      <Select size="large">
                        <Option value="draft">Bản nháp</Option>
                        <Option value="pending">Chờ duyệt</Option>
                        <Option value="published">Xuất bản</Option>
                      </Select>
                    </Form.Item>

                    <Form.Item label="Ngày xuất bản" name="publishDate">
                      <DatePicker 
                        style={{ width: '100%' }} 
                        size="large"
                        placeholder="Chọn ngày xuất bản"
                      />
                    </Form.Item>

                    <Form.Item label="Tags" name="tags">
                      <Select
                        mode="tags"
                        style={{ width: '100%' }}
                        placeholder="Thêm tags..."
                        size="large"
                      />
                    </Form.Item>

                    <div className="form-actions">
                      <Space direction="vertical" style={{ width: '100%', gap: 12 }}>
                        <Button 
                          type="primary" 
                          htmlType="submit"
                          icon={<UploadOutlined />}
                          size="large"
                          block
                        >
                          Xuất bản
                        </Button>
                        <Button 
                          icon={<EditOutlined />}
                          size="large"
                          block
                        >
                          Lưu nháp
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
                <Button type="primary" icon={<PlusOutlined />}>
                  Thêm bài viết
                </Button>
              }
            >
              <Table
                columns={columns}
                dataSource={articlesData}
                pagination={{ 
                  pageSize: 10,
                  showSizeChanger: true,
                  showQuickJumper: true,
                  showTotal: (total, range) => 
                    `${range[0]}-${range[1]} của ${total} bài viết`
                }}
                scroll={{ x: 800 }}
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