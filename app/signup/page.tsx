'use client';
import { Button, Form, Input, message, Typography } from 'antd';
import api from '@/lib/api';
import styles from '@/app/styles/auth.module.css';
import Link from 'next/link';
import { useState } from 'react';

const { Title, Paragraph } = Typography;

export default function SignupPage() {
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: { name: string; email: string; password: string }) => {
    try {
      setLoading(true);
      const { data } = await api.post('/auth/signup', values);
      
      message.success('Account created successfully!');
      localStorage.setItem('access_token', data.access_token);
      window.location.href = '/dashboard';
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Registration failed. Please try again.';
      message.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.authContainer}>
      <Title level={2} style={{ textAlign: 'center' }}>Create Your Account</Title>
      <Paragraph style={{ textAlign: 'center', marginBottom: 24 }}>
        Start your 14-day free trial
      </Paragraph>

      <Form
        layout="vertical"
        onFinish={onFinish}
        disabled={loading}
      >
        <Form.Item
          label="Full Name"
          name="name"
          rules={[{ required: true, message: 'Please input your full name!' }]}
        >
          <Input size="large" placeholder="John Doe" />
        </Form.Item>

        <Form.Item
          label="Work Email"
          name="email"
          rules={[
            { required: true, message: 'Please input your email!' },
            { type: 'email', message: 'Invalid email address' }
          ]}
        >
          <Input size="large" placeholder="john@company.com" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            { required: true, message: 'Please input your password!' },
            { min: 8, message: 'Password must be at least 8 characters' }
          ]}
        >
          <Input.Password size="large" placeholder="••••••••" />
        </Form.Item>

        <Form.Item
          label="Confirm Password"
          name="confirmPassword"
          dependencies={['password']}
          rules={[
            { required: true, message: 'Please confirm your password!' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('Passwords do not match!'));
              },
            }),
          ]}
        >
          <Input.Password size="large" placeholder="••••••••" />
        </Form.Item>

        <Button 
          type="primary" 
          htmlType="submit" 
          block
          size="large"
          loading={loading}
        >
          Create Account
        </Button>

        <Paragraph style={{ textAlign: 'center', marginTop: 16 }}>
          Already have an account?{' '}
          <Link href="/login" className={styles.authLink}>
            Log in here
          </Link>
        </Paragraph>
      </Form>
    </div>
  );
}