'use client'
import { Table, Input, Select, Button, Space, Tag, Spin, message } from 'antd'
import type { TableColumnsType, TablePaginationConfig } from 'antd'
import { FilterOutlined, ReloadOutlined } from '@ant-design/icons'
import DashboardLayout from '@/components/DashboardLayout'
import { useQuery } from '@tanstack/react-query'
import api from '@/lib/api'
import { useState } from 'react'

// Define the possible status types
type StatusType = 'new' | 'contacted' | 'qualified' | 'closed'

interface DataType {
  id: string
  company: string
  contact_name: string
  email: string
  industry: string
  status: StatusType
  last_contacted: string
}

interface Filters {
  search?: string
  industry?: string
  status?: StatusType
}

const statusColors: Record<StatusType, string> = {
  new: 'blue',
  contacted: 'geekblue',
  qualified: 'green',
  closed: 'gray'
}

const columns: TableColumnsType<DataType> = [
  {
    title: 'Company',
    dataIndex: 'company',
    key: 'company',
    sorter: true,
  },
  {
    title: 'Contact',
    dataIndex: 'contact_name',
    key: 'contact',
    render: (text, record) => (
      <div>
        <div>{text}</div>
        <div className="text-xs text-gray-500">{record.email}</div>
      </div>
    ),
  },
  {
    title: 'Industry',
    dataIndex: 'industry',
    key: 'industry',
    filters: [
      { text: 'IT', value: 'IT' },
      { text: 'Healthcare', value: 'Healthcare' },
      { text: 'Finance', value: 'Finance' },
    ],
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (status: StatusType) => (
      <Tag color={statusColors[status]} className="capitalize">
        {status}
      </Tag>
    ),
  },
  {
    title: 'Last Contacted',
    dataIndex: 'last_contacted',
    key: 'last_contacted',
    sorter: true,
    render: (date) => new Date(date).toLocaleDateString(),
  },
]

export default function LeadsPage() {
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 10,
    showSizeChanger: true,
    pageSizeOptions: ['10', '20', '50'],
  })
  
  const [filters, setFilters] = useState<Filters>({})
  const [sortField, setSortField] = useState<string>('company')
  const [sortOrder, setSortOrder] = useState<string>('asc')

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['leads', pagination, filters, sortField, sortOrder],
    queryFn: async () => {
      const params = {
        page: pagination.current,
        page_size: pagination.pageSize,
        search: filters.search,
        industry: filters.industry,
        status: filters.status,
        ordering: `${sortOrder === 'descend' ? '-' : ''}${sortField}`,
      }

      const response = await api.get('/leads/', { params })
      setPagination(prev => ({
        ...prev,
        total: response.data.count,
      }))
      return response.data.results
    },
  })

  const handleTableChange = (newPagination: TablePaginationConfig, filters: any, sorter: any) => {
    setPagination(prev => ({
      ...prev,
      current: newPagination.current,
      pageSize: newPagination.pageSize,
    }))

    if (sorter.field) {
      setSortField(sorter.field)
      setSortOrder(sorter.order)
    }
  }

  const handleSearch = (value: string) => {
    setFilters(prev => ({ ...prev, search: value }))
  }

  const handleIndustryFilter = (value: string) => {
    setFilters(prev => ({ ...prev, industry: value }))
  }

  if (error) {
    message.error('Failed to load leads')
    return null
  }

  return (
    <DashboardLayout>
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <Input.Search
            placeholder="Search companies..."
            allowClear
            onSearch={handleSearch}
            className="max-w-md"
          />
          
          <Space>
            <Select
              placeholder="Filter by industry"
              allowClear
              onChange={handleIndustryFilter}
              options={[
                { label: 'IT', value: 'IT' },
                { label: 'Healthcare', value: 'Healthcare' },
                { label: 'Finance', value: 'Finance' },
              ]}
            />
            <Button
              icon={<ReloadOutlined />}
              onClick={() => refetch()}
            >
              Refresh
            </Button>
          </Space>
        </div>

        <Spin spinning={isLoading}>
          <Table
            columns={columns}
            dataSource={data}
            rowKey="id"
            pagination={pagination}
            onChange={handleTableChange}
            scroll={{ x: true }}
          />
        </Spin>
      </div>
    </DashboardLayout>
  )
}