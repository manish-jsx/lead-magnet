// app/dashboard/settings/page.tsx
'use client'
import { Button, Form, Input, Switch, Typography } from 'antd'
import styles from '@/app/styles/dashboard.module.css'

const { Title } = Typography

export default function SettingsPage() {
  const [form] = Form.useForm()

  const onFinish = (values: any) => {
    console.log('Settings updated:', values)
  }

  return (
    <div className={styles.settingsContainer}>
      <Title level={3}>Account Settings</Title>
      
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item label="Full Name" name="name">
          <Input />
        </Form.Item>

        <Form.Item label="Email" name="email">
          <Input disabled />
        </Form.Item>

        <Form.Item label="Dark Mode" name="darkMode" valuePropName="checked">
          <Switch />
        </Form.Item>

        <Button type="primary" htmlType="submit">
          Save Changes
        </Button>
      </Form>
    </div>
  )
}