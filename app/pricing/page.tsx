// app/pricing/page.tsx
'use client'
import { Button, Card, Col, Row, Tag, Typography } from 'antd'
import { CheckCircleOutlined } from '@ant-design/icons'
import styles from '@/app/styles/pricing.module.css'

const { Title, Text } = Typography

const pricingPlans = [
  {
    name: 'Starter',
    price: 299,
    features: ['Basic Analytics', '500 Leads/Month', 'Email Support']
  },
  {
    name: 'Professional',
    price: 799,
    features: ['Advanced Analytics', '5000 Leads/Month', 'Priority Support', 'API Access'],
    recommended: true
  },
  {
    name: 'Enterprise',
    price: 1999,
    features: ['Custom Analytics', 'Unlimited Leads', '24/7 Support', 'Dedicated Manager']
  }
]

export default function PricingPage() {
  return (
    <div className={styles.pricingContainer}>
      <Title level={2} style={{ textAlign: 'center' }}>
        Flexible Pricing Plans
      </Title>
      
      <Row gutter={[24, 24]} justify="center">
        {pricingPlans.map((plan, index) => (
          <Col key={plan.name} xs={24} md={8}>
            <Card className={`${styles.pricingCard} ${plan.recommended ? styles.recommended : ''}`}>
              {plan.recommended && <Tag color="blue">MOST POPULAR</Tag>}
              <Title level={3}>{plan.name}</Title>
              <div className={styles.price}>
                <Text strong>${plan.price}</Text>
                <Text type="secondary">/month</Text>
              </div>
              <div className={styles.featuresList}>
                {plan.features.map(feature => (
                  <div key={feature} className={styles.featureItem}>
                    <CheckCircleOutlined />
                    <Text>{feature}</Text>
                  </div>
                ))}
              </div>
              <Button type={plan.recommended ? 'primary' : 'default'} block>
                Get Started
              </Button>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  )
}