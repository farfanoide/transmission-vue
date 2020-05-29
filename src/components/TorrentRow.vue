<template>
  <div class="torrent-row row shadow-transition"
       @dblclick="$emit('show-details')"
       :class="{selected: isSelected, 'shadow-6': isSelected}">

    <div class="col-12 data-container">
      <div class="column">
        <div class="row">
          <div class="col-8 name text-no-wrap"
               @click="toggleSelecedTorrent(torrent.id)">
            <strong>{{torrent.name}}</strong>
          </div>
          <div class="col-4">
            <torrent-actions :torrentId="torrent.id"
               :isPaused="torrent.isPaused()">
            </torrent-actions>
          </div>
        </div>
        <div class="networking">
          <span v-if="torrent.hasErrors()"
                :class="{'text-negative': torrent.hasErrors()}">
            {{torrent.errorString}}
          </span>
          <span v-else>
            {{torrent.status | statusName}}
          </span>
          <span v-if="torrent.isDownloading()">
            {{downloadingPeersInfo}}
          </span>
          <span v-if="torrent.isSeeding()">
            {{seedingPeersInfo}}
          </span>
          <span v-if="torrent.isActive() && torrent.isDownloading()">
            ↓ {{torrent.rateDownload | speedBps}}
          </span>
          <span v-if="torrent.isActive() && !torrent.isChecking()">
            ↑ {{torrent.rateUpload | speedBps}}
          </span>
          <span v-if="torrent.isChecking()">
            ({{ this.torrent.recheckProgress | fullPercentString }} tested)
          </span>
        </div>
        <div class="progressbar">
          <torrent-progress-bar :torrent="torrent"></torrent-progress-bar>
        </div>
        <div class="file-stats">
          <template v-if="torrent.isDownloading()">
            <span class="downloaded">
              {{torrent.sizeWhenDone - torrent.leftUntilDone | size}} of {{ torrent.sizeWhenDone | size }}
            </span>
            -
            <span class="eta">
              {{torrent.eta | timeInterval}} remaining
            </span>
          </template>
          <template v-if="torrent.isSeeding()">
            <span class="uploaded">
              {{ torrent.sizeWhenDone | size }}, uploaded {{ torrent.uploadedEver | size}}
            </span>
            <span class="ratio">
              (<ratio-icon></ratio-icon> {{ torrent.uploadRatio | ratioString }})
            </span>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
import TorrentActions from './TorrentActions'
import TorrentProgressBar from './TorrentProgressBar'
import RatioIcon from './RatioIcon'

export default {
  name: 'TorrentRow',
  props: ['torrent'],
  components: {
    RatioIcon,
    TorrentActions,
    TorrentProgressBar,
  },
  methods:
  {
    ...mapMutations('session', {
      // TODO: add `shift` modifier
      toggleSelecedTorrent: 'TOGGLE_SELECED_TORRENT'
    }),
  },
  computed:
  {
    ...mapGetters('session', ['selectedTorrentsIds']),
    isSelected: function ()
    {
      return this.selectedTorrentsIds.includes(this.torrent.id)
    },
    downloadingPeersInfo: function ()
    {
      // TODO: review this method
      if (this.torrent.peersConnected && this.torrent.webseedsSendingToUs)
      {
        // happy path, we have both peers and webseed available
        return `from ${this.torrent.peersSendingToUs} of ${this.torrent.peersConnected} peer${this.torrent.peersConnected === 1 ? '' : 's'} and ${this.torrent.webseedsSendingToUs} webseed${this.torrent.webseedsSendingToUs > 1 ? 's' : ''}`
      }
      if (this.torrent.webseedsSendingToUs)
      {
        // we have only webseeds
        return `from ${this.torrent.webseedsSendingToUs} webseed${this.torrent.webseedsSendingToUs > 1 ? 's' : ''}`
      }
      // we have only peers
      return `from ${this.torrent.peersSendingToUs} of ${this.torrent.peersConnected} peer${this.torrent.peersConnected === 1 ? '' : 's'}`
    },
    seedingPeersInfo: function ()
    {
      // TODO: add localization to use proper pluralization
      return `to ${this.torrent.peersGettingFromUs} of ${this.torrent.peersConnected} ${this.torrent.peersConnected > 1 ? 'peer' : 'peers'  }`
    },
  },
}
</script>


<style>
.torrent-row {
  margin: 1em;
  border: 1px solid rgba(0, 0, 0, 0.3);
  background: rgba(245, 245, 245, 0.61);
  border-radius: .2em;
}

.torrent-row.selected {
  background: rgba(245, 245, 245, 1);
  border-color: var(--q-color-positive);
}

.torrent-row .data-container,
.torrent-row .actions-container {
  padding: .5em;
}

.torrent-row .name {
  overflow: hidden;
}

.torrent-row .name:hover {
  cursor: pointer
}
</style>
