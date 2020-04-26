<template>
  <div class="torrent-row row">
    <div class="col-10 data-container">
      <div class="column">
        <div class="name">
          <strong>{{torrent.name}}</strong>
        </div>
        <div class="networking">
          <template v-if="torrent.isDownloading()">
            {{torrentPresenter.downloadingPeersInfo}} - {{torrentPresenter.networkStats}}
          </template>
          <template v-else>
            {{torrentPresenter.statusName}}
          </template>
        </div>
        <div class="progressbar">
          <q-linear-progress :value="torrent.percentDone" class="q-mt-md" />
        </div>
        <div class="file-stats">
          {{torrentPresenter.sizeWhenDone}}
        </div>
      </div>
    </div>
    <div class="col-2 actions-container">
      actions
    </div>
  </div>
</template>

<script>
import TorrentPresenter from '../lib/torrent_presenter'

export default {
  name: 'TorrentRow',
  props: ['torrent', 'enabledColumns'],
  computed:
  {
    torrentPresenter: function ()
    {
      return new TorrentPresenter(this.torrent)
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

.torrent-row .data-container,
.torrent-row .actions-container {
  padding: .5em;
}

.torrent-row .data-container {
  border-right: 1px solid rgba(0, 0, 0, 0.3);
}
</style>
