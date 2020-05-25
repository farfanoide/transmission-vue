<template>
  <div class="torrents-list">
    <torrent-row v-for="( torrent, index ) in torrents"
                 @show-details="showDetailsFor(torrent)"
                 :torrent="torrent"
                 :key="`torrent-row-${index}`">
    </torrent-row>
    <q-dialog v-model='showTorrentDetails'
              full-width
              full-height>
      <torrent-details :torrent="selectedTorrent"></torrent-details>
    </q-dialog>
  </div>
</template>

<script>

import { mapGetters, mapActions } from 'vuex'
import TorrentRow from './TorrentRow'
import TorrentDetails from './TorrentDetails'

export default {
  name: 'TorrentList',
  components:
  {
    TorrentDetails,
    TorrentRow,
  },
  data()
  {
    return {
      selectedTorrent: null,
    }
  },
  methods:
  {
    showDetailsFor: function (torrent)
    {
      console.log('dblclicked')
      this.selectedTorrent = torrent
    }
  },
  computed: {
    ...mapGetters('configs', [
      'currentServer',
    ]),
    ...mapGetters('session', {
      torrents: 'filteredTorrents'
    }),
    showTorrentDetails: {
      get:function ()
      {
        return Boolean(this.selectedTorrent)
      },
      set: function ()
      {
        this.selectedTorrent = null
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
