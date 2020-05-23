<template>
  <q-btn :loading="loading" icon='speed' flat round :class="iconClass" @click="requestToggle">
    <q-tooltip anchor="bottom left" :offset="[30, 30]">
      {{message}}
    </q-tooltip>

  </q-btn>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'SpeedSetting',
  data()
  {
    return {
      loading: false,
    }
  },
  methods:
  {
    ...mapActions('session', ['toggleSpeedSetting']),
    requestToggle: function ()
    {
      this.loading = true

      setTimeout(() => {
        this.toggleSpeedSetting()
          .finally(() => this.loading = false)
      }, 500)
    },
  },
  computed:
  {
    ...mapState('session', ['data']),
    statusText: function ()
    {
      return this.altSpeedEnabled ? 'enabled' : 'disabled'
    },
    message: function ()
    {
      return  `Alternative speed ${this.statusText}`
    },
    altSpeedEnabled: function ()
    {
      return this.data['alt-speed-enabled']
    },
    iconClass: function ()
    {
      return `alternative-speed-${this.statusText}`
    }
  },
}
</script>

<style>
.alternative-speed-enabled {
  color: var(--q-color-negative);
}

.alternative-speed-disabled {
  color: var(--q-color-positive);
}

</style>
