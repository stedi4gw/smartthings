import { config } from './config'
import { API_OPTIONS } from './lib/consts'
import { requestAsync } from './lib/utilis'

/** API Command to create Key Code on smart lock
 * @param {integer} id - unique id of code 
 * @param {string} code - the numeric code
 * @param {string} name - display name of code
*/
const setKeyCodeCommand = ( id, code, name ) => [
    {
      capability: 'lockCodes',
      command: 'setCode',
      arguments: [ id, code, name ]
    }
  ]

/** API Command to update name of Key Code on smart lock
 * @param {integer} id - unique id of code 
 * @param {string} name - display name of code
*/
const updateKeyCodeNameCommand = ( id, name) => [
    {
      capability: 'lockCodes',
      command: 'nameSlot',
      arguments: [ id, name ]
    }
  ]

/** API Command to clear a Key Code on smart lock
 * @param {integer} id - unique id of code 
*/
const clearKeyCodeCommand = ( id ) => [
    {
      capability: 'lockCodes',
      command: 'deleteCode',
      arguments: [ id ]
    }
  ]

/** Get lock controller
 * @param {string} deviceId - Id of the smart things device
 * @returns controller for specific lock
*/
export const locks = (deviceId) => {
  const lockCommandsApi = `${config.smartThingsUrl}/devices/${deviceId}/commands`
  const lockCodesApi = `${config.smartThingsUrl}/devices/${deviceId}/components/main/status`
  return {
    /** TODO: Define return type */
    /** Get the overview of lock status */
    getStatus: async () => {
      const resp = await requestAsync(lockCodesApi, API_OPTIONS() )
      return resp.data
    },

    /** TODO: Define return type */
    /** Get existing lock codes */
    getKeyCodes: async () => {
      const resp = await requestAsync(lockCodesApi, API_OPTIONS() )
      return resp.data.lockCodes.lockCodes.value
    },

    /** Creates key code.  Can be run to overwrite existing key code
     * @param {integer} id - unique id of code. This is a sequential number beginning at 1? up to the number of codes supported by the device
     * @param {string} code - the numeric code
     * @param {string} name - display name of code
    */
    setKeyCode: async (id, code, name) => {
      await requestAsync(lockCommandsApi, API_OPTIONS('POST'), {
        commands: setKeyCodeCommand(id, code, name)
      })
    },

    /** Updates friendly name of key code
     * @param {integer} id - unique id of code 
     * @param {string} name - display name of code
    */
    updateKeyCodeName: async (id, name) => {
      await requestAsync(lockCommandsApi, API_OPTIONS('POST'), {
        commands: updateKeyCodeNameCommand(id, name)
      } )
    },

    /** Clears key code
     * @param {integer} id - unique id of code 
    */
    clearKeyCode: async (id) => {
      await requestAsync(lockCommandsApi, API_OPTIONS('POST'), {
        commands: clearKeyCodeCommand(id)
      })
    }
  }
}
