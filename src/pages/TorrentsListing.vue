<template>
  <q-page class="flex">
    <torrent-list></torrent-list>
    <!-- bottom sheet -->
    <multi-torrent-actions></multi-torrent-actions>
  </q-page>
</template>

<script>
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex'
import TorrentList from '../components/TorrentList'
import MultiTorrentActions from '../components/MultiTorrentActions'
import TransmissionService from '../services/transmission_service';

export default {
  name: 'TorrentsListing',
  components: {
    TorrentList,
    MultiTorrentActions
  },
  data()
  {
    return {
      service: null,
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
      this.service.deactivate()
    },
    activateClient: function ()
    {
      this.service = new TransmissionService(
        Object.assign({store: this.$store}, this.currentServer)
      )
      this.service.activate()
    }
  },
  computed:
  {
    ...mapGetters('configs', ['hasDefaultServer']),
    ...mapState('configs', ['currentServer']),
  }
}
</script>
