<template>
  <div>
    <q-btn icon="add" @click="showModal = !showModal" flat round>
    </q-btn>

    <q-dialog v-model="showModal">
      <q-card style="width: 700px; max-width: 80vw;">
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">
            Add Torrent
          </div>
          <q-space></q-space>
          <q-btn icon="close" flat round dense v-close-popup ref='cancel-btn'>
          </q-btn>
        </q-card-section>

        <q-card-section>
          <q-tabs v-model="tab"
                  dense
                  class="text-grey"
                  active-color="primary"
                  indicator-color="primary"
                  align="justify"
                  narrow-indicator>
            <q-tab name='url' label="URL"></q-tab>
            <q-tab name='search' label="Search"></q-tab>
            <q-tab name='file' label="File"></q-tab>
            <q-tab name='create' label="Create"></q-tab>
          </q-tabs>
          <q-separator></q-separator>
          <q-tab-panels v-model="tab" animated>

            <q-tab-panel name="url">
              <div class="text-h6">Url</div>
              <q-input v-model="torrentUrl"></q-input>
              <q-btn @click="addTorrentFromUrl">Add</q-btn>
            </q-tab-panel>

            <q-tab-panel name="search">
              <torrent-search></torrent-search>
            </q-tab-panel>

            <q-tab-panel name="file">
              <div class="text-h6">File</div>
              <q-input type='file'
                       v-model='torrentFile'
                       accept=".torrent">
              </q-input>
              <q-btn @click="addTorrentFromFile">Add</q-btn>
            </q-tab-panel>

            <q-tab-panel name="create">
              <div class="text-h6">Create</div>
              <p>
              Under Construction
              </p>
              <!-- <q&#45;input type='create' v&#45;model='torrentCreate'></q&#45;input> -->
              <!-- <q&#45;btn @click="addTorrentFromCreate">Add</q&#45;btn> -->
            </q-tab-panel>

          </q-tab-panels>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'
import TorrentSearch from './TorrentSearch'
import { BlobToBase64 } from '../lib/utils'

export default {
  name: 'AddTorrent',
  components:
  {
    TorrentSearch,
  },
  data()
  {
    return {
      showModal: false,
      tab: 'url',
      torrentUrl: null,
      torrentFile: null,
    }
  },
  methods:
  {
    handleError: function ({ message })
    {
      this.$q.notify({ color: 'negative', message: message })
    },
    handleSuccess: function (options)
    {
      // show notification all good
      this.resetForms()
      this.$q.notify(options)
      // close popup
      this.$refs["cancel-btn"].$el.click()
    },
    resetForms()
    {
      this.torrentUrl = ''
      this.torrentFile = null
    },
    addBase64: async function (blob)
    {
      let base64Torrent = await BlobToBase64(blob)

      this.client.addBase64(base64Torrent)
        .then(success => {
          this.handleSuccess({message: 'Torrent Successfully added'})
        }).catch(error => {
          this.handleError({ message: error.message })
        })
    },
    downloadAndAddTorrent: function ()
    {
      // TODO: make sure downloaded file is actually a torrent
      this.$http.get(this.torrentUrl, {responseType: 'blob'})
        .then(response => this.addBase64(response.data))
        .catch(error => this.handleError({message: error.message}))

    },
    addTorrentFromUrl: function ()
    {
      // TODO: maybe add configuration to make this an opt out functionality
      if (this.torrentUrl.startsWith('http'))
      {
        return this.downloadAndAddTorrent()
      } else {
        // handle as simple url or magnet
        this.client.addUrl(this.torrentUrl)
          .then(success => this.handleSuccess({ message: 'Torrent Successfully added' }))
          .catch(error => this.handleError({ message: 'Something went wrong' }) )
      }
    },
    addTorrentFromFile: function ()
    {
      // TODO: maybe add abilitty to load various files at once
      this.addBase64(this.torrentFile[0])
    }
  },
  computed:
  {
    ...mapState('configs', [
      'client',
    ]),
  }

}
</script>
