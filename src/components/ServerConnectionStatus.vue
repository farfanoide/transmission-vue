<template>
  <div @click="checkConnection">
    <q-btn size="sm" flat round :icon="connectionIcon">
      <q-tooltip anchor="top middle" :offset="[30, 30]">
        {{this.message}}
      </q-tooltip>
    </q-btn>
    <label v-if="this.withLabel">{{this.message}}</label>
  </div>
</template>

<script>
import TransmissionClient from '../services/transmission_client'

export default {
  name: 'ServerConnectionStatus',
  data()
  {
    return {
      connection: null,
      status: 'initial',
      //TODO: make status reactive by props, ie: if server data changes we
      // should know our config is no longer valid and status should be reset
      // to initial
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
        .then(resp => {   this.status = 'success' })
        .catch(error => { this.status = 'error' })
    },
  },
  mounted()
  {
    if (this.server) { this.checkConnection() }
  },
  // TODO: try and check when server data changes, however if for example
  // serverForm is being used, its very uncomfortable getting the http basic auth
  // prompt on every keystroke so maybe checkConnection on 'ENTER' or on 'SUBMIT'
  // watch:
  // {
  //   server:
  //   {
  //     handler: 'checkConnection',
  //     deep: true,
  //   }
  // },
  computed:
  {
    connectionIcon: function ()
    {
      return this.icons[this.status]
    },
    connectionLabel: function ()
    {
      return this.withLabel ? this.message : ''
    },
    message: function ()
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
