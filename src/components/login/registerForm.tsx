import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom'; // For navigation
import type { FormProps } from 'antd';



const RegisterForm: React.FC = () => {
  type FieldType = {
    firstName?: string;
    lastName?: string;
    username?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  };
  const navigate = useNavigate();

  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    console.log('Success:', values);
      // Form validation
    if (values.password !== values.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    // Save data to local storage
    localStorage.setItem('userData', JSON.stringify(values));

    console.log('Form submitted:', values);
    navigate('/');
  };
  
  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  

  return (
    <div className="container mx-auto px-4 py-8 max-w-sm rounded-lg shadow-md bg-white">
    <h1 className="text-2xl font-bold mb-6 text-center">Registration Form</h1>
    
    <p className="text-center mt-4">
          Already have an account?{' '}
          <a href="/" className="text-blue-500 underline">
            Sign In
          </a>
    </p>
    
    <Form onFinish={onFinish} onFinishFailed={onFinishFailed} layout="vertical">
      <Form.Item<FieldType>
        label="First Name"
        name="firstName"
        rules={[{ required: true, message: 'Please enter your first name' }]}
      >
        <Input prefix={<UserOutlined />} />
      </Form.Item>
      <Form.Item<FieldType>
        label="Last Name"
        name="lastName"
        rules={[{ required: true, message: 'Please enter your last name' }]}
      >
        <div className="flex items-center"> {/* Added flexbox container */}
          <Input className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500" prefix={<UserOutlined />}  />
        </div>
      </Form.Item>
      <Form.Item<FieldType>
        label="Username"
        name="username"
        rules={[{ required: true, message: 'Please enter your username' }]}
      >
        <div className="flex items-center"> {/* Added flexbox container */}
          <Input className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500" prefix={<UserOutlined />} />
        </div>
      </Form.Item>
      <Form.Item<FieldType>
        label="Email"
        name="email"
        rules={[{ required: true, message: 'Please enter your email' }]}>
        <div className="flex items-center"> {/* Added flexbox container */}
          <Input className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500" />
        </div>
      </Form.Item>
      <Form.Item<FieldType>
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please enter your password' }]}
      >
        <div className="flex items-center"> {/* Added flexbox container */}
          <Input className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500" prefix={<LockOutlined />} />
        </div>
      </Form.Item>
      <Form.Item<FieldType>
        label="Confirm Password"
        name="confirmPassword"
        rules={[{ required: true, message: 'Please confirm your password' }]}
      >
        <div className="flex items-center"> {/* Added flexbox container */}
          <Input className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500" prefix={<LockOutlined />} />
        </div>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" className="w-full mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-700">
          Register
        </Button>
      </Form.Item>
    </Form>
  </div>
    
  );
};

export default RegisterForm;