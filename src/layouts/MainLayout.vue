<template>
  <q-layout view="hhh lpR fFf">
    <q-header reveal elevated class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar size="40px" @click="left = !left">
            <img src="~assets/logo.png" />
          </q-avatar>
        </q-toolbar-title>
        <router-link :to="{name: 'servers'}">
          <q-btn round flat color="white" icon='settings'></q-btn>
        </router-link>
        <q-btn round flat color="yellow" icon='build' @click="settingsModalStatus.opened = true"></q-btn>
      </q-toolbar>
    </q-header>
    <general-settings 
      v-if="settingsLoaded"
      v-bind:status='settingsModalStatus'
      v-bind:clientSettings='settings'
      ></general-settings>
    <q-drawer v-model="left" side="left" elevated content-class="bg-primary text-white">
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
import GeneralSettings from '../components/GeneralSettings'
import { mapState } from 'vuex'
import TransmissionService from '../services/transmission_service'
import ClientSettings from '../models/client-settings'

export default {
  components:
  {
    NetworkStatus,
    TorrentFilters,
    TorrentSearch,
    GeneralSettings,
  },
  data () {
    return {
      left: true,
      settingsModalStatus: { "opened": false },
    }
  },
  created() {
    // if session settings state is empty. Fetch and set in store.
    if(!this.settingsLoaded) {
      (new TransmissionService({store: this.$store}, this.currentServer))
        .fetchClientSettings()
    }
  },
  computed:
  {
    ...mapState('configs', ['currentServer']),
    ...mapState('session', ['settings']),
    settingsLoaded: function() {
      /**
       * @returns {boolean} Whether the settings
       * prop in the state is empty or not.
       * 
       * @TODO Maybe switch to a getter in the store?
       */
      return !!this.settings
    }
  }
}
</script>
