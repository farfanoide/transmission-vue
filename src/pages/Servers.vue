<template>
  <q-page class="flex flex-center">
    <q-list bordered class="rounded-borders" >
      <q-item-label header>
        Servers
      </q-item-label>

      <q-item v-for="server in servers" :key="`server-${server.ipAddress}`">

        <q-item-section >
          <q-item-label lines="1">
            <span class="text-grey-8">
              {{server.displayName || server.ipAddress}}
            </span>
          </q-item-label>
        </q-item-section>

        <q-item-section side>
          <div class="text-grey-8 q-gutter-xs">
            <q-btn class="gt-xs"
                   size="12px"
                   @click="checkServer(server)"
                   flat dense round
                   :icon="server.connection == 'success' ? 'done' : 'link_off'">
            </q-btn>
            <q-btn @click="deleteServer(server)" class="gt-xs" size="12px" flat dense round icon="delete"></q-btn>
            <!-- <q&#45;btn @click="deleteServer(server)" size="12px" flat dense round icon="more_vert"></q&#45;btn> -->
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
                <q-btn class="gt-xs" size="12px" flat dense round icon="add" />
              </div>
            </q-item-section>
          </q-item>
    </q-list>
    <!-- choose your server here <br> -->
    <!-- or -->
    <!-- <br> -->
    <!-- add another one -->
    <!-- <br> -->
    <!-- <br> -->
    <!--  -->
    <!-- <router&#45;link :to="{name: 'torrents&#45;list'}"> -->
    <!--   when done (server chosen) go see torrents -->
    <!-- </router&#45;link> -->
  </q-page>
</template>

<script>


import { mapState, mapActions } from 'vuex'

export default {
  name: 'Servers',
  created() {
    // load servers from vuex
  },
  data () {
    return {
      servers: [
        {
          displayName: null,
          ipAddress: 'localhost',
          rpcEndpoint: '/transmission/rpc',
          ssl: false,
          port: 9091,
          username: '',
          password: '',
          connection: 'unknown',
        },
        {
          displayName: 'lachina',
          ipAddress: 'lachina.local',
          rpcEndpoint: '/transmission/rpc',
          ssl: false,
          port: 9091,
          username: '',
          password: '',
          connection: 'unknown',
        }
      ]
    }
  },
  methods: {
    // add vuex servers
    checkServer: function (server)
    {
      // TOOD: TransmissionClient check connection
      this.servers[this.servers.indexOf(server)].connection = 'success'
    },
    deleteServer: function (server)
    {
      this.servers.splice(this.servers.indexOf(server), 1)
    }
  },
  computed: {
  }

}
</script>
