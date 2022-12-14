import { config } from './config'
import { API_OPTIONS } from './lib/consts'
import { requestAsync } from './lib/utilis'

/** API Command to set Thermostat Mode */
const thermostatModeCommand = ( mode ) => [
    {
      capability: 'thermostatMode',
      command: 'setThermostatMode',
      arguments: [ mode ]
    }
  ]

/** API Command to set A/C Trigger Temp */
const coolingSetpointCommand  = ( temp ) => [
    {
      capability: 'thermostatCoolingSetpoint',
      command: 'setCoolingSetpoint',
      arguments: [ temp ]
    }
  ]

/** API Command to set Heat Trigger Temp */
const heatingSetpointCommand  = ( temp ) => [
    {
      capability: 'thermostatHeatingSetpoint',
      command: 'setHeatingSetpoint',
      arguments: [ temp ]
    }
  ]

/**
 * Get thermostat controller
 * @param {string} deviceId id of SmartThings device
 * @returns Controller for specified thermostat
 */
export const thermostats = (deviceId) => {
  const thermostatCommandsApi = `${config.smartThingsUrl}/devices/${deviceId}/commands`
  const thermostatApi = `${config.smartThingsUrl}/devices/${deviceId}/components/main/status`

  const commands = {
    /** Braod overview of thermostat status */
    getStatus: async () => {
      const resp = await requestAsync(thermostatApi, API_OPTIONS() )
      return resp.data
    },
    /** Set thermostat mode
     * @param {'off' | 'cool' | 'heat' | 'auto' } mode
    */
    setMode: async (mode) => {
      await requestAsync(thermostatCommandsApi, API_OPTIONS('POST'), {
        commands: thermostatModeCommand(mode)
      })
    },
    /** Set A/C temperature
     * @param {integer} temp - Temp at which A/C will turn on
    */
    setCoolingSetpoint: async (temp) => {
      await requestAsync(thermostatCommandsApi, API_OPTIONS('POST'), {
        commands: coolingSetpointCommand(temp)
      })
    },
    /** Set heating temperature
     * @param {integer} temp - Temp at which heat will turn on
    */
    setHeatingSetpoint: async (temp) => {
      await requestAsync(thermostatCommandsApi, API_OPTIONS('POST'), {
        commands: heatingSetpointCommand(temp)
      })
    },
  }

  return {
    /** Braod overview of thermostat status */
    getStatus: commands.getStatus,
    /** Set thermostat mode
     * @param {'off' | 'cool' | 'heat' | 'auto' } mode
    */
    setMode: commands.setMode,
    /** Set A/C temperature
     * @param {integer} temp - Temp at which A/C will turn on
    */
    setCoolingSetpoint: commands.setCoolingSetpoint,
    /** Set heating temperature
     * @param {integer} temp - Temp at which heat will turn on
    */
    setHeatingSetpoint: commands.setHeatingSetpoint,
    /** Set to auto mode, with temp range
     * @param {integer} low - Temp at which heat will turn on
     * @param {integer} high - Temp at which A/C will turn on
    */
    setToAutoTempRange: async (low, high) => {
      await commands.setMode('auto')
      await new Promise((resolve) => setTimeout(resolve, 10000))
      await commands.setCoolingSetpoint(high)
      await new Promise((resolve) => setTimeout(resolve, 10000))
      await commands.setHeatingSetpoint(low)
    },
    /** Set to cool mode with specified high
     * @param {integer} temp - Temp at which A/C will turn on
    */
     setToCoolTemp: async (temp) => {
      await commands.setMode('cool')
      await new Promise((resolve) => setTimeout(resolve, 10000))
      await commands.setCoolingSetpoint(temp)
    },
    /** Set to heat mode with specified temp
     * @param {integer} temp - Temp at which heat will turn on
    */
    setToHeatTemp: async (temp) => {
      await commands.setMode('heat')
      await new Promise((resolve) => setTimeout(resolve, 10000))
      await commands.setHeatingSetpoint(temp)
    },
  }
}
