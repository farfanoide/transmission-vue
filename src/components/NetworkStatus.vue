<template>
  <div class="column">
    <div class="stats row justify-around items-center">
      <div>
        ↓ {{ totalDownloadRate | speedBps }}
      </div>
      <div>
        ↑ {{ totalUploadRate | speedBps}}
      </div>

        <speed-setting></speed-setting>
    </div>
    <div class="chart">
      <network-chart :downloadRate="totalDownloadRate" :uploadRate="totalUploadRate">
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
    ...mapGetters('session', ['totalUploadRate', 'totalDownloadRate'])
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
