<template>
  <q-select v-model="priority"
            :options="options"
            :loading="loading">
  </q-select>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'TorrentPriority',
  props: ['torrent'],
  // TODO: maybe accept only torrent bandwidthPriority?
  data()
  {
    return {
      loading: false,
      options: [
        {
          label: 'High',
          value: 1,
        },
        {
          label: 'Normal',
          value: 0,
        },
        {
          label: 'Low',
          value: -1,
        },
      ]
    }
  },
  computed:
  {
    ...mapGetters('configs', ['client']),
    priority:
    {
      get: function ()
      {
        return this.options.find(option => option.value === this.torrent.bandwidthPriority)
      },
      set: function ({ value })
      {
        this.client.set([this.torrent.id], { bandwidthPriority: value })
          .finally(() => this.loading = false)
      }
    }
  }
}
</script>
