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
      {{ $filters.size(currentStats.uploadedBytes) }} ({{ $filters.size(cumulativeStats.uploadedBytes) }} total)
      </dd>
      <dt>
      <strong>Ratio:</strong>
      </dt>
      <dd>
      {{ $filters.ratioString(currentStats.uploadedBytes / currentStats.downloadedBytes ) }}
      ({{ $filters.ratioString(cumulativeStats.uploadedBytes / cumulativeStats.downloadedBytes ) }} total)
      </dd>
      <dt>
      <strong>Downloaded:</strong>
      </dt>
      <dd>
      {{ $filters.size(currentStats.downloadedBytes ) }} ({{ $filters.size(cumulativeStats.downloadedBytes ) }} total)
      </dd>
      <dt>

      <strong>Running Time:</strong>
      </dt>
      <dd>
      {{ $filters.timeInterval(currentStats.secondsActive ) }} ({{ $filters.timeInterval(cumulativeStats.secondsActive ) }} total)
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
