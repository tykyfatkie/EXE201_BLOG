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
      background: `
        linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.4)),
        url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80')
      `,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      position: 'relative'
    }}>
      {/* Animated background particles */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `
          radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%),
          radial-gradient(circle at 40% 40%, rgba(120, 219, 255, 0.3) 0%, transparent 50%)
        `,
        animation: 'float 6s ease-in-out infinite'
      }} />
      
      <Card
        style={{
          width: '100%',
          maxWidth: '460px',
          borderRadius: '24px',
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(20px)',
          boxShadow: '0 32px 64px rgba(0,0,0,0.15), 0 0 0 1px rgba(255,255,255,0.2)',
          border: 'none',
          position: 'relative',
          zIndex: 1,
          overflow: 'hidden'
        }}
        bodyStyle={{ padding: '48px 40px' }}
      >
        {/* Top decoration */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: 'linear-gradient(90deg, #667eea 0%, #764ba2 50%, #f093fb 100%)'
        }} />

        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{
            width: '80px',
            height: '80px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px',
            boxShadow: '0 12px 24px rgba(102, 126, 234, 0.4)',
            animation: 'pulse 2s infinite'
          }}>
            <CheckOutlined style={{ fontSize: '36px', color: 'white' }} />
          </div>
          
          <Title level={1} style={{ 
            margin: '0 0 12px', 
            color: '#2c3e50',
            fontSize: '32px',
            fontWeight: '700',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            Admin Portal
          </Title>
          <Text style={{ 
            color: '#64748b', 
            fontSize: '16px',
            display: 'block',
            lineHeight: '1.5'
          }}>
            Chào mừng trở lại! Đăng nhập để quản lý hệ thống
          </Text>
        </div>

        {error && (
          <Alert
            message={error}
            type="error"
            showIcon
            style={{ 
              marginBottom: '28px', 
              borderRadius: '12px',
              border: 'none',
              background: 'linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)'
            }}
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
            label={<span style={{ color: '#374151', fontWeight: '600' }}>Tên đăng nhập</span>}
            name="username"
            rules={[
              { required: true, message: 'Vui lòng nhập tên đăng nhập!' },
              { min: 3, message: 'Tên đăng nhập phải có ít nhất 3 ký tự!' }
            ]}
          >
            <Input
              prefix={<UserOutlined style={{ color: '#9ca3af' }} />}
              placeholder="Nhập tên đăng nhập"
              style={{ 
                borderRadius: '12px', 
                padding: '14px 16px',
                border: '2px solid #e5e7eb',
                background: '#f9fafb',
                fontSize: '16px',
                transition: 'all 0.3s ease'
              }}
            />
          </Form.Item>

          <Form.Item
            label={<span style={{ color: '#374151', fontWeight: '600' }}>Mật khẩu</span>}
            name="password"
            rules={[
              { required: true, message: 'Vui lòng nhập mật khẩu!' },
              { min: 6, message: 'Mật khẩu phải có ít nhất 6 ký tự!' }
            ]}
          >
            <Input.Password
              prefix={<LockOutlined style={{ color: '#9ca3af' }} />}
              placeholder="Nhập mật khẩu"
              iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
              style={{ 
                borderRadius: '12px', 
                padding: '14px 16px',
                border: '2px solid #e5e7eb',
                background: '#f9fafb',
                fontSize: '16px',
                transition: 'all 0.3s ease'
              }}
            />
          </Form.Item>

          <Form.Item style={{ marginBottom: '24px' }}>
            <Space style={{ width: '100%', justifyContent: 'space-between' }}>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox style={{ color: '#64748b', fontSize: '14px' }}>
                  Ghi nhớ đăng nhập
                </Checkbox>
              </Form.Item>
              
              <Button
                type="link"
                style={{ 
                  padding: 0, 
                  color: '#667eea',
                  fontSize: '14px',
                  fontWeight: '500'
                }}
                onClick={() => alert('Vui lòng liên hệ quản trị viên hệ thống để được hỗ trợ')}
              >
                Quên mật khẩu?
              </Button>
            </Space>
          </Form.Item>

          <Form.Item style={{ marginBottom: '20px' }}>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              style={{
                width: '100%',
                height: '52px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                border: 'none',
                fontSize: '16px',
                fontWeight: '600',
                boxShadow: '0 8px 16px rgba(102, 126, 234, 0.3)',
                transition: 'all 0.3s ease'
              }}
            >
              {loading ? 'Đang xác thực...' : 'Đăng Nhập'}
            </Button>
          </Form.Item>
        </Form>

        <div style={{
          textAlign: 'center',
          padding: '24px 0 0',
          borderTop: '1px solid rgba(229, 231, 235, 0.8)',
          marginTop: '24px'
        }}>
          <Text style={{ 
            color: '#9ca3af', 
            fontSize: '14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px'
          }}>
            🔒 Khu vực bảo mật - Chỉ dành cho quản trị viên
          </Text>
        </div>

        {/* Demo credentials info with improved styling */}
        <div style={{
          background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
          padding: '20px',
          borderRadius: '12px',
          marginTop: '20px',
          border: '1px solid #e2e8f0',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '2px',
            background: 'linear-gradient(90deg, #22c55e 0%, #16a34a 100%)'
          }} />
          
          <Text style={{ 
            fontSize: '13px', 
            color: '#475569', 
            display: 'block', 
            marginBottom: '12px',
            fontWeight: '600'
          }}>
            🎯 Demo Credentials
          </Text>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <div>
              <Text style={{ fontSize: '12px', color: '#64748b', display: 'block' }}>
                Username: <code style={{ 
                  background: '#e2e8f0', 
                  padding: '2px 6px', 
                  borderRadius: '4px',
                  color: '#1e293b',
                  fontWeight: '500'
                }}>admin</code>
              </Text>
            </div>
            <div>
              <Text style={{ fontSize: '12px', color: '#64748b', display: 'block' }}>
                Password: <code style={{ 
                  background: '#e2e8f0', 
                  padding: '2px 6px', 
                  borderRadius: '4px',
                  color: '#1e293b',
                  fontWeight: '500'
                }}>admin123</code>
              </Text>
            </div>
          </div>
        </div>
      </Card>

      {/* CSS Animations */}
      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
          }
          
          @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
          }
          
          .ant-input:focus,
          .ant-input-password:focus {
            border-color: #667eea !important;
            box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1) !important;
          }
          
          .ant-btn-primary:hover {
            transform: translateY(-2px);
            box-shadow: 0 12px 24px rgba(102, 126, 234, 0.4) !important;
          }
          
          /* Custom scrollbar */
          ::-webkit-scrollbar {
            width: 6px;
          }
          
          ::-webkit-scrollbar-track {
            background: #f1f1f1;
            border-radius: 3px;
          }
          
          ::-webkit-scrollbar-thumb {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-radius: 3px;
          }
          
          ::-webkit-scrollbar-thumb:hover {
            background: linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%);
          }
        `}
      </style>
    </div>
  );
};

export default AdminLoginPage;