<template>
  <div>
    <strong>
      {{torrent.name}}
    </strong>

    <strong>Details</strong>
    <dl>
      <dt>Size:</dt>
      <dd>{{torrent.totalSize|size}} ({{torrent.pieceCount}} @ {{torrent.pieceSize|size}})</dd>

      <dt>Location:</dt>
      <dd>{{torrent.downloadDir}}</dd>

      <dt>Hash:</dt>
      <dd>{{torrent.hashString}}</dd>

      <dt>Privacy:</dt>
      <dd>{{ torrent.isPrivate ? 'Private' : 'Public' }} torrent</dd>

      <dt>Origin:</dt>
      <dd>Created by {{torrent.creator}} on {{torrent.dateCreated|timestamp}}</dd>

      <dt>Comment:</dt>
      <dd>{{torrent.comment}}</dd>

    </dl>
    <strong>Activity</strong>
    <dl>
      <dt>Have:</dt>
      <dd>
      {{torrent.haveValid + torrent.haveUnchecked| size}} of {{torrent.sizeWhenDone | size}}
      ({{torrent.percentDone|fullPercentString}})
      <template v-if="torrent.haveUnverified">
        {{torrent.haveUnverified | size}} unverified
      </template>
      </dd>

      <dt>Availability:</dt>
      <dd>
      {{torrent.haveValid + torrent.haveUnchecked + torrent.desiredAvailable | fullPercentString}}
      </dd>

      <dt>Uploaded:</dt>
      <dd>
      {{torrent.uploadedEver | size}} (Ratio: {{torrent.uploadRatio | ratioString}})
      </dd>

      <dt>Downloaded:</dt>
      <dd>
      {{torrent.downloadedEver | size}}

      <template v-if="torrent.corruptEver">
        ({{torrent.corruptEver | size}} corrupt)
      </template>
      </dd>

      <dt>State:</dt>
      <dd>{{torrent.statusName}}</dd>

      <dt>Running Time: </dt>
      <dd>
      <template v-if="torrent.isDownloading() || torrent.isSeeding()">
        {{ Date.now() / 1000 - torrent.startDate | timeInterval }}
      </template>
      <template v-else>
        {{ torrent.statusName }}
      </template>
      </dd>

      <dt>Remaining Time: </dt>
      <dd>
      <template v-if="torrent.isDownloading()">
        {{torrent.eta | timeInterval}}
      </template>
      <template v-else>
        Unknown
      </template>
      </dd>

      <dt>Last Activity: </dt>
      <dd>{{ Date.now() / 1000 - torrent.activityDate | timeInterval }} ago</dd>

      <dt>Error:</dt>
      <dd>{{ torrent.hasErrors ? torrent.errorString : 'None'}}</dd>
      <dt>Magnet Link:</dt>
      <dd class="magnet-link" @click="copyMagnetToClipboard">
      <q-tooltip anchor="top middle" :offset="[30, 30]">
        Click to copy to clipboard
      </q-tooltip>
      {{ torrent.magnetLink }}
      <!-- TODO: add copy to clipboard -->
      </dd>
    </dl>
  </div>
</template>

<script>

import { copyToClipboard } from 'quasar'

export default {
  name: 'TorrentInfo',
  props: ['torrent'],
  methods:
  {
    copyMagnetToClipboard: function ()
    {
      copyToClipboard(this.torrent.magnetLink)
        .then(() => {
          this.$q.notify({ message: 'Magnet Link copied to clipboard'})
        })
        .catch(() => {
          this.$q.notify({
            color: 'negative',
            message: 'Couldnt copy Magnet Link to clipboard'
          })
        })
    }
  }
}
</script>

<style>
.magnet-link {
  word-wrap: break-word;
  cursor: pointer;
}
</style>
