import React, { useState } from 'react';
import { Form, Input, Button, Card, Typography, Alert, Checkbox, Space } from 'antd';
import { UserOutlined, LockOutlined, EyeInvisibleOutlined, EyeTwoTone, CheckOutlined, HomeOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate(); 

  const handleLogin = async (values: LoginFormData) => {
    console.log('=== LOGIN ATTEMPT STARTED ===');
    console.log('Form values:', values);
    
    setLoading(true);
    setError('');

    try {
      const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
      console.log('API Base URL from env:', apiBaseUrl);
      
      const fullUrl = `${apiBaseUrl}/api/Users/login`;
      console.log('Full API URL:', fullUrl);
      
      const requestBody = {
        username: values.username,
        password: values.password,
      };
      console.log('Request body:', requestBody);
      
      console.log('Making fetch request...');
      
      const response = await fetch(fullUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // This ensures cookies are sent and received
        body: JSON.stringify(requestBody),
      });

      console.log('Response received:', response);
      console.log('Response status:', response.status);
      console.log('Response ok:', response.ok);

      if (response.ok) {
        const responseData = await response.json();
        console.log('Login successful, response data:', responseData);
        
        // Store user info in localStorage for reference
        if (responseData.user || responseData.userId || responseData.id) {
          const userInfo = {
            id: responseData.userId || responseData.id || responseData.user?.id,
            username: responseData.username || responseData.user?.username || values.username,
            ...responseData.user
          };
          localStorage.setItem('userInfo', JSON.stringify(userInfo));
          console.log('User info stored:', userInfo);
        }

        // Handle remember me
        if (values.remember) {
          localStorage.setItem('rememberMe', 'true');
          localStorage.setItem('rememberedUsername', values.username);
          console.log('Remember me enabled - saved to localStorage');
        } else {
          localStorage.removeItem('rememberMe');
          localStorage.removeItem('rememberedUsername');
          console.log('Remember me disabled - removed from localStorage');
        }

        console.log('Document cookies after login:', document.cookie);
        

        setTimeout(() => {
          console.log('Navigating to dashboard...');

          navigate('/CaiUrlDashboardNayChacChanKhongAiBietDauHaHaHa', { replace: true });
          
        }, 100);

      } else {
        console.log('Login failed with status:', response.status);
        

        try {
          const errorData = await response.text();
          console.log('Error response body:', errorData);
        } catch (parseError) {
          console.log('Could not parse error response:', parseError);
        }
        

        if (response.status === 401) {
          setError('Tên đăng nhập hoặc mật khẩu không chính xác');
        } else if (response.status === 403) {
          setError('Tài khoản không có quyền truy cập');
        } else if (response.status === 500) {
          setError('Lỗi server. Vui lòng thử lại sau');
        } else {
          setError('Đăng nhập thất bại. Vui lòng thử lại');
        }
      }
    } catch (err) {
      console.error('=== LOGIN ERROR ===');
      console.error('Error type:', typeof err);
      console.error('Error message:', err instanceof Error ? err.message : 'Unknown error');
      console.error('Full error:', err);
      

      if (err instanceof TypeError && err.message.includes('fetch')) {
        console.error('Network/Fetch error detected');
        setError('Không thể kết nối đến server. Vui lòng kiểm tra kết nối mạng.');
      } else {
        setError('Có lỗi xảy ra. Vui lòng thử lại sau.');
      }
    } finally {
      setLoading(false);
      console.log('=== LOGIN ATTEMPT ENDED ===');
    }
  };

  const handleGoHome = () => {
    console.log('Navigating to home page...');
    navigate('/'); 
  };


  React.useEffect(() => {
    console.log('Component mounted, checking for remembered login...');
    
    const rememberMe = localStorage.getItem('rememberMe');
    const rememberedUsername = localStorage.getItem('rememberedUsername');
    
    console.log('Remember me:', rememberMe);
    console.log('Remembered username:', rememberedUsername);
    
    if (rememberMe === 'true' && rememberedUsername) {
      console.log('Setting remembered values in form...');
      loginForm.setFieldsValue({
        username: rememberedUsername,
        remember: true
      });
    }
  }, [loginForm]);


  React.useEffect(() => {
    console.log('=== ENVIRONMENT DEBUG ===');
    console.log('NODE_ENV:', process.env.NODE_ENV);
    console.log('REACT_APP_API_BASE_URL:', process.env.REACT_APP_API_BASE_URL);
    console.log('Current cookies:', document.cookie);
    console.log('All REACT_APP_ vars:', Object.keys(process.env).filter(key => key.startsWith('REACT_APP_')));
    console.log('========================');
  }, []);

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
              <div style={{ marginTop: '8px' }}>
                <Text className="demo-text">
                  Environment: <code className="demo-code">{process.env.NODE_ENV}</code>
                </Text>
              </div>
              <div style={{ marginTop: '8px' }}>
                <Text className="demo-text">
                  Current Cookies: <code className="demo-code">{document.cookie || 'No cookies'}</code>
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