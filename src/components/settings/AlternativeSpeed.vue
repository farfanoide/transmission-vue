<template>
  <div>
    <p class="text-center q-mb-md"> Override normal speed limits manually </p>
    <q-input outlined
             class="q-mb-sm"
             type="number"
             v-model="altSpeedUp"
             label="Upload(kB/s)"
             />
    <q-input outlined
             class="q-mb-sm"
             type="number"
             v-model="altSpeedDown"
             label="Download(kB/s)"
             />
    <q-checkbox  v-model="altSpeedTimeEnabled"
                 label="Scheduled Times" />
    <q-sele3ct outlined
               class="q-mb-sm"
               v-model="altSpeedTimeBegin"
               :options="[]"
               label="From"
               disable
               />
    <q-select outlined
              class="q-mb-sm"
              v-model="altSpeedTimeEnd"
              :options="[]"
              label="To"
              disable
              />
    <q-select outlined
              class="q-mb-sm"
              v-model="altSpeedTimeDay"
              :options="[]"
              label="On days"
              disable
              />

  </div>
</template>
<script>
  import {mapActions, mapState } from 'vuex';
export default {
    name: "AlternativeSpeedSettings",
    methods: {
        ...mapActions('session',['updateSettings']),
    },
    computed: {
        ...mapState('session', ['data']),
        altSpeedUp: {
            get () { return this.data['alt-speed-up']},
            set (value) { this.updateSettings({'alt-speed-up': value })}
        },
        altSpeedDown: {
            get () { return this.data['alt-speed-down']},
            set (value) { this.updateSettings({'alt-speed-down': value })}
        },
        altSpeedTimeEnabled: {
            get () { return this.data['alt-speed-time-enabled']},
            set (value) { this.updateSettings({'alt-speed-time-enabled': value })}
        },
        altSpeedTimeBegin: {
            get () { return this.data['alt-speed-time-begin']},
            set (value) { this.updateSettings({'alt-speed-time-begin': value })}
        },
        altSpeedTimeEnd: {
            get () { return this.data['alt-speed-time-end']},
            set (value) { this.updateSettings({'alt-speed-time-end': value })}
        },
        altSpeedTimeDay: {
            get () { return this.data['alt-speed-time-day']},
            set (value) { this.updateSettings({'alt-speed-time-day': value })}
        },
    }
}
</script>
