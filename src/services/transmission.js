// import cordovaHTTP from 'cordova-plugin-advanced-http'
import axios from 'axios'
//
import Transmission from 'transmission-promise'
// TODO: check how to inject cordova http plugin instead of axios for mobile

class TransmissionClient extends Transmission {
  constructor ( options = {} )
  {
    super(options)
    this.httpInterface = options.httpInterface || axios
  }

  /**
   * Makes a call to the Transmission server
   *
   * @param {Object} query The query to send the server
   * @returns {Promise}
   */
  callServer (query) {
    return new Promise((resolve, reject) => {
      const makeRequest = async () => {
        const config = {
          headers: {
            'X-Transmission-Session-Id': this.key || ''
          }
        }

        if (this.authHeader) {
          config.headers.Authorization = this.authHeader
        }

        try {
          const response = await this.httpInterface.post(this.url, query, config)

          if (typeof response.data.result === 'string' && response.data.result !== 'success') {
            throw new Error(response.data.result)
          }

          resolve(response.data.arguments)
        } catch (err) {
          if (err.response && err.response.status === 409) {
            this.key = err.response.headers['x-transmission-session-id']
            return makeRequest()
          }

          reject(err)
        }
      }

      makeRequest()
    })
  }
}
export default TransmissionClient
