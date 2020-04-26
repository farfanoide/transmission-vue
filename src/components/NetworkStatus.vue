<template>
  <div>
    ↓ {{ totalDownloadRate | speedBps }} ↑ {{ totalUploadRate | speedBps}}
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import TransmissionFormatter from '../lib/formatter'

export default {
  name: 'NetworkStatus',
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
