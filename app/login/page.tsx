'use client';
import { Button, Form, Input, Spin } from 'antd';
import { useAuth } from '@/hooks/useAuth';
import styles from '@/app/styles/auth.module.css';

export default function LoginPage() {
  const { login, loading } = useAuth();
  const [form] = Form.useForm();

  return (
    <div className={styles.authContainer}>
      <h2>Login to Your Account</h2>
      <Spin spinning={loading}>
        <Form form={form} onFinish={login}>
          <Form.Item
            name="email"
            rules={[
              { required: true, message: 'Please input your email!' },
              { type: 'email', message: 'Invalid email format' }
            ]}
          >
            <Input placeholder="Email" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>

          <Button 
            type="primary" 
            htmlType="submit" 
            block
            loading={loading}
          >
            Sign In
          </Button>
        </Form>
      </Spin>
    </div>
  );
}