<template>
  <div class="torrent-row row shadow-transition"
       :class="{selected: isSelected, 'shadow-6': isSelected}"
       @click="toggleSelecedTorrent(torrent.id)">

    <div class="col-10 data-container">
      <div class="column">
        <div class="name">
          <strong>{{torrent.name}}</strong>
        </div>
        <div class="networking">
          {{torrentPresenter.peersInfo}}
          <template v-if="torrent.isActive() && !torrent.isChecking()">
            - {{torrentPresenter.networkStats}}
          </template>
        </div>
        <div class="progressbar">
          <q-linear-progress :color='progressColor' :value="torrent.percentDone" class="q-mt-md" size="10px">
          </q-linear-progress>
          <!-- TODO: check how to add  gradient to progressbars -->
          <!-- style="background: linear&#45;gradient(145deg,#1976d2 11%,#0f477e 75%)"  -->
          <!-- idea: backound should be full progressbar with gradient, while
            the filled progressbar has a css filter that changes background
            into black and white -->
        </div>
        <div class="file-stats">
          {{torrentPresenter.sizeWhenDone}}
        </div>
      </div>
    </div>
    <div class="col-2 actions-container">
      <torrent-actions :torrent="torrent" :torrentPresenter="torrentPresenter"></torrent-actions>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
import TorrentPresenter from '../lib/torrent_presenter'
import TorrentActions from './TorrentActions.vue'

export default {
  name: 'TorrentRow',
  props: ['torrent', 'enabledColumns'],
  components: {
    TorrentActions,
  },
  data()
  {
    return {
      statusColors: {
        STOPPED:       'blue-grey-6',
        CHECK_WAIT:    'blue-grey-6',
        CHECK:         'warning',
        DOWNLOAD_WAIT: 'teal-6',
        DOWNLOAD:      'blue',
        SEED_WAIT:     'cyan-6',
        SEED:          'positive',
        ISOLATED:      'blue-2',
      }
    }
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
    progressColor: function ()
    {
      return this.statusColors[this.torrent.status]
    },
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

.torrent-row .data-container {
  border-right: 1px solid rgba(0, 0, 0, 0.3);
}
</style>
