import React, { useState } from 'react';
import { Form, Input, Button, Card, Typography, Alert, Checkbox, Space } from 'antd';
import { UserOutlined, LockOutlined, EyeInvisibleOutlined, EyeTwoTone, CheckOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

interface LoginFormData {
  username: string;
  password: string;
  remember: boolean;
}

const AdminLoginPage: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const handleLogin = async (values: LoginFormData) => {
    setLoading(true);
    setError('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Demo validation - replace with real authentication
      if (values.username === 'admin' && values.password === 'admin123') {
        console.log('Login successful:', values);
        // Redirect to admin dashboard
        // window.location.href = '/admin/dashboard';
        alert('Đăng nhập thành công! Chuyển hướng đến trang quản trị...');
      } else {
        setError('Tên đăng nhập hoặc mật khẩu không chính xác');
      }
    } catch (err) {
      setError('Có lỗi xảy ra. Vui lòng thử lại sau.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
      }} />
      
      <Card
        style={{
          width: '100%',
          maxWidth: '420px',
          borderRadius: '16px',
          boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
          border: 'none',
          position: 'relative',
          zIndex: 1
        }}
        bodyStyle={{ padding: '40px' }}
      >
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{
            width: '64px',
            height: '64px',
            background: 'linear-gradient(135deg, #00b14f, #00d16a)',
            borderRadius: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px',
            boxShadow: '0 8px 16px rgba(0,177,79,0.3)'
          }}>
            <CheckOutlined style={{ fontSize: '28px', color: 'white' }} />
          </div>
          
          <Title level={2} style={{ margin: '0 0 8px', color: '#2c2c2c' }}>
            Quản Trị Viên
          </Title>
          <Text style={{ color: '#666', fontSize: '16px' }}>
            Đăng nhập để truy cập hệ thống quản lý
          </Text>
        </div>

        {error && (
          <Alert
            message={error}
            type="error"
            showIcon
            style={{ marginBottom: '24px', borderRadius: '8px' }}
          />
        )}

        <Form
          form={form}
          name="admin_login"
          onFinish={handleLogin}
          autoComplete="off"
          size="large"
        >
          <Form.Item
            name="username"
            rules={[
              { required: true, message: 'Vui lòng nhập tên đăng nhập!' },
              { min: 3, message: 'Tên đăng nhập phải có ít nhất 3 ký tự!' }
            ]}
          >
            <Input
              prefix={<UserOutlined style={{ color: '#666' }} />}
              placeholder="Tên đăng nhập"
              style={{ borderRadius: '8px', padding: '12px' }}
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              { required: true, message: 'Vui lòng nhập mật khẩu!' },
              { min: 6, message: 'Mật khẩu phải có ít nhất 6 ký tự!' }
            ]}
          >
            <Input.Password
              prefix={<LockOutlined style={{ color: '#666' }} />}
              placeholder="Mật khẩu"
              iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
              style={{ borderRadius: '8px', padding: '12px' }}
            />
          </Form.Item>

          <Form.Item>
            <Space style={{ width: '100%', justifyContent: 'space-between' }}>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox style={{ color: '#666' }}>Ghi nhớ đăng nhập</Checkbox>
              </Form.Item>
              
              <Button
                type="link"
                style={{ padding: 0, color: '#00b14f' }}
                onClick={() => alert('Vui lòng liên hệ quản trị viên hệ thống để được hỗ trợ')}
              >
                Quên mật khẩu?
              </Button>
            </Space>
          </Form.Item>

          <Form.Item style={{ marginBottom: '16px' }}>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              style={{
                width: '100%',
                height: '48px',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #00b14f, #00d16a)',
                border: 'none',
                fontSize: '16px',
                fontWeight: '500'
              }}
            >
              {loading ? 'Đang đăng nhập...' : 'Đăng Nhập'}
            </Button>
          </Form.Item>
        </Form>

        <div style={{
          textAlign: 'center',
          padding: '20px 0 0',
          borderTop: '1px solid #f0f0f0',
          marginTop: '20px'
        }}>
          <Text style={{ color: '#999', fontSize: '14px' }}>
            🔒 Trang này chỉ dành cho quản trị viên được ủy quyền
          </Text>
        </div>

        {/* Demo credentials info */}
        <div style={{
          background: '#f8f9fa',
          padding: '16px',
          borderRadius: '8px',
          marginTop: '16px',
          border: '1px solid #e9ecef'
        }}>
          <Text style={{ fontSize: '12px', color: '#666', display: 'block', marginBottom: '8px' }}>
            <strong>Demo Credentials:</strong>
          </Text>
          <Text style={{ fontSize: '12px', color: '#666', display: 'block' }}>
            Username: <code>admin</code>
          </Text>
          <Text style={{ fontSize: '12px', color: '#666', display: 'block' }}>
            Password: <code>admin123</code>
          </Text>
        </div>
      </Card>
    </div>
  );
};

export default AdminLoginPage;