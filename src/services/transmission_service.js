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
      this.fetchActivesInterval = setInterval(this.fetchActiveTorrents.bind(this), 2000)
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
      // TODO: handle 'removed' from request as well
      this.store.commit('session/SET_ACTIVE_TORRENTS', Torrent.fromRPC(torrents))
    })
  }

  fetchActiveTorrents()
  {
    let activeTorrentsIds = this.store.state.session.activeTorrentsIds
    this.client.get(activeTorrentsIds).then(({torrents}) => {
      this.store.commit('session/UPDATE_TORRENTS', Torrent.fromRPC(torrents))
    })
  }

  addTorrentFromUrl(url)
  {
    // TODO: add torrent
    return this.client.addUrl(url)
  }

  addTorrentFromFile(file)
  {
    console.log('adding from file', file)
    // TODO: add by file or base64
    // return this.client.addFile(url)
  }
}
export default TransmissionService
