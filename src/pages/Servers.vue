<template>
  <q-page class="flex flex-center">

    <template>
      <div class="q-pa-md q-gutter-sm">

        <q-dialog v-model="showServerModal" transition-show="scale" transition-hide="scale">
          <q-card style="width: 700px; max-width: 80vw;">
            <q-card-section>
              <div class="text-h6">
                {{currentServer.isNew ? 'Create Server' : 'Edit Server Settings'}}
              </div>
            </q-card-section>

            <q-card-section class="q-pt-none">
              <server-form :server-data="currentServer"></server-form>
            </q-card-section>

          </q-card>
        </q-dialog>
      </div>
    </template>

    <q-list bordered class="rounded-borders" >
      <q-item-label header>
        Servers
      </q-item-label>

      <q-item v-for="(server, index) in servers" :key="`server-${index}-${server.host}`" clickable v-ripple>

        <q-item-section >
          <q-item-label lines="1">
            <span class="text-grey-8" @click="chooseServer(server)">
              {{server.displayName || server.host}}
            </span>
          </q-item-label>
        </q-item-section>

        <q-item-section side>
          <div class="text-grey-8 q-gutter-xs">
            <q-btn class="gt-xs"
                   size="12px"
                   @click="editServer(server)"
                   flat dense round
                   icon="edit">
            </q-btn>
            <q-btn class="gt-xs"
                   size="12px"
                   @click="checkServer(server)"
                   flat dense round
                   :icon="server.connection == 'success' ? 'done' : 'link_off'">
            </q-btn>
            <q-btn @click="deleteServer(server)" class="gt-xs" size="12px" flat dense round icon="delete"></q-btn>
          </div>
        </q-item-section>
      </q-item>

      <q-separator spaced></q-separator>

      <q-item>

        <q-item-section>
          <q-item-label lines="1">
            <span class="text-grey-8">
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
  </q-page>
</template>

<script>


import { mapState, mapActions } from 'vuex'
import ServerForm from '../components/ServerForm'
import {LocalStorage } from 'quasar'
import {defaultServerTemplate } from '../lib/servers'

export default {
  name: 'Servers',
  components: {
    ServerForm,
  },
  data () {
    return {
      showServerModal: false,
    }
  },
  mounted()
  {
    this.initialize() // initialize vuex store
  },
  methods: {
    ...mapActions('configs', [
      'deleteServer',
      'initialize',
      'setCurrentServer',
    ]),
    editServer(server)
    {
      this.setCurrentServer(server)
      this.showServerModal = true
    },
    addServer()
    {
      this.setCurrentServer(defaultServerTemplate())
      this.showServerModal = true
    },
    checkServer: function (server)
    {
      // TODO: TransmissionClient check connection
      this.servers[this.servers.indexOf(server)].connection = 'success'
    },
    chooseServer(server)
    {
      this.setCurrentServer(server)
      this.$router.push({name: 'torrents-list'})
    }
  },
  computed: {
    ...mapState('configs', ['servers', 'currentServer'])
  }

}
</script>
