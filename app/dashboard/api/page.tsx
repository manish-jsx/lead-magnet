// app/dashboard/api/page.tsx
'use client'
import { Card, Input, Button, Alert, Tag, Space } from 'antd'
import { useState } from 'react'
import { CopyOutlined } from '@ant-design/icons'
import api from '@/lib/api'

export default function ApiManagementPage() {
  const [apiKey, setApiKey] = useState('')
  const [loading, setLoading] = useState(false)

  const generateApiKey = async () => {
    setLoading(true)
    try {
      const { data } = await api.post('/api-keys')
      setApiKey(data.key)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <Card
        title="API Keys"
        extra={
          <Button 
            type="primary" 
            onClick={generateApiKey}
            loading={loading}
          >
            Generate New Key
          </Button>
        }
      >
        {apiKey && (
          <Alert
            message={
              <Space>
                <Input.Password value={apiKey} className="w-96" />
                <Button
                  icon={<CopyOutlined />}
                  onClick={() => navigator.clipboard.writeText(apiKey)}
                >
                  Copy
                </Button>
                <Tag color="red">DO NOT SHARE THIS KEY</Tag>
              </Space>
            }
            type="warning"
            showIcon
          />
        )}
      </Card>

      <Card title="API Documentation">
        <div className="prose">
          <h3>Base URL</h3>
          <code>https://api.octavertex.com/v1</code>
          
          <h3 className="mt-4">Endpoints</h3>
          <pre>{`GET /leads\nPOST /leads\nGET /leads/{id}`}</pre>
        </div>
      </Card>
    </div>
  )
}