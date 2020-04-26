<template>
  <q-btn icon='speed' flat round :class="iconClass">
    <q-tooltip anchor="bottom left" :offset="[30, 30]">
      {{message}}
    </q-tooltip>

  </q-btn>
</template>

<script>
import { mapState } from 'vuex'
import TransmissionFormatter from '../lib/formatter'

export default {
  name: 'SpeedSetting',
  computed:
  {
    ...mapState('session', ['data']),
    message: function ()
    {
      return  `Alternative speed ${this.altSpeedEnabled ? 'enabled' : 'disabled'}`
    },
    altSpeedEnabled: function ()
    {
      return this.data['alt-speed-enabled']
    },
    iconClass: function ()
    {
      return `alternative-speed-${this.altSpeedEnabled ? 'enabled' : 'disabled'}`
    }
  },
}
</script>

<style>
.alternative-speed-enabled {
  color: var(--q-color-negative);
  /* text-shadow: 1px 0 3px var(--q-color-negative); */
}

.alternative-speed-disabled {
  color: var(--q-color-positive);
  /* text-shadow: 1px 0 2px var(--q-color-positive); */
}

</style>
