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
                v-model="settings.downloadDir"
                label="Downloads directory" />
              <div class="row">
                <q-checkbox  v-model="settings.startAddedTorrents"
                  label="Start when added" />
                <q-checkbox  v-model="settings.renamePartialFiles"
                  label="Append .part to incomplete files" />
              </div>
            <div class="text-h5 text-center q-mb-md">Seeding</div>
              <q-checkbox  v-model="settings.seedRatioLimited"
                label="Stop seeding at ratio" />
              <q-input outlined 
                v-model="settings.seedRatioLimit"
                label="seed ratio"
                :disable="!settings.seedRatioLimited"
                />
              <q-checkbox  v-model="settings.idleSeedingLimitEnabled"
                label="stop seeding if idle for" />
              <q-input outlined 
                v-model="settings.idleSeedingLimit"
                label="minutes"
                :disable="!settings.idleSeedingLimitEnabled"
                />
          </q-tab-panel>

          <q-tab-panel name="speed">
            <div class="text-h5 text-center q-mb-md">Speed Limits</div>
              
              <q-checkbox  v-model="settings.speedLimitUpEnabled"
                label="Upload" />
              <q-input outlined 
                v-model="settings.speedLimitUp"
                label="kB/s"
                :disable="!settings.speedLimitUpEnabled"
              />
              <q-checkbox  v-model="settings.speedLimitDownEnabled"
                label="Download" />
              <q-input outlined 
                v-model="settings.speedLimitDown"
                label="kB/s"
                :disable="!settings.speedLimitDownEnabled"
              />

            <div class="text-h5 text-center q-mb-md">Alternative Speed Limits</div>
            <p class="text-center"> Override normal speed limits manually </p>
              <q-input outlined 
                type="number"
                v-model="settings.altSpeedUp"
                label="Upload(kB/s)"
              />
              <q-input outlined
                type="number"
                v-model="settings.altSpeedDown"
                label="Download(kB/s)"
              />
              <q-checkbox  v-model="settings.altSpeedTimeEnabled"
                label="Scheduled Times" />
              <q-select outlined 
                v-model="settings.altSpeedTimeBegin" 
                :options="[]" 
                label="From" 
                disable
              />
              <q-select outlined 
                v-model="settings.altSpeedTimeEnd" 
                :options="[]" 
                label="To" 
                disable
              />
              <q-select outlined 
                v-model="settings.altSpeedTimeDay" 
                :options="[]" 
                label="On days" 
                disable
              />
              

          </q-tab-panel>

          <q-tab-panel name="peers">
            <div class="text-h5 text-center q-mb-md">Connections</div>
              <q-input outlined
                type="number"
                v-model="settings.peerLimitPerTorrent"
                label="Max peers per torrent"
              />
              <q-input outlined
                type="number"
                v-model="settings.peerLimitGlobal"
                label="Max peers overall"
              />
            <div class="text-h5 text-center q-mb-md"> Options </div>
              <q-select outlined 
                v-model="settings.encryption" 
                :options="options.encryption" 
                label="Encription mode"
              />
              
              <q-checkbox  v-model="settings.pexEnabled"
                label="Use PEX to find more peers" />
              <br />
              <q-checkbox  v-model="settings.dhtEnabled"
                label="Use DHT to find more peers" />
              <br />
              <q-checkbox  v-model="settings.lpdEnabled"
                label="Use LDP to find more peers" />

            <div disabled>
            <div class="text-h5 text-center q-mb-md"> Blocklist </div>
              <q-checkbox  v-model="settings.blocklistEnabled"
                label="Enable blocklist" />
              <q-input outlined
                bottom-slots
                v-model="settings.blocklistUrl"
                :disable="!settings.blocklistEnabled"
                readonly
              >        
              <template v-slot:after>
                <q-btn dense flat :disable="!settings.blocklistEnabled">Update</q-btn>
              </template>
              <template v-slot:hint>Blocklist has {{settings.blocklistSize}} rules</template>
              </q-input>

            </div>
          </q-tab-panel>
          <q-tab-panel name="network">
            <div class="text-h5 text-center q-mb-md">Listening Port</div>
              <q-input outlined
                bottom-slots=""
                v-model="settings.peerPort"
                label="Peer listening port"
              >
              <template v-slot:hint> <del>Port is <strong> OPEN</strong></del></template>
              </q-input>
              <q-checkbox  v-model="settings.peerPortRandomOnStart"
                label="Randomize port on launch" />
              <br />
              <q-checkbox  v-model="settings.portForwardingEnabled"
                label="Use port forwarding from my router" />
              <br />
            <div class="text-h5 text-center q-mb-md">Options</div>
            <q-checkbox  v-model="settings.utpEnabled"
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
        console.log("SETTINGS DATA SENT TO SERVER", this.settings)
      }
    }
    
}
</script>