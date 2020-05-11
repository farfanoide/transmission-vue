import Torrent from '../models/torrent'
import TransmissionClient from './transmission_client'

class TransmissionService {

  constructor(options)
  {
    this.store = options.store
    this.client = new TransmissionClient(options)
    this.fetchActivesInterval = null
    this.fetchActiveIdsInterval = null
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
      // TODO make intervals configurable
      this.fetchActiveIdsInterval = setInterval(this.fetchActiveIds.bind(this), 2000 * 2)
      this.fetchActivesInterval = setInterval(this.fetchActives.bind(this), 2000)
    })
  }

  deactivate()
  {
    clearInterval(this.fetchActivesInterval)
    clearInterval(this.fetchActiveIdsInterval)
  }

  fetchActiveIds()
  {
    // get active torrents
    this.client.active().then(({torrents}) => {
      this.store.commit('session/SET_ACTIVE_TORRENTS', Torrent.fromRPC(torrents))
    })
  }

  fetchActives()
  {
    let activeTorrentsIds = this.store.state.session.activeTorrentsIds
    this.client.get(activeTorrentsIds).then(({torrents}) => {
      // TODO: rename to UPDATE_TORRENTS
      this.store.commit('session/UPDATE_ACTIVE_TORRENTS', Torrent.fromRPC(torrents))
    })
  }
}
export default TransmissionService
