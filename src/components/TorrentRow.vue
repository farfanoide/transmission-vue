<template>
  <tr>
    <td v-for="(column, index) in enabledColumns"
        :key="`col-${column}-${index}`">
      {{torrentPresenter[column]}}
    </td>
  </tr>
</template>

<script>
import TorrentPresenter from '../lib/torrent_presenter'

export default {
  name: 'TorrentRow',
  props: ['torrent', 'enabledColumns'],
  computed:
  {
    torrentPresenter: function ()
    {
      return new TorrentPresenter(this.torrent)
    }
  }

}
</script>


