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
          <span :class="{'text-negative': torrent.hasErrors()}">
            {{torrent.hasErrors() ? torrent.errorString : torrentPresenter.peersInfo}}
          </span>
          <template v-if="torrent.isActive() && !torrent.isChecking()">
            - {{torrentPresenter.networkStats}}
          </template>
        </div>
        <div class="progressbar">
          <torrent-progress-bar :torrent="torrent"></torrent-progress-bar>
        </div>
        <div class="file-stats">
          {{torrentPresenter.progressInfo}}
          <template v-if="torrent.isDownloading()">
            - {{torrentPresenter.eta}} remaining
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
import TorrentPresenter from '../lib/torrent_presenter'
import TorrentActions from './TorrentActions'
import TorrentProgressBar from './TorrentProgressBar'

export default {
  name: 'TorrentRow',
  props: ['torrent'],
  components: {
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
    torrentPresenter: function ()
    {
      return new TorrentPresenter(this.torrent)
    },
    isSelected: function ()
    {
      return this.selectedTorrentsIds.includes(this.torrent.id)
    }
  }
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
