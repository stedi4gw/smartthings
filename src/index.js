import { config } from './config'
import { devices } from './devices'
import { locks } from './locks'
import { thermostats } from './thermostats'

export const smartthings = (api_key) => {
  config.smartThingsKey = api_key

  return {
    devices,
    locks,
    thermostats,
  } 
}
