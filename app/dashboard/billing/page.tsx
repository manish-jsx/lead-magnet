// app/dashboard/billing/page.tsx
'use client'
import { Card, Statistic, Table, Button, Tag } from 'antd'
import { useQuery } from '@tanstack/react-query'
import api from '@/lib/api'

interface Invoice {
  id: string
  date: string
  amount: number
  status: 'paid' | 'pending'
  plan: string
}

const columns = [
  { title: 'Date', dataIndex: 'date', key: 'date' },
  { title: 'Plan', dataIndex: 'plan', key: 'plan' },
  { title: 'Amount', dataIndex: 'amount', key: 'amount' },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (status: string) => (
      <Tag color={status === 'paid' ? 'green' : 'orange'}>
        {status.toUpperCase()}
      </Tag>
    )
  },
  {
    title: 'Actions',
    key: 'actions',
    render: () => <Button size="small">Download</Button>
  }
]

export default function BillingPage() {
  const { data: billingData } = useQuery({
    queryKey: ['billing'],
    queryFn: () => api.get('/billing').then(res => res.data)
  })

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <Statistic
            title="Current Plan"
            value={billingData?.plan || 'Professional'}
            suffix={<Tag color="blue">ACTIVE</Tag>}
          />
        </Card>
        <Card>
          <Statistic
            title="Next Billing Date"
            value={billingData?.nextPayment || '2024-03-01'}
          />
        </Card>
        <Card>
          <Statistic
            title="Monthly Cost"
            prefix="$"
            value={billingData?.monthlyCost || 299}
          />
        </Card>
      </div>

      <Card
        title="Payment History"
        extra={<Button type="primary">Upgrade Plan</Button>}
      >
        <Table
          columns={columns}
          dataSource={billingData?.invoices || []}
          pagination={false}
          rowKey="id"
        />
      </Card>
    </div>
  )
}