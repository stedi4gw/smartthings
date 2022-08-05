import { config } from '../config'

export const API_HEADERS = () => ({
  authorization: `Bearer ${config.smartThingsKey}`,
  accept: 'application/vnd.smartthings+json;v=1',
})