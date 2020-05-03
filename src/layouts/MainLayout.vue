<template>
  <q-layout view="hhh lpR fFf">

    <q-header reveal elevated class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar size="40px">
            <img src="~assets/logo.png" />
          </q-avatar>


        </q-toolbar-title>
        <torrent-filters></torrent-filters>
        <torrent-search></torrent-search>

        <!-- TODO: only show this if a server is actually selected -->
        <network-status></network-status>
        <speed-setting></speed-setting>
        <router-link :to="{name: 'servers'}">
          <q-btn round flat color="white" icon='settings'></q-btn>
        </router-link>

      </q-toolbar>
    </q-header>

    <!-- <q&#45;drawer v&#45;model="left" side="left" elevated> -->
    <!--   <!&#45;&#45; drawer content &#45;&#45;> -->
    <!-- </q&#45;drawer> -->

    <q-page-container>
      <router-view></router-view>
    </q-page-container>

  </q-layout>
</template>

<script>
import NetworkStatus from '../components/NetworkStatus'
import SpeedSetting from '../components/SpeedSetting'
import TorrentSearch from '../components/TorrentSearch'
import TorrentFilters from '../components/TorrentFilters'

export default {
  components:
  {
    NetworkStatus,
    SpeedSetting,
    TorrentFilters,
    TorrentSearch,
  },
  data () {
    return {
      left: false
    }
  }
}
</script>
