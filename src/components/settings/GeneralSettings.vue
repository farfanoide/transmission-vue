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
                <torrent-settings></torrent-settings>
              </q-tab-panel>
              <!-- <q-tab-panel name="speed"> -->

              <!--   <div class="text-h5 text-center q-mb-md">Speed Limits</div> -->

              <!--   <q-checkbox  v-model="clientSettings['speed-limit-up-enabled']" -->
              <!--                label="Upload" /> -->
              <!--   <q-input outlined -->
              <!--            v-model="clientSettings['speed-limit-up']" -->
              <!--            label="kB/s" -->
              <!--            :disable="!clientSettings['speed-limit-up-enabled']" -->
              <!--            /> -->
              <!--   <q-checkbox  v-model="clientSettings['speed-limit-down-enabled']" -->
              <!--                label="Download" /> -->
              <!--   <q-input outlined -->
              <!--            v-model="clientSettings['speed-limit-down']" -->
              <!--            label="kB/s" -->
              <!--            :disable="!clientSettings['speed-limit-down-enabled']" -->
              <!--            /> -->

              <!--   <div class="text-h5 text-center q-mb-md">Alternative Speed Limits</div> -->
              <!--   <p class="text-center"> Override normal speed limits manually </p> -->
              <!--   <q-input outlined -->
              <!--            class="q-mb-sm" -->
              <!--            type="number" -->
              <!--            v-model="clientSettings['alt-speed-up']" -->
              <!--            label="Upload(kB/s)" -->
              <!--            /> -->
              <!--   <q-input outlined -->
              <!--            class="q-mb-sm" -->
              <!--            type="number" -->
              <!--            v-model="clientSettings['alt-speed-down']" -->
              <!--            label="Download(kB/s)" -->
              <!--            /> -->
              <!--   <q-checkbox  v-model="clientSettings['alt-speed-time-enabled']" -->
              <!--                label="Scheduled Times" /> -->
              <!--   <q-sele3ct outlined -->
              <!--             class="q-mb-sm" -->
              <!--             v-model="clientSettings['alt-speed-time-begin']" -->
              <!--             :options="[]" -->
              <!--             label="From" -->
              <!--             disable -->
              <!--             /> -->
              <!--   <q-select outlined -->
              <!--             class="q-mb-sm" -->
              <!--             v-model="clientSettings['alt-speed-time-end']" -->
              <!--             :options="[]" -->
              <!--             label="To" -->
              <!--             disable -->
              <!--             /> -->
              <!--   <q-select outlined -->
              <!--             class="q-mb-sm" -->
              <!--             v-model="clientSettings['alt-speed-time-day']" -->
              <!--             :options="[]" -->
              <!--             label="On days" -->
              <!--             disable -->
              <!--             /> -->


              <!-- </q-tab-panel> -->

              <!-- <q-tab-panel name="peers"> -->
              <!--   <div class="text-h5 text-center q-mb-md">Connections</div> -->
              <!--   <q-input outlined -->
              <!--            type="number" -->
              <!--            v-model="clientSettings['peed-limit-per-torrent']" -->
              <!--            label="Max peers per torrent" -->
              <!--            /> -->
              <!--   <q-input outlined -->
              <!--            type="number" -->
              <!--            v-model="clientSettings['peed-limit-global']" -->
              <!--            label="Max peers overall" -->
              <!--            /> -->
              <!--   <div class="text-h5 text-center q-mb-md"> Options </div> -->
              <!--   <q-select outlined -->
              <!--             v-model="clientSettings['encryption']" -->
              <!--             :options="options.encryption" -->
              <!--             label="Encription mode" -->
              <!--             /> -->

              <!--   <q-checkbox  v-model="clientSettings['pex-enabled']" -->
              <!--                label="Use PEX to find more peers" /> -->
              <!--   <br /> -->
              <!--   <q-checkbox  v-model="clientSettings['dht-enabled']" -->
              <!--                label="Use DHT to find more peers" /> -->
              <!--   <br /> -->
              <!--   <q-checkbox  v-model="clientSettings['lpd-enabled']" -->
              <!--               label="Use LDP to find more peers" /> -->

              <!--   <div disabled> -->
              <!--     <div class="text-h5 text-center q-mb-md"> Blocklist </div> -->
              <!--     <q-checkbox  v-model="clientSettings['blocklist-enabled']" -->
              <!--                  label="Enable blocklist" /> -->
              <!--     <q-input outlined -->
              <!--              bottom-slots -->
              <!--              value="" -->
              <!--              :disable="!clientSettings['blocklist-enabled']" -->
              <!--              readonly -->
              <!--              > -->
              <!--       <template v-slot:after> -->
              <!--         <q-btn dense flat :disable="!clientSettings['blocklist-enabled']">Update</q-btn> -->
              <!--       </template> -->
              <!--       <template v-slot:hint>Blocklist has {{clientSettings.blocklistSize}} rules</template> -->
              <!--     </q-input> -->

              <!--   </div> -->
              <!-- </q-tab-panel> -->
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
export default {
    components: {
        TorrentSettings
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
