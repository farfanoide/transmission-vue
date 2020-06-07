<template>
  <div>
    <q-btn round flat color="yellow" icon='build' @click="opened=!opened">
    </q-btn>

    <q-dialog v-model="opened" @hide="sendSettingsToServer">
      <q-layout container class="bg-white">
        <div class="row">
          <div class="col-2">
            <q-tabs
              v-model="tab"
              vertical
              class="text-teal"
              >

              <q-tab name="torrents" icon="cloud_download" label="torrents" />
              <q-tab name="speed" icon="speed" label="speed" />
              <q-tab name="peers" icon="group" label="peers" />
              <q-tab name="network" icon="swap_horiz" label="network" />

            </q-tabs>
          </div>
          <div class="col">
            <q-tab-panels
              v-model="tab"
              animated
              swipeable
              vertical
              transition-prev="jump-up"
              transition-next="jump-up"
              >
              <q-tab-panel name="torrents">
                <section class="panel">
                  <torrent-settings></torrent-settings>
                </section>
                <section class="panel">
                  <seeding-settings></seeding-settings>
                </section>
              </q-tab-panel>
              <q-tab-panel name="speed">
                <section class="panel">
                  <speed-settings></speed-settings>
                </section>
                <section class="panel">
                  <alternative-speed-settings></alternative-speed-settings>
                </section>
              </q-tab-panel>

              <q-tab-panel name="peers">
                <section class="panel">
                  <connection-settings></connection-settings>
                </section>
                <section class="panel">
                  <blocklist-settings></blocklist-settings>
                </section>
              </q-tab-panel>
              <!-- <q-tab-panel name="network"> -->
              <!--   <div class="text-h5 text-center q-mb-md">Listening Port</div> -->
              <!--   <q-input outlined -->
              <!--            bottom-slots="" -->
              <!--            v-model="clientSettings['peer-port']" -->
              <!--            label="Peer listening port" -->
              <!--            > -->
              <!--     <template v-slot:hint> <del>Port is <strong> OPEN</strong></del></template> -->
              <!--   </q-input> -->
              <!--   <q-checkbox  v-model="clientSettings['peer-port-random-on-start']" -->
              <!--                label="Randomize port on launch" /> -->
              <!--   <br /> -->
              <!--   <q-checkbox  v-model="clientSettings['port-forwarding-enabled']" -->
              <!--                label="Use port forwarding from my router" /> -->
              <!--   <br /> -->
              <!--   <div class="text-h5 text-center q-mb-md">Options</div> -->
              <!--   <q-checkbox  v-model="clientSettings['utp-enabled']" -->
              <!--                label="Enable uTP peer communication" /> -->
              <!-- </q-tab-panel> -->
            </q-tab-panels>
          </div>
        </div>
      </q-layout>
    </q-dialog>
  </div>
</template>

<script>
import TransmissionService from '../../services/transmission_service';
import { mapState, mapActions } from 'vuex';
import ClientSettings from '../../models/client-settings';
import TorrentSettings from './Torrents';
import SeedingSettings from './Seeding';
import SpeedSettings from './Speed';
import AlternativeSpeedSettings from './AlternativeSpeed';
import ConnectionSettings from './Connections';
import BlocklistSettings from './Blocklist';
export default {
    components: {
        TorrentSettings,
        SeedingSettings,
        SpeedSettings,
        AlternativeSpeedSettings,
        ConnectionSettings,
        BlocklistSettings
    },
    name: "GeneralSettings",
    data () {
        return {
            tab: 'torrents',
            options: {
                encryption: ClientSettings.EncriptionOptions
            },
            opened: false
        }
    },
    methods: {
        ...mapActions('session', ['updateClientSettings']),
        sendSettingsToServer() {
            /**
             * Send settings to the server
             *
             */
            this.updateClientSettings();
            // this.transmissionService
            //     .setClientSettings(this.clientSettings)
        }
    },
    computed: {
        ...mapState('session', ['settings']),

    }

}
</script>
<style>
.panel {
  padding: 0 1em;
  margin-bottom: 1em;
}
</style>
