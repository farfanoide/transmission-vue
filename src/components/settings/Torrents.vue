<template>
<div>
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
    }
}
</script>
