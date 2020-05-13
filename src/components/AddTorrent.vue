<template>
  <div>
    <q-btn icon="add" @click="showModal = !showModal">
    </q-btn>

    <q-dialog v-model="showModal">
      <q-card>
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">
            Add Torrent
          </div>
          <q-space></q-space>
          <q-btn icon="close" flat round dense v-close-popup >
          </q-btn>
        </q-card-section>

        <q-card-section>
          <q-tabs
            v-model="tab"
            dense
            class="text-grey"
            active-color="primary"
            indicator-color="primary"
            align="justify"
            narrow-indicator>
            <q-tab name='url' label="URL"></q-tab>
            <q-tab name='file' label="File"></q-tab>
          </q-tabs>
          <q-separator></q-separator>
          <q-tab-panels v-model="tab" animated>
            <q-tab-panel name="url">
              <div class="text-h6">Url</div>
              <q-input v-model="torrentUrl"></q-input>
              <q-btn @click="addTorrentFromUrl">Add</q-btn>
            </q-tab-panel>

            <q-tab-panel name="file">
              <div class="text-h6">File</div>
              <q-input type='file' v-model='torrentFile'></q-input>
              <q-btn @click="addTorrentFromFile">Add</q-btn>
            </q-tab-panel>

          </q-tab-panels>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import TransmissionService from '../services/transmission_service';

export default {
  name: 'AddTorrent',
  data()
  {
    return {
      showModal: false,
      tab: 'url',
      service: null,
      torrentUrl: null,
      torrentFile: null,
    }
  },
  mounted()
  {
    this.service = new TransmissionService(
      Object.assign({store: this.$store}, this.currentServer)
    )
  },
  methods:
  {
    addTorrentFromUrl: function ()
    {
      this.service.addTorrentFromUrl(this.torrentUrl)
        .then(console.log)
        .catch(console.log)
      // TODO:  download url and send it as file or base64
    },
    addTorrentFromFile: function ()
    {
      this.service.addTorrentFromFile(this.torrentFile)
        .then(console.log)
        .catch(console.log)
    }

  },
  computed:
  {
    ...mapState('configs', ['currentServer']),
  }

}
</script>
