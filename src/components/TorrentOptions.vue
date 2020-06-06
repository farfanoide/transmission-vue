<template>
  <div>
    <h1>Torrent Options</h1>
    <dl>
      <dt>Priority</dt>
      <dd>
      <q-select v-model="bandwidthPriority"
                :options="bandwidthPriorityOptions"
                :loading="bandwidthPriorityLoading">
      </q-select>
      </dd>
    </dl>
  </div>

</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'TorrentOptions',
  props: ['torrent'],
  data()
  {
    return {
      bandwidthPriorityLoading: false,
      bandwidthPriorityOptions: [
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
    bandwidthPriority:
    {
      get: function ()
      {
        return this.bandwidthPriorityOptions.find(option => option.value === this.torrent.bandwidthPriority)
      },
      set: function ({ value })
      {
        this.client.set([this.torrent.id], { bandwidthPriority: value })
          .finally(() => this.bandwidthPriorityLoading = false)
      }
    }
  }
}
</script>
