<template>
  <q-dialog v-model="status.opened">
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
              <div class="text-h4 text-center q-mb-md">Torrents</div>
              <q-input outlined v-model="settings['download-dir']" label="Download dir" />
            <div class="row">
              <q-checkbox  v-model="settings['start-added-torrents']"
                label="Start when added" />
              <q-checkbox  v-model="settings['rename-partial-files']"
                label="Append .part to incomplete files" />
            </div>
            <div class="text-h4 text-center q-mb-md">Seeding</div>
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
            <div class="text-h4 q-mb-md">Speed</div>
            <p> Under construction </p>
          </q-tab-panel>

          <q-tab-panel name="peers">
            <div class="text-h4 q-mb-md">peers</div>
            <p> Under construction </p>
          </q-tab-panel>
          <q-tab-panel name="network">
            <div class="text-h4 q-mb-md">Network</div>
            <p> Under construction </p>
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

export default {
    name: "GeneralSettings",
    props: [
      'status'
    ],
    data () {
      return {
        tab: 'torrents'
      }
    },
    created() {
      this.service = new TransmissionService({store: this.$store}, this.currentServer)
      this.service.fetchClientSettings();

    },
    computed: {
      ...mapState('session',['settings']),
      ...mapState('configs', ['currentServer'])
    }
}
</script>