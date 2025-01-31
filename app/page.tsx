'use client'
import { useState, useEffect } from 'react'
import { Button, Card, Col, Row, Space, Typography, Statistic, Carousel, Table, Tag } from 'antd'
import { RiseOutlined, BarChartOutlined, RocketOutlined, DashboardOutlined, CheckCircleOutlined, UserOutlined } from '@ant-design/icons'
import Link from 'next/link'
import { Line, Bar } from '@ant-design/charts'
import styles from '@/app/styles/landing.module.css'

const { Title, Paragraph, Text } = Typography

// Custom hook for responsive design
const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1200,
    height: typeof window !== 'undefined' ? window.innerHeight : 800,
  })

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return {
    isMobile: windowSize.width < 768,
    ...windowSize
  }
}

// Interactive Dashboard Preview Component
const DashboardPreview = () => {
  const data = [
    { company: 'Tech Corp', industry: 'IT', status: 'Contacted', key: '1' },
    { company: 'Health Plus', industry: 'Healthcare', status: 'New', key: '2' },
    { company: 'FinSecure', industry: 'Finance', status: 'Qualified', key: '3' },
  ]

  const columns = [
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

  const chartData = [
    { month: 'Jan', leads: 450 },
    { month: 'Feb', leads: 620 },
    { month: 'Mar', leads: 890 },
    { month: 'Apr', leads: 1120 },
  ]

  const chartConfig = {
    data: chartData,
    xField: 'month',
    yField: 'leads',
    height: 200,
    color: '#1890ff',
    smooth: true,
    interactions: [{ type: 'element-active' }],
  }

  return (
    <Card 
      title="Live Dashboard Preview" 
      className={styles.dashboardPreviewCard}
      extra={<Link href="/demo">Explore Full Dashboard →</Link>}
    >
      <Row gutter={[16, 16]}>
        <Col span={24} md={12}>
          <div className={styles.chartContainer}>
            <Title level={5} className={styles.chartTitle}>Monthly Lead Growth</Title>
            <Line {...chartConfig} />
          </div>
        </Col>
        <Col span={24} md={12}>
          <div className={styles.chartContainer}>
            <Title level={5} className={styles.chartTitle}>Lead Sources</Title>
            <Bar
              data={[
                { source: 'LinkedIn', value: 45 },
                { source: 'Google Maps', value: 30 },
                { source: 'Yellow Pages', value: 15 },
              ]}
              xField="value"
              yField="source"
              height={200}
              color={['#1890ff', '#40a9ff', '#69c0ff']}
            />
          </div>
        </Col>
        <Col span={24}>
          <Table
            dataSource={data}
            columns={columns}
            pagination={false}
            size="small"
            bordered
            className={styles.leadTable}
          />
        </Col>
      </Row>
    </Card>
  )
}

// Custom components
const FeatureCard = ({ icon, title, content }: { icon: React.ReactNode, title: string, content: string }) => (
  <Card bordered={false} className={styles.featureCard} bodyStyle={{ padding: 24 }}>
    <div className={styles.featureIcon}>{icon}</div>
    <Title level={4} style={{ margin: '16px 0' }}>{title}</Title>
    <Paragraph type="secondary">{content}</Paragraph>
  </Card>
)

const MetricBadge = ({ value, label }: { value: string, label: string }) => (
  <div className={styles.metricBadge}>
    <Text strong style={{ fontSize: 32 }}>{value}</Text>
    <Text type="secondary">{label}</Text>
  </div>
)

export default function LandingPage() {
  const { isMobile } = useWindowSize()

  // Chart configurations
  const growthData = [
    { year: '2020', value: 3.8 },
    { year: '2021', value: 5.2 },
    { year: '2022', value: 7.4 },
    { year: '2023', value: 12.3 },
  ]

  const growthConfig = {
    data: growthData,
    xField: 'year',
    yField: 'value',
    smooth: true,
    color: '#1890ff',
    areaStyle: { fill: '#e6f7ff' },
    height: 300,
  }

  const leadSources = [
    { source: 'LinkedIn', value: 45 },
    { source: 'Google Maps', value: 30 },
    { source: 'Yellow Pages', value: 15 },
    { source: 'Others', value: 10 },
  ]

  const leadConfig = {
    data: leadSources,
    xField: 'value',
    yField: 'source',
    seriesField: 'source',
    color: ['#1890ff', '#40a9ff', '#69c0ff', '#91d5ff'],
    height: 300,
  }
  
    return (
      <div className={styles.landingContainer}>
        {/* Hero Section */}
        <section className={styles.heroSection}>
          <div className={styles.gradientOverlay} />
          <Space direction="vertical" size={40} className={styles.heroContent}>
            <Title level={1} className={styles.heroTitle}>
              Transform Your Lead Generation with<br />
              <span className={styles.highlightText}>AI-Driven Intelligence</span>
            </Title>
            <Paragraph className={styles.heroSubtitle}>
              92% of businesses using Octavertex see 3x lead growth within 6 months
            </Paragraph>
            <Space size="large">
              <Button 
                type="primary" 
                size="large" 
                shape="round" 
                icon={<RocketOutlined />}
                href="/signup"
              >
                Start Free Trial
              </Button>
              <Button 
                size="large" 
                shape="round" 
                icon={<BarChartOutlined />}
                href="/demo"
              >
                Live Demo
              </Button>
            </Space>
            <DashboardPreview />
          </Space>
        </section>

      {/* Metrics Section */}
      <section className={styles.metricsSection}>
        <Row gutter={[48, 32]} justify="center">
          <Col xs={24} sm={12} md={8}>
            <Statistic
              title="Average Client Growth"
              value="247%"
              prefix={<RiseOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Statistic
              title="Monthly Leads Generated"
              value="1.2M+"
              prefix={<DashboardOutlined />}
            />
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Statistic
              title="Conversion Rate"
              value="38%"
              prefix={<CheckCircleOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Col>
        </Row>
      </section>

      {/* AI-Powered Features */}
      <section className={styles.featuresSection}>
        <Title level={2} className={styles.sectionTitle}>Next-Gen Lead Intelligence</Title>
        <Row gutter={[32, 32]} justify="center">
          <Col xs={24} md={12} lg={8}>
            <FeatureCard
              icon={<RiseOutlined style={{ fontSize: 40 }} />}
              title="Predictive Lead Scoring"
              content="Our AI models predict lead quality with 92% accuracy using 50+ data points"
            />
          </Col>
          <Col xs={24} md={12} lg={8}>
            <FeatureCard
              icon={<BarChartOutlined style={{ fontSize: 40 }} />}
              title="Automated Enrichment"
              content="Enrich lead profiles with 20+ data fields including technographics"
            />
          </Col>
          <Col xs={24} md={12} lg={8}>
            <FeatureCard
              icon={<DashboardOutlined style={{ fontSize: 40 }} />}
              title="Smart Campaigns"
              content="AI-optimized outreach sequences that adapt based on engagement"
            />
          </Col>
        </Row>
      </section>

      {/* Growth Visualization */}
      <section className={styles.analyticsSection}>
        <Title level={3} className={styles.sectionTitle}>Client Growth Acceleration</Title>
        <Row gutter={[32, 32]}>
          <Col xs={24} md={12}>
            <div className={styles.chartContainer}>
              <Title level={5}>Year-over-Year Growth</Title>
              <Line {...growthConfig} />
            </div>
          </Col>
          <Col xs={24} md={12}>
            <div className={styles.chartContainer}>
              <Title level={5}>Lead Source Distribution</Title>
              <Bar {...leadConfig} />
            </div>
          </Col>
        </Row>
      </section>

      {/* Testimonials */}
      <section className={styles.testimonialsSection}>
        <Title level={2} className={styles.sectionTitle}>Trusted by Growth Leaders</Title>
        <Carousel autoplay dotPosition={isMobile ? 'top' : 'bottom'}>
          {[...Array(3)].map((_, i) => (
            <div key={i} className={styles.testimonialCard}>
              <Paragraph className={styles.testimonialText}>
                "Octavertex transformed our lead gen process. We achieved 3x pipeline growth
                while reducing acquisition costs by 40%."
              </Paragraph>
              <Text strong>Sarah Johnson</Text>
              <Text type="secondary">CEO, TechGrowth Inc</Text>
            </div>
          ))}
        </Carousel>
      </section>

      {/* Pricing Section */}
      <section className={styles.pricingSection}>
        <Title level={2} className={styles.sectionTitle}>Simple, Scalable Pricing</Title>
        <Row gutter={[32, 32]} justify="center">
          {['Starter', 'Professional', 'Enterprise'].map((plan, i) => (
            <Col xs={24} md={8} key={plan}>
              <Card className={`${styles.pricingCard} ${i === 1 ? styles.recommended : ''}`}>
                <Title level={3}>{plan}</Title>
                <div className={styles.price}>
                  <Text strong style={{ fontSize: 48 }}>${i * 500 + 299}</Text>
                  <Text type="secondary">/month</Text>
                </div>
                <Button type={i === 1 ? 'primary' : 'default'} size="large" block>
                  Get Started
                </Button>
                <div className={styles.featuresList}>
                  {['Basic Analytics', 'AI Scoring', 'API Access', 'Priority Support'].map((f, j) => (
                    <div key={f} className={styles.featureItem}>
                      <CheckCircleOutlined style={{ color: j <= i + 1 ? '#52c41a' : '#ddd' }} />
                      <Text disabled={j > i + 1}>{f}</Text>
                    </div>
                  ))}
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </section>

      {/* Final CTA */}
      <section className={styles.ctaSection}>
        <Title level={2} className={styles.ctaTitle}>Start Your Growth Journey Today</Title>
        <Paragraph className={styles.ctaSubtitle}>
          Join 1,500+ companies accelerating their lead generation
        </Paragraph>
        <Button type="primary" size="large" shape="round" icon={<RocketOutlined />}>
          <Link href="/signup">Get Started Free</Link>
        </Button>
      </section>
    </div>
  )
}