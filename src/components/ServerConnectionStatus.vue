<template>
  <div>
    <q-btn class="gt-xs"
           size="12px"
           flat dense round
           @click="checkConnection"
           :icon="connectionIcon">
      <q-tooltip anchor="top middle" :offset="[30, 30]">
        {{this.tooltipMessage}}
      </q-tooltip>
    </q-btn>
    <label v-if="this.withLabel">{{this.tooltipMessage}}</label>
  </div>
</template>

<script>
import TransmissionClient from '../services/transmission.js'

export default {
  name: 'ServerConnectionStatus',
  data()
  {
    return {
      connection: null,
      status: 'initial',
      icons: {
        initial: 'link',
        success: 'done',
        error: 'link_off',
        loading: 'more_horiz',
      },
      messages: {
        initial: 'Check connection to the server',
        success: 'Connection successful',
        error: 'Error connecting, check your settings',
        loading: 'Loading',
      }
      // TODO: add colors and animations
    }
  },
  props: ['server', 'with-label'],
  methods: {
    checkConnection()
    {
      this.status = 'loading'
      this.client.session()
        .then((resp) => {
          this.status = 'success'
        })
        .catch(error => {
          this.status = 'error'
        })
    },
  },
  computed:
  {
    connectionIcon: function ()
    {
      return this.icons[this.status]
    },
    connectionLabel: function ()
    {
      return this.withLabel ? this.tooltipMessage : ''
    },
    tooltipMessage: function ()
    {
      return this.messages[this.status]
    },
    client: function ()
    {
      return new TransmissionClient(this.server)
    }
  }
}
</script>
