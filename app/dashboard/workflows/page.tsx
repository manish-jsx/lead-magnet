// app/dashboard/workflows/page.tsx
'use client'
import { Table, Tag, Button, Popconfirm } from 'antd'
import type { TableColumnsType } from 'antd'
import { useMutation, useQuery } from '@tanstack/react-query'
import api from '@/lib/api'

interface Workflow {
  id: string
  name: string
  status: 'active' | 'paused'
  triggers: string[]
}

const columns: TableColumnsType<Workflow> = [
  { title: 'Name', dataIndex: 'name', key: 'name' },
  { 
    title: 'Status', 
    dataIndex: 'status', 
    key: 'status',
    render: (status) => (
      <Tag color={status === 'active' ? 'green' : 'orange'}>
        {status.toUpperCase()}
      </Tag>
    )
  },
  { title: 'Triggers', dataIndex: 'triggers', key: 'triggers' },
  {
    title: 'Actions',
    key: 'actions',
    render: (_, record) => (
      <>
        <Button size="small" className="mr-2">Edit</Button>
        <Popconfirm title="Delete this workflow?">
          <Button size="small" danger>Delete</Button>
        </Popconfirm>
      </>
    )
  }
]

export default function WorkflowsPage() {
  const { data, isLoading } = useQuery({
    queryKey: ['workflows'],
    queryFn: () => api.get('/workflows').then(res => res.data)
  })

  return (
    <div>
      <div className="flex justify-between mb-4">
        <Button type="primary">Create New Workflow</Button>
      </div>
      
      <Table
        columns={columns}
        dataSource={data}
        loading={isLoading}
        rowKey="id"
      />
    </div>
  )
}