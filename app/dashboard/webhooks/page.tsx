// app/dashboard/webhooks/page.tsx
'use client'
import { Table, Button, Input, Space, Tag } from 'antd'
import { useMutation, useQuery } from '@tanstack/react-query'
import api from '@/lib/api'
import { useState } from 'react'

interface Webhook {
  id: string
  url: string
  events: string[]
  status: 'active' | 'inactive'
}

export default function WebhooksPage() {
  const [newWebhook, setNewWebhook] = useState('')
  const { data: webhooks, refetch } = useQuery({
    queryKey: ['webhooks'],
    queryFn: () => api.get('/webhooks').then(res => res.data)
  })

  const { mutate: createWebhook } = useMutation({
    mutationFn: (url: string) => api.post('/webhooks', { url }),
    onSuccess: () => refetch()
  })

  const columns = [
    { title: 'URL', dataIndex: 'url', key: 'url' },
    { title: 'Events', dataIndex: 'events', key: 'events' },
    { 
      title: 'Status', 
      dataIndex: 'status', 
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'active' ? 'green' : 'red'}>
          {status.toUpperCase()}
        </Tag>
      )
    },
    {
      title: 'Actions',
      key: 'actions',
      render: () => (
        <Space>
          <Button size="small">Test</Button>
          <Button size="small" danger>Delete</Button>
        </Space>
      )
    }
  ]

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <Input 
          placeholder="https://example.com/webhook" 
          value={newWebhook}
          onChange={(e) => setNewWebhook(e.target.value)}
          className="flex-1"
        />
        <Button 
          type="primary" 
          onClick={() => createWebhook(newWebhook)}
        >
          Add Webhook
        </Button>
      </div>
      
      <Table
        columns={columns}
        dataSource={webhooks}
        rowKey="id"
      />
    </div>
  )
}