<template>
  <div>
    <div class="chart">
      <network-chart :downloadRate="totalDownloadRate" :uploadRate="totalUploadRate">
      </network-chart>
    </div>
    <div class="stats">
      ↓ {{ totalDownloadRate | speedBps }} ↑ {{ totalUploadRate | speedBps}}
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import TransmissionFormatter from '../lib/formatter'
import NetworkChart from './NetworkChart'

export default {
  name: 'NetworkStatus',
  components:
  {
    NetworkChart,
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
