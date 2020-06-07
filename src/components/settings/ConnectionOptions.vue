<template>
<div>
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
    name: "ConnectionOptionsSettings",
    data() {
        return {
            options: {
                encryption: specV15.session.encryption.options
            }
        }
    },
    computed: {
        ...mapState('session', ['data']),
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
