<template>
  <div>
    <div class="text-h5 text-center q-mb-md">Options</div>
    <q-checkbox  v-model="utpEnabled"
                 label="Enable uTP peer communication" />
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex';
export default {
    name: "NetworkOptionSettings",
    methods: {
        ...mapActions('session',['updateSettings']),
    },
    computed: {
        ...mapState('session', ['data']),
        utpEnabled: {
            get () { return this.data['utp-enabled']},
            set (value) { this.updateSettings({'utp-enabled': value })}
        },
    }
}
</script>
