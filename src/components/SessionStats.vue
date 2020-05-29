<template>
  <div>
    <!-- TODO: improve UI -->
    <br>
    <strong>Torrent Count:</strong> {{stats.torrentCount}}
    <br>
    <strong>Uploaded:</strong> {{ currentStats.uploadedBytes | size }} ({{ cumulativeStats.uploadedBytes | size }} total)
    <br>
    <strong>Downloaded:</strong> {{ currentStats.downloadedBytes | size }} ({{ cumulativeStats.downloadedBytes | size }} total)
    <br>
    <strong>Running Time:</strong> {{ currentStats.secondsActive | timeInterval }} ({{ cumulativeStats.secondsActive | timeInterval }} total)
    <br>
    <strong>Program Started:</strong> {{cumulativeStats.sessionCount}} times
    <br>
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
