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
import TransmissionService from '../services/transmissionService';
import TransmissionServiceAlt from '../services/altService.js';

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
      altService: null,
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
    deactivateClient: function ()
    {
      this.altService.deactivate()
      // TransmissionService.getInstance().stopFetching();
      //clearInterval(this.interval)
    },
    activateClient: function ()
    {
      this.altService = new TransmissionServiceAlt(
        Object.assign({store: this.$store}, this.currentServer)
      )
      this.altService.activate()
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
