<template>
  <q-layout container class="bg-white">
    <template v-if="loading">
      <q-inner-loading>
        <q-spinner
          color="primary"
          size="3em"
          :thickness="2"
          />
      </q-inner-loading>
    </template>
    <template v-else>
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
              ↓{{ torrent.rateDownload | speedBps }} {{ torrent.sizeWhenDone - torrent.leftUntilDone | size }}
            </span>
            <span class="q-pa-sm">
              ↑{{ torrent.rateUpload | speedBps }} {{torrent.uploadedEver | size}}
            </span>
            <span class="q-pa-sm">
              <ratio-icon></ratio-icon> {{ torrent.uploadRatio | ratioString }}
            </span>
            <!-- <span class="q&#45;pa&#45;sm"> -->
            <!--   TODO: maybe add running time or date  added -->
            <!-- </span> -->
          </div>
          <div class="actions col-3 text-right">
            <!-- TODO: add priority -->
            <torrent-actions :torrent-id="torrent.id" :is-paused="torrent.isPaused()"></torrent-actions>
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
            <q-tab name="options" label="Options" icon="settings">
            </q-tab>
          </q-tabs>

        </div>
        <div class="col">
          <q-tab-panels v-model="tab"
                        animated
                        swipeable
                        vertical
                        transition-prev="jump-up"
                        transition-next="jump-down">

            <q-tab-panel name="info">
              <div class="text-h4 text-center q-mb-md">
                Info
              </div>
              <torrent-info :torrent="torrent"></torrent-info>
            </q-tab-panel>

            <q-tab-panel name="peers">
              <div class="text-h4 q-mb-md">Peers</div>
              <peers-list :peers="torrent.peers || []"></peers-list>
            </q-tab-panel>

            <q-tab-panel name="trackers">
              <div class="text-h4 q-mb-md">Trackers</div>
              <trackers-list :trackers="torrent.trackerStats"></trackers-list>
            </q-tab-panel>

            <q-tab-panel name="files">
              <div class="text-h4 q-mb-md">Files</div>
              <files-list :torrent="torrent"></files-list>
            </q-tab-panel>

            <q-tab-panel name="options">
              <div class="text-h4 q-mb-md">Options</div>
              <torrent-options :torrent="torrent"></torrent-options>
            </q-tab-panel>

          </q-tab-panels>
        </div>
      </div>
    </template>
  </q-layout>
</template>

<script>

import { mapActions, mapGetters, mapState } from 'vuex'

import FilesList from './FilesList'
import PeersList from './PeersList'
import RPCReference from '../lib/rpc'
import RatioIcon from './RatioIcon'
import Torrent from '../models/torrent'
import TorrentActions from './TorrentActions'
import TorrentInfo from './TorrentInfo'
import TorrentOptions from './TorrentOptions'
import TorrentProgressBar from './TorrentProgressBar'
import TrackersList from './TrackersList'

export default {
  name: 'TorrentDetails',
  components:
  {
    // TODO create individual componentts for each tab
    FilesList,
    PeersList,
    RatioIcon,
    TorrentActions,
    TorrentInfo,
    TorrentOptions,
    TorrentProgressBar,
    TrackersList,
  },
  props: ['initialtab'],
  data()
  {
    return {
      tab: 'info',
      torrent: null,
      loading: true,
    }
  },
  created()
  {
    this.tab = this.initialtab ? this.initialtab : this.tab
    this.fetchTorrentData().then(() => {
      this.loading = false
      this.interval = setInterval(this.fetchTorrentData.bind(this), 1000)
    })
  },
  beforeDestroy()
  {
    if (this.interval) clearInterval(this.interval)
  },
  methods:
  {
    ...mapActions('session', ['getTorrents']),
    fetchTorrentData: function ()
    {
      return this.client.get([this.selectedTorrentId], RPCReference.availableFields())
        .then(torrents => {
          (this.torrent == null)
            ? this.torrent = torrents[0]
            : this.torrent.update(torrents[0])
        })
    }
  },
  computed:
  {
    ...mapState('session', ['selectedTorrentId']),
    ...mapGetters('configs', ['client']),
  }
}
</script>
