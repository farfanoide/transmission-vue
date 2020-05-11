<template>
  <div class="column">
    <div class="stats row justify-around items-center">
      <div>
        <q-btn :color="altSpeedEnabled ? 'negative' : 'positive'" size="sm">
          ↓ {{ totalDownloadRate | speedBps }}
        </q-btn>
      </div>
      <div>
        <q-btn color="blue" size="sm">
          ↑ {{ totalUploadRate | speedBps}}
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
import TransmissionFormatter from '../lib/formatter'
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
  filters:
  {
    speedBps: function (bytes)
    {
      return TransmissionFormatter.speedBps(bytes)
    }
  }

}
</script>
