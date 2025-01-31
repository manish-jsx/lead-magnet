'use client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { App, ConfigProvider } from 'antd'
import { theme } from '@/theme/themeConfig'
import { setMessageInstance } from '@/lib/message'
import React from 'react'

const queryClient = new QueryClient()

export function Providers({ children }: { children: React.ReactNode }) {
  const { message } = App.useApp()

  React.useEffect(() => {
    setMessageInstance(message)
  }, [message])

  return (
    <ConfigProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </ConfigProvider>
  )
}