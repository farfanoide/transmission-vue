import Torrent from '../models/torrent'
import TransmissionClient from './transmission_client'

class TransmissionService {

  constructor(options)
  {
    this.store = options.store
    this.client = new TransmissionClient(options)
    this.fetchDataInterval = null
    this.fetchActivesInterval = null
  }

  activate()
  {
    // get session data
    this.client.session().then(data => {
      this.store.commit('session/SET_SESSION_DATA', data)
      // get session stats
      this.client.sessionStats().then((stats) => {
        this.store.commit('session/SET_SESSION_STATS', stats)
      })
      // get torrents data
      this.client.get().then(({torrents}) => {
        this.store.commit('session/SET_SESSION_TORRENTS', Torrent.fromRPC(torrents))
      })
      // get active torrents
      this.client.active().then(({torrents}) => {
        this.store.commit('session/SET_ACTIVE_TORRENTS', Torrent.fromRPC(torrents))

        this.fetchActivesInterval = setInterval(this.fetchActives.bind(this), 2000)
      })
    })
    // TODO: set interval to check for active torrents
    // TODO: set interval to check if new active torrents
  }

  deactivate()
  {
    clearInterval(this.fetchActivesInterval)
  }

  fetchActives()
  {
    let activeTorrentsIds = this.store.state.session.activeTorrentsIds
    this.client.get(activeTorrentsIds).then(({torrents}) => {
      this.store.commit('session/UPDATE_ACTIVE_TORRENTS', Torrent.fromRPC(torrents))
    })
  }

  fetchClientSettings()
  {
    return this.client.session()
      .then( response => {
        this.store.commit('session/SET_SETTINGS', response);
        return response
      })
  }

  setClientSettings(settingsData)
  {
    // since blocklist-url is not handled by
    // session call remove it from settings data
    delete settingsData['blocklist-url']
    delete settingsData['blocklist-size']
    delete settingsData['idle-seeding-limit']
    return this.client.session(settingsData)
      .then( response => {
        console.log("response from server", response)
        this.store.commit('session/SET_SETTINGS', settingsData)
        return response;
      }
      )
  }
}
export default TransmissionService
