<template>
  <div class="column">
    <div class="stats row justify-around items-center">
      <div>
        <q-btn :color="altSpeedEnabled ? 'negative' : 'positive'" size="sm">
          ↓ {{ $filters.speedBps(totalDownloadRate) }}
        </q-btn>
      </div>
      <div>
        <q-btn color="blue" size="sm">
          ↑ {{ $filters.speedBps(totalUploadRate) }}
        </q-btn>
      </div>

      <speed-setting></speed-setting>
    </div>
    <div class="chart">
      <network-chart :downloadRate="totalDownloadRate"
         :uploadRate="totalUploadRate"
         :bandwidthLimited="altSpeedEnabled">
      </network-chart>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import NetworkChart from './NetworkChart'
import SpeedSetting from './SpeedSetting'

export default {
  name: 'NetworkStatus',
  components:
  {
    NetworkChart,
    SpeedSetting,
  },
  computed: {
    ...mapGetters('session', ['totalUploadRate', 'totalDownloadRate', 'altSpeedEnabled'])
  },
}
</script>
