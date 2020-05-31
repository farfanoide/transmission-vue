<template>
  <q-page class="flex">
    <torrent-list></torrent-list>
    <!-- bottom sheet -->
    <multi-torrent-actions></multi-torrent-actions>
    <q-inner-loading :showing="loading">
      <q-spinner
        color="primary"
        size="5em"
        :thickness="2">
      </q-spinner>
    </q-inner-loading>
  </q-page>
</template>

<script>
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex'
import TorrentList from '../components/TorrentList'
import MultiTorrentActions from '../components/MultiTorrentActions'

export default {
  name: 'TorrentsListing',
  components: {
    TorrentList,
    MultiTorrentActions
  },
  data()
  {
    return {
      // TODO: move loading to vuex to allow for actions to individually modify
      // it. for example if the server goes down, any failed action might want to
      // set this property
      loading: true,
      intervals: {
        activeIds: null,
        sessionStats: null,
        sessionData: null,
        actives: null,
      }
    }
  },
  created()
  {
    // TODO: move to maybe a beforeEnter on the route itself
    if (this.currentServer)
    {
      this.enableClient()
    } else {
      if (this.hasDefaultServer)
      {
        this.setDefaultServerAsCurrent().then(this.enableClient)
      } else {
        this.$router.push({name: 'servers'})
      }
    }
  },
  beforeDestroy()
  {
    if (this.currentServer)
    {
      this.disableClient()
    }
    this.setCurrentServer(null)
    this.clearSessionTorrents()
  },
  methods:
  {
    ...mapActions('configs', [
      'setCurrentServer',
      'setDefaultServerAsCurrent',
    ]),
    ...mapActions('session', [
      'getSessionData',
      'getSessionStats',
      'getTorrents',
      'updateActiveTorrents'
    ]),
    ...mapMutations('session', {
      clearSessionTorrents: 'CLEAR_SESSION_TORRENTS',
    }),
    disableClient()
    {
      Object.keys(this.intervals).forEach(key => clearInterval(this.intervals[key]))
    },
    enableClient: function ()
    {
      // Initial fetch of data
      this.getSessionData()
      this.getSessionStats()
      this.getTorrents().then(() => this.loading = false)

      // set intervals to fetch data regularly
      // TODO: make intervals configurable
      this.intervals.sessionData  = setInterval(this.getSessionData, 2000 * 2)
      this.intervals.sessionStats = setInterval(this.getSessionStats, 2000 * 2)
      this.intervals.actives      = setInterval(this.updateActiveTorrents, 2000)

    },
  },
  computed:
  {
    ...mapGetters('configs', [
      'hasDefaultServer',
      'client',
    ]),
    ...mapState('configs', ['currentServer']),
  }
}
</script>
