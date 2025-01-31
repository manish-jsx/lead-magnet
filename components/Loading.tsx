'use client';
import { Spin } from 'antd';
import styles from '@/app/styles/dashboard.module.css';

export default function Loading() {
  return (
    <div className={styles.loadingOverlay}>
      <Spin size="large" />
    </div>
  );
}