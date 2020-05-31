<template>
  <div class="torrents-list">
    <torrent-row v-for="( torrent, index ) in torrents"
                 @show-details="setSelectedTorrentId(torrent.id)"
                 :torrent="torrent"
                 :key="`torrent-row-${index}`">
    </torrent-row>
    <q-dialog v-model='showTorrentDetails'
              full-width
              full-height>
      <torrent-details></torrent-details>
    </q-dialog>
  </div>
</template>

<script>

import { mapGetters, mapMutations, mapState } from 'vuex'
import TorrentRow from './TorrentRow'
import TorrentDetails from './TorrentDetails'

export default {
  name: 'TorrentList',
  components:
  {
    TorrentDetails,
    TorrentRow,
  },
  methods:
  {
    ...mapMutations('session', {setSelectedTorrentId: 'SET_SELECTED_TORRENT_ID'}),
  },
  computed: {
    ...mapState('session', ['selectedTorrentId']),
    ...mapGetters('configs', ['currentServer']),
    ...mapGetters('session', {torrents: 'filteredTorrents'}),
    showTorrentDetails: {
      get: function ()
      {
        return Boolean(this.selectedTorrentId)
      },
      set: function ()
      {
        this.setSelectedTorrentId(null)
      }
    }
  },
}
</script>

<style>
.torrents-list {
  width: 100%;
}
</style>
