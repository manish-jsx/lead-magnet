'use client'
import { useState, useEffect } from 'react'
import { Layout, Menu, theme, Avatar, Dropdown, Breadcrumb, Spin, Tag } from 'antd'
import { 
  DashboardOutlined,
  TeamOutlined,
  RocketOutlined,
  SettingOutlined,
  QuestionCircleOutlined,
  CreditCardOutlined,
  ApiOutlined,
  NotificationOutlined,
  LogoutOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  ToolOutlined,
  LinkOutlined
} from '@ant-design/icons'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import styles from '@/app/styles/dashboard.module.css'
import React from 'react'

const { Header, Sider, Content } = Layout

interface MenuItem {
  key: string
  icon: React.ReactNode
  label: React.ReactNode
  path?: string
  children?: MenuItem[]
  type?: 'group'
}

const menuItems: MenuItem[] = [
  {
    key: 'dashboard',
    icon: <DashboardOutlined />,
    label: 'Dashboard',
    path: '/dashboard'
  },
  {
    key: 'leads',
    icon: <TeamOutlined />,
    label: 'Leads Management',
    path: '/dashboard/leads'
  },
  {
    key: 'automation',
    icon: <RocketOutlined />,
    label: 'Automation',
    children: [
      {
        key: 'scraper',
        icon: <ToolOutlined />,
        label: 'Data Scraper',
        path: '/dashboard/scraper'
      },
      {
        key: 'workflows',
        icon: <LinkOutlined />,
        label: 'Workflows',
        path: '/dashboard/workflows'
      }
    ]
  },
  {
    key: 'settings',
    icon: <SettingOutlined />,
    label: 'Settings & Integrations',
    children: [
      {
        key: 'account',
        icon: <UserOutlined />,
        label: 'Account Settings',
        path: '/dashboard/settings'
      },
      {
        key: 'billing',
        icon: <CreditCardOutlined />,
        label: 'Billing & Plans',
        path: '/dashboard/billing'
      },
      {
        key: 'integrations',
        icon: <ApiOutlined />,
        label: 'Integrations',
        path: '/dashboard/integrations'
      },
      {
        key: 'api',
        icon: <ApiOutlined />,
        label: 'API Management',
        path: '/dashboard/api'
      },
      {
        key: 'webhooks',
        icon: <NotificationOutlined />,
        label: 'Webhooks',
        path: '/dashboard/webhooks'
      }
    ]
  },
  {
    key: 'support',
    icon: <QuestionCircleOutlined />,
    label: 'Support Center',
    path: '/dashboard/support'
  }
]

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [collapsed, setCollapsed] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const {
    token: { colorBgContainer, colorPrimary },
  } = theme.useToken()

  useEffect(() => {
    setLoading(false)
  }, [pathname])

  const selectedKeys = menuItems
    .flatMap(item => item.children || [item])
    .filter(item => pathname.startsWith(item.path || ''))
    .map(item => item.key)

  const handleMenuClick = ({ key }: { key: string }) => {
    const item = menuItems
      .flatMap(item => item.children || [item])
      .find(menuItem => menuItem.key === key)
    
    if (item?.path) {
      setLoading(true)
      router.push(item.path)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('access_token')
    router.push('/login')
  }

  const userMenu = (
    <Menu
      items={[
        {
          key: 'profile',
          label: 'My Profile',
          icon: <UserOutlined />
        },
        {
          key: 'settings',
          label: 'Account Settings',
          icon: <SettingOutlined />
        },
        {
          type: 'divider'
        },
        {
          key: 'logout',
          label: 'Logout',
          icon: <LogoutOutlined />,
          danger: true,
          onClick: handleLogout
        }
      ]}
    />
  )

  const breadcrumbNameMap: Record<string, string> = {
    dashboard: 'Dashboard',
    leads: 'Leads Management',
    scraper: 'Data Scraper',
    workflows: 'Automation Workflows',
    settings: 'Account Settings',
    billing: 'Billing & Plans',
    integrations: 'Integrations',
    api: 'API Management',
    webhooks: 'Webhook Settings',
    support: 'Support Center'
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        width={280}
        collapsedWidth={80}
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
        className={styles.sider}
        theme="dark"
      >
        <div className={styles.logoContainer}>
          <Link href="/dashboard" className={styles.logo}>
            {collapsed ? 'OV' : (
              <>
                <span style={{ color: colorPrimary }}>Octa</span>Vertex
                <Tag color="geekblue" style={{ marginLeft: 8 }}>PRO</Tag>
              </>
            )}
          </Link>
        </div>

        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={selectedKeys}
          onClick={handleMenuClick}
          defaultOpenKeys={['automation', 'settings']}
        >
          {menuItems.map(item =>
            item.children ? (
              <Menu.SubMenu
                key={item.key}
                icon={item.icon}
                title={item.label}
              >
                {item.children.map(child => (
                  <Menu.Item key={child.key} icon={child.icon}>
                    {child.path ? <Link href={child.path}>{child.label}</Link> : child.label}
                  </Menu.Item>
                ))}
              </Menu.SubMenu>
            ) : (
              <Menu.Item key={item.key} icon={item.icon}>
                {item.path ? <Link href={item.path}>{item.label}</Link> : item.label}
              </Menu.Item>
            )
          )}
        </Menu>
      </Sider>

      <Layout>
        <Header style={{ 
          padding: '0 24px',
          background: colorBgContainer,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: styles.trigger,
              onClick: () => setCollapsed(!collapsed),
            })}
            <Breadcrumb
              items={pathname
                .split('/')
                .filter(p => p && p !== 'dashboard')
                .map(p => ({
                  title: breadcrumbNameMap[p] || p.charAt(0).toUpperCase() + p.slice(1),
                }))}
            />
          </div>

          <Dropdown overlay={userMenu} trigger={['click']}>
            <div className={styles.userProfile}>
              <Avatar 
                size="default" 
                style={{ backgroundColor: colorPrimary }}
                icon={<UserOutlined />}
              />
              {!collapsed && (
                <div className={styles.userInfo}>
                  <span className={styles.userName}>John Doe</span>
                  <span className={styles.userRole}>Administrator</span>
                </div>
              )}
            </div>
          </Dropdown>
        </Header>

        <Content className={styles.content}>
          <div className={styles.contentInner}>
            <Spin 
              spinning={loading} 
              tip="Loading..." 
              indicator={<RocketOutlined spin />}
            >
              {children}
            </Spin>
          </div>
        </Content>
      </Layout>
    </Layout>
  )
}