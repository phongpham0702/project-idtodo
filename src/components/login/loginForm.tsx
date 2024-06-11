
import React, { useState } from 'react';
import { Form, Input, Button, message, Checkbox, Image } from 'antd';
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
    
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          <Image className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo"></Image>
          IDTodo
      </a>
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
      <div className="container mx-auto flex justify-center p-6 space-y-4 md:space-y-6 sm:p-8">
        <Form onFinish={handleLogin} className="space-y-4 md:space-y-6">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">Welcome to IDTodo</h1>
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please enter your username' }]}
          >
            <Input prefix={<UserOutlined />} onChange={(e) => setUsername(e.target.value)}/>
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please enter your password' }]}
          >
            <Input.Password prefix={<LockOutlined />} onChange={(e) => setPassword(e.target.value)} />
          </Form.Item>
          <Form.Item
            name="remember"
            valuePropName="checked"
          >
          <Checkbox>Remember me</Checkbox>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="w-full mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-700r">
              Login
            </Button>
          </Form.Item>
          <p className="text-center mt-4">
            Do not have an account?{' '}
            <a href="/register" className="text-blue-500 underline">
            Register
            </a>
          </p>
      </Form>
        
      </div>
      </div>
    </div>
    
  );
};

export default LoginForm;