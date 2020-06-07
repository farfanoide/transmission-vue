<template>
<div>
  <div class="text-h5 text-center q-mb-md">Connections</div>
  <q-input outlined
           type="number"
           v-model="peerLimitPerTorrent"
           label="Max peers per torrent"
           class="q-mb-md"
           />
  <q-input outlined
           type="number"
           v-model="peerLimitGlobal"
           label="Max peers overall"
           class="q-mb-md"
           />
  <div class="text-h5 text-center q-mb-md"> Options </div>
  <q-select outlined
            v-model="encryption"
            :options="options.encryption"
            label="Encription mode"
            class="q-mb-md"
            />

  <q-checkbox  v-model="pexEnabled"
               label="Use PEX to find more peers" />
  <br />
  <q-checkbox  v-model="dhtEnabled"
               label="Use DHT to find more peers" />
  <br />
  <q-checkbox  v-model="lpdEnabled"
               label="Use LDP to find more peers" />

</div>
</template>
<script>
import {mapActions, mapState} from 'vuex';
import specV15 from '../../lib/rpc_spec/v15';
export default {
    name: "ConnectionSettings",
    data() {
        return {
            options: {
                encryption: specV15.session.encryption.options
            }
        }
    },
    methods: {
        ...mapActions('session',['updateSettings']),
    },
    computed: {
        ...mapState('session', ['data']),

        peerLimitPerTorrent: {
            get () { return this.data['peer-limit-per-torrent']},
            set (value) { this.updateSettings({'peer-limit-per-torrent': value })}
        },
        peerLimitGlobal: {
            get () { return this.data['peer-limit-global']},
            set (value) { this.updateSettings({'peer-limit-global': value })}
        },
        encryption: {
            get () { return this.data['encryption'] },
            set (value) { this.updateSettings({'encryption': value})}
        },
        pexEnabled: {
            get () { return this.data['pex-enabled'] },
            set (value) { this.updateSettings({'pex-enabled': value})}
        },
        dhtEnabled: {
            get () { return this.data['dht-enabled'] },
            set (value) { this.updateSettings({'dht-enabled': value})}
        },
        lpdEnabled: {
            get () { return this.data['lpd-enabled'] },
            set (value) { this.updateSettings({'lpd-enabled': value})}
        }
    }
}
</script>
