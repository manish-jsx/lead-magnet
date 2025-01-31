import type { ThemeConfig } from 'antd';

export const theme: ThemeConfig = {
  token: {
    colorPrimary: '#1890ff',
    borderRadius: 8,
    colorBgContainer: '#ffffff',
    colorLink: '#1890ff',
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif',
  },
  components: {
    Button: {
      colorPrimary: '#1890ff',
    },
    Table: {
      headerBg: '#fafafa',
      headerColor: '#595959',
    },
  },
};