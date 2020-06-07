<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import TransmissionFormatter from './lib/formatter'

export default {
  name: 'App',
  data()
  {
    return {
      title: 'TransmissionVue',
    }
  },
  meta()
  {
    return {
      // TODO: add setting for opt in/out
      title: this.getTitle
    }
  },
  computed:
  {
    ...mapState('configs', ['currentServer']),
    ...mapGetters('session', ['totalUploadRate', 'totalDownloadRate']),
    networkStats: function ()
    {
      return `(↓${TransmissionFormatter.speedBps(this.totalDownloadRate)} - ↑${TransmissionFormatter.speedBps(this.totalUploadRate)})`
    },
    getTitle: function ()
    {
      return this.currentServer ? `${this.networkStats} - ${this.title}` : this.title
    }
  }
}
</script>
