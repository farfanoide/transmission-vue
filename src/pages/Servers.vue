<template>
  <q-page class="flex flex-center">

    <q-list bordered class="rounded-borders" style="min-width: 400px" >
      <q-item-label header>
        Servers
      </q-item-label>

      <q-item v-for="(server, index) in servers" :key="`server-${index}-${server.host}`" clickable v-ripple>

        <q-item-section side>
          <server-connection-status :server="server">
          </server-connection-status>
        </q-item-section>

        <q-item-section @click="chooseServer(server)">
          {{server.displayName || server.host}}
        </q-item-section>

        <q-item-section side>
          <q-fab flat icon="more_vert" direction="left" size="btn_size_sq_xs">
            <q-fab-action @click="editServer(server)" icon="edit" flat>
              <q-tooltip anchor="top middle" :offset="[30, 30]">
                Edit Server
              </q-tooltip>
            </q-fab-action>

            <q-fab-action @click="toggleDefaultServer(server)"
                         :icon="server.isDefault ? 'star' : 'star_outline'" flat>
              <q-tooltip anchor="top middle" :offset="[30, 30]">
                {{server.isDefault ? 'Unset' : 'Set'}} as default server.
              </q-tooltip>
            </q-fab-action>

            <q-fab-action @click="confirmAndDeleteServer(server)" icon="delete" flat>
              <q-tooltip anchor="top middle" :offset="[30, 30]">
                Delete Server
              </q-tooltip>
            </q-fab-action>
          </q-fab>
        </q-item-section>

      </q-item>

      <q-separator spaced></q-separator>

      <q-item>

        <q-item-section>
          <q-item-label lines="1">
            <span class="text-grey-8"
                  @click='addServer'>
              Add another one
            </span>
          </q-item-label>
        </q-item-section>

        <q-item-section side>
          <div class="text-grey-8 q-gutter-xs">
            <q-btn class="gt-xs"
                   size="12px"
                   flat dense round
                   icon="add"
                   @click='addServer'>
            </q-btn>
          </div>
        </q-item-section>
      </q-item>
    </q-list>


    <q-dialog v-model="showServerModal" transition-show="scale" transition-hide="scale" :maximized="modalsMaximized">
      <q-card style="min-width: 400px;">
        <q-card-section>
          <div class="text-h6">
            {{(creatingServer) ? 'Create' : 'Edit'}} Server
          </div>
        </q-card-section>

        <q-card-section class="q-pt-none" v-if="selectedServer">
          <server-form :server-data="selectedServer">
          </server-form>
        </q-card-section>

      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>


import ServerConnectionStatus from '../components/ServerConnectionStatus'
import ServerForm from '../components/ServerForm'
import { defaultServerTemplate } from '../lib/servers'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'Servers',
  components: {
    ServerForm,
    ServerConnectionStatus,
  },
  data () {
    return {
      showServerModal: false,
      modalsMaximized: false,  // TODO: show modal maximised on mobiles
      selectedServer: null,
    }
  },
  methods: {
    ...mapActions('configs', [
      'deleteServer',
      'setCurrentServer',
      'toggleDefaultServer',
    ]),
    editServer(server)
    {
      this.selectedServer = server
      this.showServerModal = true
    },
    clearSelectedServer()
    {
      this.selectedServer = null
    },
    addServer()
    {
      this.selectedServer = defaultServerTemplate()
      this.showServerModal = true
    },
    confirmAndDeleteServer(server)
    {
      this.$q.dialog({
        title: 'Confirm',
        message: 'Are you sure you want to delete this server?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.deleteServer(server)
      })
    },
    chooseServer(server)
    {
      this.setCurrentServer(server)
      this.$router.push({name: 'torrents-list'})
    }
  },
  computed: {
    ...mapState('configs', ['servers']),
    creatingServer: function ()
    {
      return this.selectedServer && !this.selectedServer.id
    }
  }

}
</script>
