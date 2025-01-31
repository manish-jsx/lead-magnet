// app/dashboard/analytics/page.tsx
'use client';
import { Line } from '@ant-design/charts';
import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';

export default function AnalyticsPage() {
  const { data } = useQuery({
    queryKey: ['leads-analytics'],
    queryFn: () => api.get('/analytics/leads/').then(res => res.data)
  });

  const config = {
    data: data || [],
    xField: 'date',
    yField: 'count',
    seriesField: 'source',
    smooth: true,
    animation: {
      appear: {
        animation: 'path-in',
        duration: 5000,
      },
    },
  };

  return <Line {...config} />;
}