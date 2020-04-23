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
      this.service.get().then(({torrents}) => {
        this.setSessionTorrents(torrents.map(td => new Torrent(td)))
      })
    // get active torrents
      this.service.active().then(({torrents}) => this.setActiveTorrents(torrents))
    })
    // set interval to check for active torrents
    // set interval to check if new active torrents
  },
  methods:
  {
    ...mapMutations('session', {
      setSessionData: 'SET_SESSION_DATA',
      setSessionStats: 'SET_SESSION_STATS',
      setSessionTorrents: 'SET_SESSION_TORRENTS',
      setActiveTorrents: 'SET_ACTIVE_TORRENTS',
    })
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
