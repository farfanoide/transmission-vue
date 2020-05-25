<template>
  <q-dialog v-model="status.opened" @hide="sendSettingsToServer">
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
            <div class="text-h5 text-center q-mb-md">Torrents</div>
              <q-input outlined
                v-model="settings['download-dir']"
                label="Downloads directory" />
              <div class="row">
                <q-checkbox  v-model="settings['start-added-torrents']"
                  label="Start when added" />
                <q-checkbox  v-model="settings['rename-partial-files']"
                  label="Append .part to incomplete files" />
              </div>
            <div class="text-h5 text-center q-mb-md">Seeding</div>
              <q-checkbox  v-model="settings['seedRatioLimited']"
                label="Stop seeding at ratio" />
              <q-input outlined
                v-model="settings['seedRatioLimit']"
                label="seed ratio"
                :disable="!settings['seedRatioLimited']"
                />
              <q-checkbox  v-model="settings['idle-seeding-limit-enabled']"
                label="stop seeding if idle for" />
              <q-input outlined
                v-model="settings['idle-seeding-limit']"
                label="minutes"
                :disable="!settings['idle-seeding-limit-enabled']"
                />
          </q-tab-panel>

          <q-tab-panel name="speed">
            <div class="text-h5 text-center q-mb-md">Speed Limits</div>

              <q-checkbox  v-model="settings['speed-limit-up-enabled']"
                label="Upload" />
              <q-input outlined
                v-model="settings['speed-limit-up']"
                label="kB/s"
                :disable="!settings['speed-limit-up-enabled']"
              />
              <q-checkbox  v-model="settings['speed-limit-down-enabled']"
                label="Download" />
              <q-input outlined
                v-model="settings['speed-limit-down']"
                label="kB/s"
                :disable="!settings['speed-limit-down-enabled']"
              />

            <div class="text-h5 text-center q-mb-md">Alternative Speed Limits</div>
            <p class="text-center"> Override normal speed limits manually </p>
              <q-input outlined
                type="number"
                v-model="settings['alt-speed-up']"
                label="Upload(kB/s)"
              />
              <q-input outlined
                type="number"
                v-model="settings['alt-speed-down']"
                label="Download(kB/s)"
              />
              <q-checkbox  v-model="settings['alt-speed-time-enabled']"
                label="Scheduled Times" />
              <q-select outlined
                v-model="settings['alt-speed-time-begin']"
                :options="[]"
                label="From"
                disable
              />
              <q-select outlined
                v-model="settings['alt-speed-time-end']"
                :options="[]"
                label="To"
                disable
              />
              <q-select outlined
                v-model="settings['alt-speed-time-day']"
                :options="[]"
                label="On days"
                disable
              />


          </q-tab-panel>

          <q-tab-panel name="peers">
            <div class="text-h5 text-center q-mb-md">Connections</div>
              <q-input outlined
                type="number"
                v-model="settings['peed-limit-per-torrent']"
                label="Max peers per torrent"
              />
              <q-input outlined
                type="number"
                v-model="settings['peed-limit-global']"
                label="Max peers overall"
              />
            <div class="text-h5 text-center q-mb-md"> Options </div>
              <q-select outlined
                v-model="settings['encryption']"
                :options="options.encryption"
                label="Encription mode"
              />

              <q-checkbox  v-model="settings['pex-enabled']"
                label="Use PEX to find more peers" />
              <br />
              <q-checkbox  v-model="settings['dht-enabled']"
                label="Use DHT to find more peers" />
              <br />
              <q-checkbox  v-model="settings['lpd-enabled']"
                label="Use LDP to find more peers" />

            <div disabled>
            <div class="text-h5 text-center q-mb-md"> Blocklist </div>
              <q-checkbox  v-model="settings['blocklist-enabled']"
                label="Enable blocklist" />
              <q-input outlined
                bottom-slots
                value=""
                :disable="!settings['blocklist-enabled']"
                readonly
              >
              <template v-slot:after>
                <q-btn dense flat :disable="!settings['blocklist-enabled']">Update</q-btn>
              </template>
              <template v-slot:hint>Blocklist has {{settings.blocklistSize}} rules</template>
              </q-input>

            </div>
          </q-tab-panel>
          <q-tab-panel name="network">
            <div class="text-h5 text-center q-mb-md">Listening Port</div>
              <q-input outlined
                bottom-slots=""
                v-model="settings['peer-port']"
                label="Peer listening port"
              >
              <template v-slot:hint> <del>Port is <strong> OPEN</strong></del></template>
              </q-input>
              <q-checkbox  v-model="settings['peer-port-random-on-start']"
                label="Randomize port on launch" />
              <br />
              <q-checkbox  v-model="settings['port-forwarding-enabled']"
                label="Use port forwarding from my router" />
              <br />
            <div class="text-h5 text-center q-mb-md">Options</div>
            <q-checkbox  v-model="settings['utp-enabled']"
                label="Enable uTP peer communication" />
          </q-tab-panel>
        </q-tab-panels>
    </div>
  </div>
  </q-layout>
  </q-dialog>
</template>

<script>
import TransmissionService from '../services/transmission_service';
import { mapState } from 'vuex';
import ClientSettings from '../models/client-settings';

export default {
    name: "GeneralSettings",
    props: [
      'status',
      'clientSettings'
    ],
    data () {
      return {
        tab: 'torrents',
        settings: new ClientSettings(this.clientSettings),
        options: {
          encryption: ClientSettings.EncriptionOptions
        }
      }
    },
    methods: {
      sendSettingsToServer() {
        /**
         * Send settings to the server
         *
         */
        new TransmissionService({store: this.$store})
          .setClientSettings(this.settings)
      }
    },
    computed: {
      ...mapState('configs', ['currentServer'])
    }

}
</script>
