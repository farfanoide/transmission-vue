<template>
  <div class="q-pa-md">
    <!-- <q&#45;card class="q&#45;pa&#45;md" v&#45;for="torrent in torrents" :key="`torrent&#45;${torrent.name}`"> -->
    <!--   <dl> -->
    <!--     <dt>Name:</dt> -->
    <!--     <dd> -->
    <!--    {{torrent.name}}  -->
    <!--     </dd> -->
    <!--   </dl> -->
    <!--   <p> {{torrent.dateCreated}} </p> -->
    <!--   <p> {{torrent.sizeWhenDone}} </p> -->
    <!--   <p> {{torrent.percentDone}} </p> -->
    <!-- </q&#45;card> -->
    <q-table title="Torrents"
             :data="torrents"
             :columns="enabledColumns"
             row-key="name"
             />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'TorrentList',
  data()
  {
    return {
      enabledColumns: [
        {name: 'name', label: 'Name', field: row => row.name },
        {name: 'dateCreated', label: 'Date Created', field: row => row.dateCreated },
        {name: 'sizeWhenDone', label: 'Size When Done', field: row => row.sizeWhenDone },
        {name: 'percentDone', label: 'Percent Done', field: row => row.percentDone},
      ]
    }
  },
  computed: {
    ...mapState('configs', ['currentServer']),
    ...mapState('session', ['torrents']),
  }
}
</script>



