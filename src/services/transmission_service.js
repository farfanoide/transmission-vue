import Torrent from '../models/torrent'
import TransmissionClient from './transmission_client'
import specV15 from '../lib/rpc_spec/v15.js'
class TransmissionService {

  constructor(options)
  {
    this.store                     = options.store
    this.client                    = new TransmissionClient(options)
    this.fetchActivesInterval      = null
    this.fetchActiveIdsInterval    = null
    this.fetchSessionStatsInterval = null
    this.fetchSessionDataInterval  = null
  }

  activate()
  {
    // get session data
    this.client.session().then(data => {
      this.store.commit('session/SET_SESSION_DATA', data)
      // get session stats
      this.fetchSessionStats()
      // get torrents data
      this.client.get().then(({torrents}) => {
        this.store.commit('session/SET_SESSION_TORRENTS', Torrent.fromRPC(torrents))
      })
      // TODO make intervals configurable
      this.fetchActiveIdsInterval    = setInterval(this.fetchActiveIds.bind(this), 2000 * 2)
      this.fetchSessionStatsInterval = setInterval(this.fetchSessionStats.bind(this), 2000 * 2)
      this.fetchSessionDataInterval = setInterval(this.fetchSessionData.bind(this), 2000 * 2)
      this.fetchActivesInterval      = setInterval(this.fetchActiveTorrents.bind(this), 2000)
    })
  }

  deactivate()
  {
    clearInterval(this.fetchActivesInterval)
    clearInterval(this.fetchActiveIdsInterval)
    clearInterval(this.fetchSessionStatsInterval)
    clearInterval(this.fetchSessionDataInterval)
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


  getClientSettings()
  {
    return this.client.session()
      .then( response => {
        this.store.commit('session/SET_SETTINGS', response);
        return response;
      })
  }

  /**
   * Set some settings on the server. It has the responsability
   * to filter which data is being sended to server.
   * @params {Object} A settings model instance
   */
  setClientSettings(settings)
  {
    // determine the fields not accepted to set session.
    const exclude = Object.entries(specV15.session)
          .filter(([name,spec]) => !spec.set)
          .map(([name,spec]) => name)
    return this.client.session(settings.getSettingsExcept(exclude));
  }

  fetchSessionStats()
  {
    this.client.sessionStats().then(stats => this.store.commit('session/SET_SESSION_STATS', stats))
  }

  fetchSessionData()
  {
    this.client.session().then(data => this.store.commit('session/SET_SESSION_DATA', data))
  }

  addTorrentFromUrl(url)
  {
    return this.client.addUrl(url)
  }

  addTorrentFromBase64(data)
  {
    return this.client.addBase64(data)
  }

}
export default TransmissionService
