<template>
  <div>
      <div class="text-h5 text-center q-mb-md">Seeding</div>
      <q-checkbox  v-model="seedRatioLimited"
                   label="Stop seeding at ratio" />
      <q-input outlined
               v-model="data['seedRatioLimit']"
               label="seed ratio"
               :disable="!seedRatioLimited"
               />
      <q-checkbox  v-model="idleSeedingLimitEnabled"
                   label="stop seeding if idle for" />
      <q-input outlined

               v-model="idleSeedingLimit"
               label="minutes"
               :disable="!idleSeedingLimitEnabled"
               />
  </div>
</template>
<script>
  import { mapState, mapActions, mapGetters } from 'vuex';
export default {
    name: "SeedingSettings",
    methods: {
        ...mapActions('session',['updateSettings']),
    },
    computed: {
        ...mapState('session', ['data']),
        seedRatioLimited: {
            get () { return this.data['seedRatioLimited'] },
            set (value) { this.updateSettings({'seedRatioLimited': value})}
        },
        seedRatioLimit: {
            get () { return this.data['seedRatioLimit'] },
            set (value) { this.updateSettings({'seedRatioLimit': value}) }
        },
        idleSeedingLimit: {
            get () { return this.data['idle-seeding-limit'] },
            set (value) { this.updateSettings({'idle-seeding-limit': value})}
        },
        idleSeedingLimitEnabled: {
            get () { return this.data['idle-seeding-limit-enabled'] },
            set (value) { this.updateSettings({'idle-seeding-limit-enabled': value}) }
        }

    }
}
</script>
