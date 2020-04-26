<template>
  <q-page class="flex">
    <torrent-list></torrent-list>

    <q-dialog v-model="showMultTorrentActions" seamless position="bottom">
      <q-card style="width: 100%">

        <q-card-section class="row items-center no-wrap">
          <div>
            <div class="text-weight-bold">
              Apply action on multiple Torrents
            </div>
            <div class="text-grey">
            </div>
          </div>

          <q-space></q-space>

          <q-btn flat round icon="play_arrow">
          </q-btn>
          <q-btn flat round icon="pause">
          </q-btn>
          <q-btn flat round icon="delete">
          </q-btn>

          <q-space></q-space>

          <q-btn flat round icon="close" @click="clearSelectedTorrents"/>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex'
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
      this.service.active().then(({torrents}) => {
        this.setActiveTorrents(Object.fromEntries(
          torrents.map(td => [td.id, (new Torrent(td))])
        ))
        this.interval = setInterval(this.fetchActives, 2000)
      })
    })
    // TODO: set interval to check for active torrents
    // TODO: set interval to check if new active torrents
  },
  beforeDestroy()
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
      updateActiveTorrents: 'UPDATE_ACTIVE_TORRENTS',
      clearSelectedTorrents: 'CLEAR_SELECTED_TORRENTS',
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
    ...mapGetters('session', ['activeTorrentsIds', 'selectedTorrents']),
    showMultTorrentActions: function ()
    {
      return this.selectedTorrents.length > 0
    },
  }
}
</script>
