<template>
  <q-layout view="HHH LpR fFf">

    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title>

          <q-avatar size="40px" @click="left = !left">
            <img src="~assets/logo.png" />
          </q-avatar>

        </q-toolbar-title>
        <router-link :to="{name: 'servers'}">
          <q-btn round flat color="white" icon='settings'></q-btn>
        </router-link>

      </q-toolbar>
    </q-header>

    <q-drawer v-model="left" side="left" content-class="bg-primary text-white">
      <template v-if="currentServer">
        <network-status></network-status>
        <torrent-search></torrent-search>
        <torrent-filters></torrent-filters>
      </template>
    </q-drawer>

    <q-page-container>
      <router-view></router-view>
    </q-page-container>

  </q-layout>
</template>

<script>
import NetworkStatus from '../components/NetworkStatus'
import TorrentSearch from '../components/TorrentSearch'
import TorrentFilters from '../components/TorrentFilters'
import { mapState } from 'vuex'

export default {
  components:
  {
    NetworkStatus,
    TorrentFilters,
    TorrentSearch,
  },
  data () {
    return {
      left: true
    }
  },
  computed:
  {
    ...mapState('configs', ['currentServer'])
  }
}
</script>
