<template>
  <div>
    <strong>
      {{torrent.name}}
    </strong>

    <strong>Details</strong>
    <dl>
      <dt>Size:</dt>
      <dd>{{ $filters.size(torrent.totalSize) }} ({{torrent.pieceCount}} @ {{ $filters.size(torrent.pieceSize) }})</dd>

      <dt>Location:</dt>
      <dd>{{torrent.downloadDir}}</dd>

      <dt>Hash:</dt>
      <dd>{{torrent.hashString}}</dd>

      <dt>Privacy:</dt>
      <dd>{{ torrent.isPrivate ? 'Private' : 'Public' }} torrent</dd>

      <dt>Origin:</dt>
      <dd>Created by {{torrent.creator}} on {{ $filters.timestamp(torrent.dateCreated) }}</dd>

      <dt>Comment:</dt>
      <dd>{{torrent.comment}}</dd>

    </dl>
    <strong>Activity</strong>
    <dl>
      <dt>Have:</dt>
      <dd>
      {{ $filters.size(torrent.haveValid + torrent.haveUnchecked) }} of {{ $filters.size(torrent.sizeWhenDone) }}
      ({{ $filters.fullPercentString(torrent.percentDone) }})
      <template v-if="torrent.haveUnverified">
        {{ $filters.size(torrent.haveUnverified) }} unverified
      </template>
      </dd>

      <dt>Availability:</dt>
      <dd>
      {{ $filters.fullPercentString(torrent.haveValid + torrent.haveUnchecked + torrent.desiredAvailable) }}
      </dd>

      <dt>Uploaded:</dt>
      <dd>
      {{ $filters.size(torrent.uploadedEver) }} (Ratio: {{ $filters.ratioString(torrent.uploadRatio) }})
      </dd>

      <dt>Downloaded:</dt>
      <dd>
      {{ $filters.size(torrent.downloadedEver) }}

      <template v-if="torrent.corruptEver">
        ({{ $filters.size(torrent.corruptEver) }} corrupt)
      </template>
      </dd>

      <dt>State:</dt>
      <dd>{{torrent.statusName}}</dd>

      <dt>Running Time: </dt>
      <dd>
      <template v-if="torrent.isDownloading() || torrent.isSeeding()">
        {{ $filters.timeInterval(Date.now() / 1000 - torrent.startDate) }}
      </template>
      <template v-else>
        {{ torrent.statusName }}
      </template>
      </dd>

      <dt>Remaining Time: </dt>
      <dd>
      <template v-if="torrent.isDownloading()">
        {{ $filters.timeInterval(torrent.eta) }}
      </template>
      <template v-else>
        Unknown
      </template>
      </dd>

      <dt>Last Activity: </dt>
      <dd>{{ $filters.timeInterval(Date.now() / 1000 - torrent.activityDate) }} ago</dd>

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
