import { config } from './config'
import { recurseNext } from './lib/utilis'

export const devices = () => {
  const devicesApi = `${config.smartThingsUrl}/devices`

  return {
    /** Retrieves the full list of devices */
    getDeviceList: async () => await recurseNext(devicesApi),
  }
}