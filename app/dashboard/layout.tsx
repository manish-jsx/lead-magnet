'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Loading from '@/components/Loading';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter();
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (!token) router.push('/login');
    setAuthChecked(true);
  }, [router]);

  if (!authChecked) return <Loading />;

  return <>{children}</>;
}