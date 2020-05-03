<template>
  <q-page class="flex">
    <torrent-list></torrent-list>
    <!-- bottom sheet -->
    <multi-torrent-actions> </multi-torrent-actions>
  </q-page>
</template>

<script>
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex'
import TorrentList from '../components/TorrentList'
import MultiTorrentActions from '../components/MultiTorrentActions'
import TransmissionClient from '../services/transmission'
import Torrent from '../models/torrent'

export default {
  name: 'TorrentsListing',
  components: {
    TorrentList,
    MultiTorrentActions
  },
  data()
  {
    return {
      interval: null,
    }
  },
  created()
  {
    // TODO: move to maybe a beforeEnter on the route itself
    if (!this.currentServer)
    {
      if (this.hasDefaultServer)
      {
        this.setDefaultServerAsCurrent().then(this.activateClient)
      } else {
        this.$router.push({name: 'servers'})
      }
    } else {
      this.activateClient()
    }
  },
  beforeDestroy()
  {
    this.deactivateClient()
    this.setCurrentServer(null)
  },
  methods:
  {
    ...mapActions('configs', [
      'setCurrentServer',
      'setDefaultServerAsCurrent'
    ]),
    ...mapMutations('session', {
      setSessionData: 'SET_SESSION_DATA',
      setSessionStats: 'SET_SESSION_STATS',
      setSessionTorrents: 'SET_SESSION_TORRENTS',
      setActiveTorrents: 'SET_ACTIVE_TORRENTS',
      updateActiveTorrents: 'UPDATE_ACTIVE_TORRENTS',
      //clearSelectedTorrents: 'CLEAR_SELECTED_TORRENTS',
    }),
    fetchActives: function ()
    {
      // TODO: after first fetch, get only active-torrents
      this.service.get(this.activeTorrentsIds).then(({torrents}) => {
        this.updateActiveTorrents(torrents.map(td => new Torrent(td)))
      })
    },
    fetchData: function ()
    {
      // TODO: after first fetch, get only active-torrents
      this.service.get().then(({torrents}) => {
        this.setSessionTorrents(Object.fromEntries(
          // TODO: maybe the store should be in charge of how to save the
          // torrents, ie: always send and expect an array to and from the store,
          // however the store can internally mutate that as needed
          torrents.map(td => [td.id, (new Torrent(td))])
        ))
      })
    },
    deactivateClient: function ()
    {
      clearInterval(this.interval)
    },
    activateClient: function ()
    {
      // TODO: handle this on client itself
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
        this.service.active().then(({torrents}) => {
          this.setActiveTorrents(Object.fromEntries(
            torrents.map(td => [td.id, (new Torrent(td))])
          ))
          this.interval = setInterval(this.fetchActives, 10000)
        })
      })
      // TODO: set interval to check for active torrents
      // TODO: set interval to check if new active torrents


    }
  },
  computed:
  {
    ...mapGetters('configs', ['hasDefaultServer']),
    ...mapState('configs', ['currentServer']),
    ...mapState('session', [
      'data',
      'stats',
      'activeTorrents'
    ])
  }
}
</script>
