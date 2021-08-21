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
          <q-btn icon="add" @click="showAddTorrent = !showAddTorrent" flat round>
          </q-btn>
        </template>

        <router-link :to="{name: 'servers'}">
          <q-btn round flat color="white" icon='settings'></q-btn>
        </router-link>
        <general-settings></general-settings>
      </q-toolbar>
    </q-header>
    <q-drawer v-model="left" side="left" class="bg-primary text-white">

      <template v-if="currentServer">
        <network-status></network-status>
        <div class="q-pa-xs">
          <q-tabs v-model="sidebarTab"
                  dense
                  align="justify"
                  :breakpoint="0">
            <q-tab name="filters" icon="filter_list">

              <q-tooltip anchor="top middle" :offset="[30, 30]">
                Filters and Sorting
              </q-tooltip>
            </q-tab>
            <q-tab name="stats" icon="timeline">
              <q-tooltip anchor="top middle" :offset="[30, 30]">
                Session Statistics
              </q-tooltip>
            </q-tab>
          </q-tabs>

          <q-tab-panels v-model="sidebarTab" animated class="bg-transparent">
            <q-tab-panel name="filters">
              <torrent-filters></torrent-filters>
              <torrent-sorting></torrent-sorting>
            </q-tab-panel>

            <q-tab-panel name="stats">
              <session-stats></session-stats>
            </q-tab-panel>

          </q-tab-panels>
        </div>
      </template>

    </q-drawer>
    <q-page-container>

      <router-view></router-view>

    </q-page-container>
    <q-dialog v-model="showAddTorrent">
      <add-torrent></add-torrent>
    </q-dialog>
  </q-layout>
</template>

<script>
import NetworkStatus from '../components/NetworkStatus'
import TorrentFilters from '../components/TorrentFilters'
import GeneralSettings from '../components/settings/GeneralSettings'
import TorrentSorting from '../components/TorrentSorting'
import AddTorrent from '../components/AddTorrent'
import SessionStats from '../components/SessionStats'
import { mapState } from 'vuex'

export default {
  components:
  {
    AddTorrent,
    NetworkStatus,
    SessionStats,
    TorrentFilters,
    GeneralSettings,
    TorrentSorting,
  },
  data () {
    return {
      left: true,
      sidebarTab: 'filters',
      showAddTorrent: false,
    }
  },
  computed:
  {
    ...mapState('configs', ['currentServer']),
  }
}
</script>
