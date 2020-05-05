import Transmission from 'transmission-promise'
import Torrent from '../models/torrent'
// const TransmissionClient = Transmission

class TransmissionServiceAlt {

  constructor(options)
  {
    this.store = options.store
    this.client = new Transmission(options)
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
        this.store.commit('session/SET_SESSION_TORRENTS', (Object.fromEntries(
          // TODO: maybe the store should be in charge of how to save the
          // torrents, ie: always send and expect an array to and from the store,
          // however the store can internally mutate that as needed
          torrents.map(td => [td.id, (new Torrent(td))])
        )))
      })
      // get active torrents
      this.client.active().then(({torrents}) => {
        this.store.commit('session/SET_ACTIVE_TORRENTS', (Object.fromEntries(
          torrents.map(td => [td.id, (new Torrent(td))])
        )))

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
    console.log(this)
      this.client.get(this.store.state.session.activeTorrentsIds).then(({torrents}) => {
        this.store.commit('session/UPDATE_ACTIVE_TORRENTS', (torrents.map(td => new Torrent(td))))
      })
  }
}
export default TransmissionServiceAlt

