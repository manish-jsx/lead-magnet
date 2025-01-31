// lib/api.ts
import axios from 'axios'
import { getMessageInstance } from '@/lib/message'

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
})

api.interceptors.request.use(config => {
  const token = localStorage.getItem('access_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(
  response => response,
  error => {
    const message = getMessageInstance()
    
    if (error.response?.status === 401) {
      localStorage.removeItem('access_token')
      message.error('Session expired. Please login again.')
      window.location.href = '/login'
    } else {
      const errorMessage = error.response?.data?.message || 'An unexpected error occurred'
      message.error(errorMessage)
    }
    
    return Promise.reject(error)
  }
)

export default api