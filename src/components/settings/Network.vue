<template>
<div>
  <div class="text-h5 text-center q-mb-md">Listening Port</div>
  <q-input outlined
           bottom-slots=""
           v-model="peerPort"
           label="Peer listening port"
           >
    <template v-slot:hint> <del>Port is <strong> OPEN</strong></del></template>
  </q-input>
  <q-checkbox  v-model="peerPortRandomOnStart"
               label="Randomize port on launch" />
  <br />
  <q-checkbox  v-model="portForwardingEnabled"
               label="Use port forwarding from my router" />
  <br />
  <div class="text-h5 text-center q-mb-md">Options</div>
  <q-checkbox  v-model="utpEnabled"
               label="Enable uTP peer communication" />

</div>
</template>
<script>
import { mapActions, mapState } from 'vuex';
export default {
    name: "NetworkSettings",
        methods: {
        ...mapActions('session',['updateSettings']),
    },
    computed: {
        ...mapState('session', ['data']),
        peerPort: {
            get () { return this.data['peer-port']},
            set (value) { this.updateSettings({'peer-port': value })}
        },
        peerPortRandomOnStart: {
            get () { return this.data['peer-port-random-on-start']},
            set (value) { this.updateSettings({'peer-port-random-on-start': value})}
        },
        portForwardingEnabled: {
            get () {return this.data['port-forwarding-enabled']},
            set (value) { this.updateSettings({'port-forwarding-enabled': value}) }
        },
        utpEnabled: {
            get () { return this.data['utp-enabled']},
            set (value) { this.updateSettings({'utp-enabled': value })}
        },
    }
}
</Script>
