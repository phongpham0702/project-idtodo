
import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom'; // For navigation

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {

    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      const userData = JSON.parse(storedUserData);
      if (userData.username === username && userData.password === password) {
        message.success('Login successful!');
        localStorage.setItem('isLoggedIn', 'true'); // Set login state
        navigate('/home'); // Redirect to home page after login
        return;
      }
    }

    message.error('Invalid username or password!');
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-sm rounded-lg shadow-md bg-white">
      <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
      <Form onFinish={handleLogin} layout="vertical">
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please enter your username' }]}
        >
          <Input prefix={<UserOutlined />} onChange={(e) => setUsername(e.target.value)} />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please enter your password' }]}
        >
          <Input.Password prefix={<LockOutlined />} onChange={(e) => setPassword(e.target.value)} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Login
          </Button>
        </Form.Item>
      </Form>
      <p className="text-center mt-4">
         Do not have an account?{' '}
        <a href="/register" className="text-blue-500 underline">
         Register
        </a>
      </p>
    </div>
  );
};

export default LoginForm;
