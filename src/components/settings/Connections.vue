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
</div>
</template>
<script>
import {mapActions, mapState} from 'vuex';
export default {
    name: "ConnectionSettings",
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
    }
}
</script>
