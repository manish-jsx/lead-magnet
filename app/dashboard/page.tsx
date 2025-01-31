'use client';
import { Card, Col, Row, Statistic } from 'antd'
import DashboardLayout from '@/components/DashboardLayout'
import { useQuery } from '@tanstack/react-query'
import api from '@/lib/api'
import dynamic from 'next/dynamic'

const Line = dynamic(
  () => import('@ant-design/charts').then(mod => mod.Line),
  { ssr: false }
)

export default function DashboardPage() {
  const { data: stats } = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: () => api.get('/dashboard/stats').then(res => res.data)
  })

  const chartData = [
    { month: 'Jan', leads: 45 },
    { month: 'Feb', leads: 65 },
    { month: 'Mar', leads: 92 },
  ]

  return (
    <DashboardLayout>
    <div className="space-y-6">
      <Row gutter={16}>
        <Col span={8}>
          <Card>
            <Statistic title="Total Leads" value={stats?.totalLeads} />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic title="Active Campaigns" value={stats?.activeCampaigns} />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic title="Conversion Rate" value={stats?.conversionRate} suffix="%" />
          </Card>
        </Col>
      </Row>

      <Card title="Lead Acquisition Trends">
        <Line data={chartData} xField="month" yField="leads" />
      </Card>
    </div>
    </DashboardLayout>
  )
}
