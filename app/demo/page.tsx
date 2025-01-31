// app/demo/page.tsx
'use client'
import { Card, Col, Row, Statistic, Typography } from 'antd'
import { DashboardOutlined, RiseOutlined, UserOutlined } from '@ant-design/icons'
import DashboardPreview from '@/components/DashboardPreview'

const { Title } = Typography

export default function DemoPage() {
  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 24px' }}>
      <Title level={2} style={{ textAlign: 'center', marginBottom: 40 }}>
        Live Product Demo
      </Title>

      <Row gutter={[24, 24]} style={{ marginBottom: 40 }}>
        <Col xs={24} md={8}>
          <Card>
            <Statistic
              title="Active Users"
              value={1128}
              prefix={<UserOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card>
            <Statistic
              title="Monthly Growth"
              value={27.3}
              suffix="%"
              prefix={<RiseOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card>
            <Statistic
              title="Accuracy Rate"
              value={92.4}
              suffix="%"
              prefix={<DashboardOutlined />}
            />
          </Card>
        </Col>
      </Row>

      <DashboardPreview />
    </div>
  )
}