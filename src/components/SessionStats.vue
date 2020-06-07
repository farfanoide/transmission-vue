<template>
  <div>
    <!-- TODO: improve UI -->
    <dl>
      <dt>
      <strong>Torrent Count:</strong>
      </dt>
      <dd>
      {{stats.torrentCount}}
      </dd>
      <dt>
      <strong>Uploaded:</strong>
      </dt>
      <dd>
      {{ currentStats.uploadedBytes | size }} ({{ cumulativeStats.uploadedBytes | size }} total)
      </dd>
      <dt>
      <strong>Ratio:</strong>
      </dt>
      <dd>
      {{ currentStats.uploadedBytes / currentStats.downloadedBytes | ratioString }}
      ({{ cumulativeStats.uploadedBytes / cumulativeStats.downloadedBytes | ratioString }} total)
      </dd>
      <dt>
      <strong>Downloaded:</strong>
      </dt>
      <dd>
      {{ currentStats.downloadedBytes | size }} ({{ cumulativeStats.downloadedBytes | size }} total)
      </dd>
      <dt>

      <strong>Running Time:</strong>
      </dt>
      <dd>
      {{ currentStats.secondsActive | timeInterval }} ({{ cumulativeStats.secondsActive | timeInterval }} total)
      </dd>
      <dt>
      <strong>Program Started:</strong>
      </dt>
      <dd>
      {{cumulativeStats.sessionCount}} times
      </dd>
    </dl>
    <q-separator spaced></q-separator>
    <!-- <q&#45;btn> -->
    <!-- TODO: add reset functionality -->
    <!--   Reset Statistics -->
    <!-- </q&#45;btn> -->
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'SessionStats',
  computed:
  {
    ...mapState('session', ['stats']),
    currentStats: function ()
    {
      return this.stats['current-stats']
    },
    cumulativeStats: function ()
    {
      return this.stats['cumulative-stats']
    }
  }
}
</script>
