'use client'
import { Card, Col, Row, Table, Tag, Typography } from 'antd'
import { Line, Bar } from '@ant-design/charts'
import Link from 'next/link'
import type { TableColumnsType } from 'antd'

const { Title } = Typography

const DashboardPreview = () => {
  // Table data and configuration
  const data = [
    { company: 'Tech Corp', industry: 'IT', status: 'Contacted', key: '1' },
    { company: 'Health Plus', industry: 'Healthcare', status: 'New', key: '2' },
    { company: 'FinSecure', industry: 'Finance', status: 'Qualified', key: '3' },
  ]

  const columns: TableColumnsType<typeof data[number]> = [
    { title: 'Company', dataIndex: 'company', key: 'company' },
    { title: 'Industry', dataIndex: 'industry', key: 'industry' },
    { 
      title: 'Status', 
      dataIndex: 'status', 
      key: 'status',
      render: (status: string) => (
        <Tag color={
          status === 'Contacted' ? 'blue' : 
          status === 'New' ? 'cyan' : 'green'
        }>
          {status}
        </Tag>
      )
    },
  ]

  // Chart configurations
  const chartData = [
    { month: 'Jan', leads: 450 },
    { month: 'Feb', leads: 620 },
    { month: 'Mar', leads: 890 },
    { month: 'Apr', leads: 1120 },
  ]

  const lineConfig = {
    data: chartData,
    xField: 'month',
    yField: 'leads',
    height: 200,
    color: '#1890ff',
    smooth: true,
  }

  const barData = [
    { source: 'LinkedIn', value: 45 },
    { source: 'Google Maps', value: 30 },
    { source: 'Yellow Pages', value: 15 },
  ]

  const barConfig = {
    data: barData,
    xField: 'value',
    yField: 'source',
    height: 200,
    color: ['#1890ff', '#40a9ff', '#69c0ff'],
  }

  return (
    <Card 
      title="Live Dashboard Preview" 
      extra={<Link href="/demo">Explore Full Dashboard →</Link>}
      style={{ marginTop: 24 }}
    >
      <Row gutter={[16, 16]}>
        <Col span={24} md={12}>
          <div style={{ padding: 16 }}>
            <Title level={5} style={{ marginBottom: 16 }}>Monthly Lead Growth</Title>
            <Line {...lineConfig} />
          </div>
        </Col>
        <Col span={24} md={12}>
          <div style={{ padding: 16 }}>
            <Title level={5} style={{ marginBottom: 16 }}>Lead Sources</Title>
            <Bar {...barConfig} />
          </div>
        </Col>
        <Col span={24}>
          <Table
            dataSource={data}
            columns={columns}
            pagination={false}
            size="middle"
            bordered
            style={{ marginTop: 16 }}
          />
        </Col>
      </Row>
    </Card>
  )
}

export default DashboardPreview