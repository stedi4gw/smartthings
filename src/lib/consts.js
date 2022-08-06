import { config } from '../config'

export const API_OPTIONS = (method = 'GET') => ({
  method,
  headers: {
    'Authorization': `Bearer ${config.smartThingsKey}`,
    'Accept': 'application/vnd.smartthings+json;v=1',
  },
})