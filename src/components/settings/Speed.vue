<template>
  <div>
    <div class="text-h5 text-center q-mb-md">Speed Limits</div>

    <q-checkbox  v-model="speedLimitUpEnabled"
                 label="Upload" />
    <q-input outlined
             v-model="speedLimitUp"
             label="kB/s"
             :disable="!speedLimitUpEnabled"
             />
    <q-checkbox  v-model="speedLimitDownEnabled"
                 label="Download" />
    <q-input outlined
             v-model="speedLimitDown"
             label="kB/s"
             :disable="!speedLimitDownEnabled"
             />

  </div>
</template>
<script>
  import {mapActions, mapState } from 'vuex';
export default {
    name: "SpeedSettings",
    methods: {
        ...mapActions('session',['updateSettings']),
    },
    computed: {
        ...mapState('session', ['data']),
        speedLimitUpEnabled: {
            get () { return this.data['speed-limit-up-enabled']},
            set (value) { this.updateSettings({'speed-limit-up-enabled': value })}
        },
        speedLimitDownEnabled: {
            get () { return this.data['speed-limit-down-enabled']},
            set (value) { this.updateSettings({'speed-limit-down-enabled': value })}
        },

        speedLimitUp: {
            get () { return this.data['speed-limit-up']},
            set (value) { this.updateSettings({'speed-limit-up': value})}
        },
        speedLimitDown: {
            get () { return this.data['speed-limit-down']},
            set (value) { this.updateSettings({'speed-limit-down': value})}
        },
    }
}
</script>
