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

interface LoginResponse {
  success: boolean;
  token?: string;
  message?: string;
  user?: {
    id: string;
    username: string;
    role: string;
  };
}

const AdminLoginPage: React.FC = () => {
  const [loginForm] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const handleLogin = async (values: LoginFormData) => {
    setLoading(true);
    setError('');

    try {
      // Get API base URL from environment
      const apiBaseUrl = process.env.REACT_APP_API_BASE_URL || 'https://localhost:7159';
      
      const response = await fetch(`${apiBaseUrl}/api/Users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: values.username,
          password: values.password,
        }),
      });

      const data: LoginResponse = await response.json();

      if (response.ok && data.success) {
        // Store authentication token
        if (data.token) {
          localStorage.setItem('authToken', data.token);
        }
        
        // Store user info
        if (data.user) {
          localStorage.setItem('userInfo', JSON.stringify(data.user));
        }

        // Handle remember me
        if (values.remember) {
          localStorage.setItem('rememberMe', 'true');
        }

        console.log('Login successful:', data);
        alert('Đăng nhập thành công! Chuyển hướng đến trang quản trị...');
        
        // Redirect to dashboard
        window.location.href = '/dashboard';
      } else {
        // Handle API error response
        setError(data.message || 'Tên đăng nhập hoặc mật khẩu không chính xác');
      }
    } catch (err) {
      console.error('Login error:', err);
      
      // Handle different types of errors
      if (err instanceof TypeError && err.message.includes('fetch')) {
        setError('Không thể kết nối đến server. Vui lòng kiểm tra kết nối mạng.');
      } else {
        setError('Có lỗi xảy ra. Vui lòng thử lại sau.');
      }
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

        {/* Development info - remove in production */}
        {process.env.NODE_ENV === 'development' && (
          <div className="demo-credentials">
            <div className="demo-decoration" />
            
            <Text className="demo-title">
              🔧 Development Mode
            </Text>
            <div className="demo-content">
              <div>
                <Text className="demo-text">
                  API Endpoint: <code className="demo-code">{process.env.REACT_APP_API_BASE_URL || 'https://localhost:7159'}/api/Users/login</code>
                </Text>
              </div>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default AdminLoginPage;