<template>
  <div style="width: 100%">
    <table>
      <thead>
        <tr>
          <th v-for="(column, index) in enabledColumns"
              :key="`col-${index}`">
            {{column|colname}}
          </th>
        </tr>
      </thead>

      <tbody>
        <torrent-row v-for="( torrent, index ) in torrents"
                     :torrent="torrent"
                     :enabledColumns="enabledColumns"
                     :key="`torrent-row-${index}`">
        </torrent-row>
      </tbody>
    </table>

  </div>
</template>

<script>

import { mapState, mapActions } from 'vuex'
import TorrentRow from './TorrentRow'
import RPCReference from  '../lib/rpc'

export default {
  name: 'TorrentList',
  components: {
    TorrentRow
  },
  data()
  {
    return {
      //TODO: add enabledColumns to config
      enabledColumns: [
        'name',
        'percentDone',
        'dateCreated',
        'sizeWhenDone',
        'eta',
      ]
    }
  },
  computed: {
    ...mapState('configs', ['currentServer']),
    ...mapState('session', ['torrents']),
  },
  filters: {
    colname: function (column)
    {
      return RPCReference.columnName(column)
    }
  }
}
</script>



