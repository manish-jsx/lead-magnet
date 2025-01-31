// lib/message.ts
import { MessageInstance } from 'antd/es/message/interface'

let messageInstance: MessageInstance | null = null

export const setMessageInstance = (instance: MessageInstance) => {
  messageInstance = instance
}

export const getMessageInstance = () => {
  if (!messageInstance) {
    throw new Error('Message instance not initialized')
  }
  return messageInstance
}