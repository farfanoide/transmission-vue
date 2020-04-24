<template>
  <q-page class="flex">
    <torrent-list></torrent-list>
  </q-page>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import TorrentList from '../components/TorrentList'
import TransmissionClient from '../services/transmission'
import Torrent from '../models/torrent'

export default {
  name: 'TorrentsListing',
  components: {
    TorrentList,
  },
  data()
  {
    return {
      interval: null,
    }
  },
  created()
  {
    // create api client
    this.service = new TransmissionClient(this.currentServer)
    // get session data
    this.service.session().then(data => {

      this.setSessionData(data)
      // get session stats
      this.service.sessionStats().then((stats) => this.setSessionStats(stats))
      // get torrents data
      this.fetchData()
      // get active torrents
      this.service.active().then(({torrents}) => this.setActiveTorrents(torrents))
    })
    if (!this.interval) // extra check for HMR while developing
    {
      // TODO: add interval config
      this.interval = setInterval(this.fetchData, 2000)
    }
    // set interval to check for active torrents
    // set interval to check if new active torrents
  },
  onBeforeDestroy()
  {
    clearInterval(this.interval)
  },
  methods:
  {
    ...mapMutations('session', {
      setSessionData: 'SET_SESSION_DATA',
      setSessionStats: 'SET_SESSION_STATS',
      setSessionTorrents: 'SET_SESSION_TORRENTS',
      setActiveTorrents: 'SET_ACTIVE_TORRENTS',
    }),
    fetchData: function ()
    {
      // TODO: after first fetch, get only active-torrents
      this.service.get().then(({torrents}) => {
        this.setSessionTorrents(torrents.map(td => new Torrent(td)))
      })
    }
  },
  computed:
  {
    ...mapState('configs', ['currentServer']),
    ...mapState('session', [
      'data',
      'stats',
      'activeTorrents'
    ]),
  }
}
</script>
