import { config } from './config'
import { recurseNext } from './lib/utilis'

export const devices = () => {
  const devicesApi = `${config.smartThingsUrl}/devices`


  return {
    /**
     * @typedef {Object} Device - creates a new type named 'SpecialType'
     * @property {string} id - a string property of SpecialType
     *//**
    * Retrieves full list of devices
    * @returns {Promise<Device[]>}
    */
    getDeviceList: async () => await recurseNext(devicesApi),
  }
}