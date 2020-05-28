<template>
  <q-layout container class="bg-white">
    <div class="q-px-lg">
      <div class="row">
        <div class="name">
          <h5 class="q-my-sm">
            {{torrent.name}}
          </h5>
        </div>
      </div>
      <div class="row justify-between">
        <div class="short-stats col">
          <span class="q-pa-sm">
            ↓{{torrent.rateDownload|speedBps}} {{torrent.sizeWhenDone - torrent.leftUntilDone | size}}
          </span>
          <span class="q-pa-sm">
            ↑{{torrent.rateUpload|speedBps}} {{torrent.uploadedEver | size}}
          </span>
          <span class="q-pa-sm">
            o{{torrent.uploadRatio}}
          </span>
          <!-- <span class="q&#45;pa&#45;sm"> -->
          <!--   TODO: maybe add running time or date  added -->
          <!-- </span> -->
        </div>
        <div class="actions col-3 text-right">
          <!-- TODO: add priority -->
          <torrent-actions :torrent="torrent"></torrent-actions>
        </div>
      </div>
      <div>
        <torrent-progress-bar :torrent="torrent" size="3px" :show-icon="true"></torrent-progress-bar>
      </div>
    </div>

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
            <files-list :files="torrent.files"
                 :file-stats="torrent.fileStats">
            </files-list>
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
import FilesList from './FilesList'
import TorrentInfo from './TorrentInfo'
import TorrentProgressBar from './TorrentProgressBar'
import TransmissionFormatter from '../lib/formatter'
import TorrentActions from './TorrentActions'

export default {
  name: 'TorrentDetails',
  components:
  {
    // TODO create individual componentts for each tab
    FilesList,
    PeersList,
    TorrentActions,
    TorrentInfo,
    TorrentProgressBar,
    TrackersList,
  },
  props: ['torrent', 'initialtab'],
  data()
  {
    return {
      tab: 'files',
    }
  },
  created()
  {
    this.tab = this.initialtab ? this.initialtab : this.tab
  },
  computed:
  {

  },
  filters:
  {
    speedBps: function (bytes)
    {
      return TransmissionFormatter.speedBps(bytes)
    },
    size: function (bytes)
    {
      return TransmissionFormatter.size(bytes)
    }
  }

}
</script>
