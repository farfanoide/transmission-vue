<template>
  <div class="q-pa-md">

    <q-form class="q-gutter-md"
            @submit="onSubmit"
            :disabled="disabled">

      <q-input
        filled
        autofocus
        v-model="server.displayName"
        label="Display Name for the server (optional)">
      </q-input>

      <q-input
        filled
        v-model="server.host"
        label="Ip Address of the server"
        hint="Something like: 192.168.0.1 or seedbox.local">
      </q-input>

      <q-input
        filled
        v-model="server.url"
        hint="Leave blank for default of `/transmission/rpc`"
        label="RPC endoint">
      </q-input>

      <q-input
        filled
        v-model="server.username"
        label="Username for authentication">
      </q-input>


      <q-input v-model="server.password" filled :type="showPassword ? 'text' : 'password'" hint="Password with toggle">
        <template v-slot:append>
          <q-icon
            :name="showPassword ? 'visibility' : 'visibility_off'"
            class="cursor-pointer"
            @click="showPassword = !showPassword"
            label="Password for authentication">
          </q-icon>
        </template>
      </q-input>

      <q-input v-model="server.port"
               filled
               type='number'
               label="Port">
      </q-input>

      <q-toggle v-model="server.ssl" label="Use SSL for connection">
      </q-toggle>

      <q-separator></q-separator>
      <server-connection-status :server="server" :with-label="true"></server-connection-status>
      <q-separator></q-separator>

      <div>
        <q-btn label="Save" type="submit" color="primary"></q-btn>
        <q-btn label="Cancel"
               v-close-popup
               ref="cancel-btn"
               color="primary"
               flat class="q-ml-sm">
        </q-btn>
      </div>
    </q-form>

  </div>
</template>
<script>
import { mapActions } from 'vuex'
import ServerConnectionStatus from './ServerConnectionStatus'

function UUID ()
{
  return String(Math.random())
}

export default {
  name: 'ServerFrom',
  components: {
    ServerConnectionStatus,
  },
  props: [
    'serverData',
  ],
  data()
  {
    return {
      showPassword: false,
      server: {},
      editing: true, // editing an existing server
      disabled: false,
    }
  },
  created()
  {
    this.server = Object.assign({}, this.serverData)
    if (! this.server.id)
    {
      this.server.id = UUID()
      this.editing = false
    }
  },
  methods: {
    ...mapActions('configs', ['addServer', 'updateServer']),
    onSubmit () {
      // check rpc connection
      // store server or show alert
      // TODO: add validations
      if ( this.editing ) {
        this.updateServer(this.server)
      } else {
        this.addServer(this.server)
      }

      this.$q.notify({
        icon: 'storage',
        message: `Server successfully ${this.editing ? 'updated' : 'added'}`
      })

      // close the dialog, theres gotta be a better way to do this
      setTimeout(() => {
        this.$refs["cancel-btn"].$el.click()
        this.server = {}
      }, 500)
    },
  },
}
</script>
