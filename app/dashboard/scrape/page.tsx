'use client'
import { Button, Card, message } from 'antd'
import axios from 'axios'
import DashboardLayout from '@/components/DashboardLayout'

export default function ScrapePage() {
  const triggerScraping = async () => {
    try {
      const response = await axios.post('/api/trigger-scraper')
      message.success(response.data.status)
    } catch (error) {
      message.error('Failed to trigger scraper')
    }
  }

  return (
    <DashboardLayout>
      <Card title="Scraper Control Panel">
        <Button type="primary" onClick={triggerScraping}>
          Run Scraper Now
        </Button>
      </Card>
    </DashboardLayout>
  )
}