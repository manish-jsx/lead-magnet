// app/dashboard/integrations/page.tsx
'use client'
import { Card, List, Button, Tag } from 'antd'
import { useQuery } from '@tanstack/react-query'
import api from '@/lib/api'

interface Integration {
  id: string
  name: string
  connected: boolean
  service: string
}

export default function IntegrationsPage() {
  const { data: integrations } = useQuery({
    queryKey: ['integrations'],
    queryFn: () => api.get('/integrations').then(res => res.data)
  })

  return (
    <Card title="Connected Services">
      <List
        dataSource={integrations}
        renderItem={(item: Integration) => (
          <List.Item
            actions={[
              item.connected ? (
                <Button danger>Disconnect</Button>
              ) : (
                <Button type="primary">Connect</Button>
              )
            ]}
          >
            <List.Item.Meta
              title={item.name}
              description={
                <Tag color={item.connected ? 'green' : 'red'}>
                  {item.connected ? 'Connected' : 'Not Connected'}
                </Tag>
              }
            />
          </List.Item>
        )}
      />
    </Card>
  )
}