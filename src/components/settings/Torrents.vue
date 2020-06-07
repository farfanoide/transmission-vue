<template>
  <div>
    <div class="panel">
      <div class="text-h5 text-center q-mb-md">Torrents</div>
      <q-input outlined
               class="q-mb-sm"
               v-model="downloadDir"
               label="Downloads directory" />
      <div class="row">
        <q-checkbox  v-model="startAddedTorrents"
                     label="Start when added" /> <br />
        <q-checkbox  v-model="renamePartialFiles"
                     label="Append .part to incomplete files" />
      </div>
    </div>
    <!-- <section class="panel"> -->
    <!--   <div class="text-h5 text-center q-mb-md">Seeding</div> -->
    <!--   <q-checkbox  v-model="seedRatioLimited" -->
    <!--                label="Stop seeding at ratio" /> -->
    <!--   <q-input outlined -->
    <!--            v-model="data['seedRatioLimit']" -->
    <!--            label="seed ratio" -->
    <!--            :disable="!seedRatioLimited" -->
    <!--            /> -->
    <!--   <q-checkbox  v-model="idleSeedingLimitEnabled" -->
    <!--                label="stop seeding if idle for" /> -->
    <!--   <q-input outlined -->

    <!--            v-model="idleSeedingLimit" -->
    <!--            label="minutes" -->
    <!--            :disable="!idleSeedingLimitEnabled" -->
    <!--            /> -->
    <!-- </section> -->

  </div>
</template>
<script>
  import { mapState, mapActions, mapGetters } from 'vuex';
export default {
    name: "TorrentSettings",
    methods: {
        ...mapActions('session',['updateSettings']),
    },
    computed: {
        ...mapState('session', ['data']),
        downloadDir: {
            get () { return this.data['download-dir']},
            set (value) { this.updateSettings({'download-dir': value })}
        },
        startAddedTorrents: {
            get () { return this.data['start-added-torrents']},
            set (value) { this.updateSettings({'start-added-torrents': value})}
        },
        renamePartialFiles: {
            get () {return this.data['rename-partial-files']},
            set (value) { this.updateSettings({'rename-partial-files': value}) }
        },
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
