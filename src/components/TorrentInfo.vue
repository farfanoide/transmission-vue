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

      hardcoded
      <dt>Uploaded:</dt>
      <!-- <dd>147.5 kB (Ratio: 0.00) </dd> -->
      <dd>
      {{torrent.uploadedEver | size}} (Ratio: {{torrent.uploadRatio | ratioString}})
      </dd>

      <dt>Downloaded:</dt>
      <!-- <dd>41.5 MB (3.14 MB corrupt) </dd> -->
      <dd>
      {{torrent.downloadedEver | size}}

      <template v-if="torrent.corruptEver">
        ({{torrent.corruptEver | size}} corrupt)
      </template>
      </dd>

      <dt>State:</dt>
      <dd>{{torrent.statusName}}</dd>

      <dt>Running Time: </dt>
      <dd> TODO </dd>

      <dt>Remaining Time: </dt>
      <dd>Unknown TODO</dd>

      <dt>Last Activity: </dt>
      <dd>{{ torrent.activityDate | timeInterval }}</dd>

      <dt>Error:</dt>
      <dd>{{ torrent.hasErrors ? torrent.errorString : 'None'}}</dd>
    </dl>
  </div>
</template>

<script>
export default {
  name: 'TorrentInfo',
  props: ['torrent'],
}
</script>

