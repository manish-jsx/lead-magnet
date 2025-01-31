// app/dashboard/support/page.tsx
'use client'
import { Collapse, Form, Input, Button, Card } from 'antd'
import { useQuery } from '@tanstack/react-query'
import api from '@/lib/api'

const { Panel } = Collapse

const faqs = [
  {
    question: 'How do I set up my first campaign?',
    answer: 'Navigate to the Campaigns section and follow the setup wizard...'
  },
  {
    question: 'What data sources are supported?',
    answer: 'We currently support LinkedIn, Google Maps, and YellowPages...'
  }
]

export default function SupportPage() {
  return (
    <div className="space-y-6">
      <Collapse accordion>
        {faqs.map((faq, index) => (
          <Panel header={faq.question} key={index}>
            <p>{faq.answer}</p>
          </Panel>
        ))}
      </Collapse>

      <Card title="Contact Support">
        <Form layout="vertical">
          <Form.Item label="Subject" name="subject">
            <Input />
          </Form.Item>
          <Form.Item label="Message" name="message">
            <Input.TextArea rows={4} />
          </Form.Item>
          <Button type="primary">Send Message</Button>
        </Form>
      </Card>
    </div>
  )
}