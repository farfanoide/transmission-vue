<template>
  <tr>
    <td v-for="(column, index) in enabledColumns"
        :key="`col-${column}-${index}`">
      {{tp[column]}}
    </td>
  </tr>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import TorrentPresenter from '../lib/torrent_presenter'

//TODO: add enabledColumns to config
export default {
  name: 'TorrentRow',
  props: ['torrent', 'enabledColumns'],
  computed: {
    tp: function ()
    {
      return TorrentPresenter(this.torrent)
    }
  }
}
</script>


