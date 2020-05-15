<template>
  <q-layout container class="bg-white">
    <div class="row">
      <div class="col-2">

        <q-tabs v-model="tab" vertical class="text-teal">
          <q-tab name="info" label="Info" icon="info">
          </q-tab>
          <q-tab name="peers" label="Peers" icon="people">
          </q-tab>
          <q-tab name="trackers" label="Trackers" icon="settings_input_antenna">
          </q-tab>
          <q-tab name="files" label="Files" icon="file_copy">
          </q-tab>
        </q-tabs>

      </div>
      <div class="col">
        <q-tab-panels v-model="tab"
                      animated
                      swipeable
                      vertical
                      transition-prev="jump-up"
                      transition-next="jump-up">

          <q-tab-panel name="info">
            <div class="text-h4 text-center q-mb-md">
              Info
            </div>
            <torrent-info :torrent="torrent"></torrent-info>
          </q-tab-panel>

          <q-tab-panel name="peers">
            <div class="text-h4 q-mb-md">Peers</div>
            <peers-list :peers="torrent.peers"></peers-list>
          </q-tab-panel>

          <q-tab-panel name="trackers">
            <div class="text-h4 q-mb-md">Trackers</div>
            <trackers-list :trackers="torrent.trackerStats"></trackers-list>
          </q-tab-panel>

          <q-tab-panel name="files">
            <div class="text-h4 q-mb-md">Files</div>
            <p> Under construction </p>
          </q-tab-panel>

        </q-tab-panels>
      </div>
    </div>
  </q-layout>
</template>

<script>

import { mapGetters } from 'vuex'
import TrackersList from './TrackersList'
import PeersList from './PeersList'
import TorrentInfo from './TorrentInfo'

export default {
  name: 'TorrentDetails',
  components:
  {
    // TODO create individual componentts for each tab
    PeersList,
    TrackersList,
    TorrentInfo,
  },
  props: ['torrent', 'initialtab'],
  data()
  {
    return {
      tab: 'info',
    }
  },
  created()
  {
    this.tab = this.initialtab ? this.initialtab : this.tab
  },
  computed:
  {

  },
}
</script>
