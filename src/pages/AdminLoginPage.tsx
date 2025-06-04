import React, { useState } from 'react';
import { Form, Input, Button, Card, Typography, Alert, Checkbox, Space } from 'antd';
import { UserOutlined, LockOutlined, EyeInvisibleOutlined, EyeTwoTone, CheckOutlined, HomeOutlined } from '@ant-design/icons';
import '../css/AdminLoginPage.css';

const { Title, Text } = Typography;

interface LoginFormData {
  username: string;
  password: string;
  remember: boolean;
}

const AdminLoginPage: React.FC = () => {
  const [loginForm] = Form.useForm();
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
        alert('Đăng nhập thành công! Chuyển hướng đến trang quản trị...');
        
        // Redirect to dashboard
        window.location.href = '/dashboard';
      } else {
        setError('Tên đăng nhập hoặc mật khẩu không chính xác');
      }
    } catch (err) {
      setError('Có lỗi xảy ra. Vui lòng thử lại sau.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoHome = () => {
    window.location.href = '/';
  };

  return (
    <div className="login-container">
      {/* Animated background particles */}
      <div className="background-particles" />
      
      {/* Home button */}
      <Button
        type="text"
        icon={<HomeOutlined />}
        onClick={handleGoHome}
        className="home-button"
      >
        Trang chủ
      </Button>
      
      <Card className="login-card">
        {/* Top decoration */}
        <div className="top-decoration" />

        <div className="header-section">
          <div className="logo-container">
            <CheckOutlined className="logo-icon" />
          </div>
          
          <Title level={1} className="title">
            Admin Portal
          </Title>
          <Text className="subtitle">
            Chào mừng trở lại! Đăng nhập để quản lý hệ thống
          </Text>
        </div>

        {error && (
          <Alert
            message={error}
            type="error"
            showIcon
            className="error-alert"
          />
        )}

        <Form
          form={loginForm}
          name="admin_login"
          onFinish={handleLogin}
          autoComplete="off"
          size="large"
          layout="vertical"
        >
          <Form.Item
            label={<span className="form-label">Tên đăng nhập</span>}
            name="username"
            rules={[
              { required: true, message: 'Vui lòng nhập tên đăng nhập!' },
              { min: 3, message: 'Tên đăng nhập phải có ít nhất 3 ký tự!' }
            ]}
          >
            <Input
              prefix={<UserOutlined className="input-prefix" />}
              placeholder="Nhập tên đăng nhập"
              className="form-input"
            />
          </Form.Item>

          <Form.Item
            label={<span className="form-label">Mật khẩu</span>}
            name="password"
            rules={[
              { required: true, message: 'Vui lòng nhập mật khẩu!' },
              { min: 6, message: 'Mật khẩu phải có ít nhất 6 ký tự!' }
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="input-prefix" />}
              placeholder="Nhập mật khẩu"
              iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
              className="form-input"
            />
          </Form.Item>

          <Form.Item className="remember-forgot-section">
            <Space className="remember-forgot-container">
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox className="remember-checkbox">
                  Ghi nhớ đăng nhập
                </Checkbox>
              </Form.Item>
              
              <Button
                type="link"
                className="forgot-password-btn"
                onClick={() => alert('Vui lòng liên hệ quản trị viên hệ thống để được hỗ trợ')}
              >
                Quên mật khẩu?
              </Button>
            </Space>
          </Form.Item>

          <Form.Item className="submit-section">
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              className="submit-btn"
            >
              {loading ? 'Đang xác thực...' : 'Đăng Nhập'}
            </Button>
          </Form.Item>
        </Form>

        <div className="footer-section">
          <Text className="security-text">
            🔒 Khu vực chỉ dành cho quản trị viên
          </Text>
        </div>

        {/* Demo credentials info */}
        <div className="demo-credentials">
          <div className="demo-decoration" />
          
          <Text className="demo-title">
            🎯 Demo Credentials
          </Text>
          <div className="demo-content">
            <div>
              <Text className="demo-text">
                Username: <code className="demo-code">admin</code>
              </Text>
            </div>
            <div>
              <Text className="demo-text">
                Password: <code className="demo-code">admin123</code>
              </Text>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AdminLoginPage;