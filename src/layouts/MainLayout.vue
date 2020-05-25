<template>
  <q-layout view="HHH LpR fFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar size="40px" @click="left = !left">
            <img src="~assets/logo.png" />
          </q-avatar>
        </q-toolbar-title>

        <template v-if="currentServer">
          <add-torrent></add-torrent>
        </template>

        <router-link :to="{name: 'servers'}">
          <q-btn round flat color="white" icon='settings'></q-btn>
        </router-link>
        <general-settings></general-settings>
      </q-toolbar>
    </q-header>
    <q-drawer v-model="left" side="left" content-class="bg-primary text-white">

      <template v-if="currentServer">
        <network-status></network-status>
        <div class="q-pa-xs">
          <torrent-filters></torrent-filters>
          <torrent-sorting></torrent-sorting>
        </div>
      </template>

    </q-drawer>
    <q-page-container>

      <router-view></router-view>

    </q-page-container>
  </q-layout>
</template>

<script>
import NetworkStatus from '../components/NetworkStatus'
import TorrentFilters from '../components/TorrentFilters'
import GeneralSettings from '../components/GeneralSettings'
import TorrentSorting from '../components/TorrentSorting'
import AddTorrent from '../components/AddTorrent'
import { mapState } from 'vuex'

export default {
  components:
  {
    AddTorrent,
    NetworkStatus,
    TorrentFilters,
    GeneralSettings,
    TorrentSorting,
  },
  data () {
    return {
      left: true,
    }
  },
  computed:
  {
    ...mapState('configs', ['currentServer']),
  }
}
</script>
