<template>
  <div class="torrents-list">
    <torrent-row v-for="( torrent, index ) in torrents"
                 :torrent="torrent"
                 :key="`torrent-row-${index}`">
    </torrent-row>
  </div>
</template>

<script>

import { mapGetters } from 'vuex'
import TorrentRow from './TorrentRow'

export default {
  name: 'TorrentList',
  components: {
    TorrentRow
  },
  computed: {
    ...mapGetters('session', {
      torrents: 'filteredTorrents'
    }),
  },
}
</script>



<style>
.torrents-list {
  width: 100%;
}
</style>
