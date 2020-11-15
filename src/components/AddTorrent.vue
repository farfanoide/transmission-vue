<template>
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
    <q-inner-loading :showing="loading">
      <q-spinner
        color="primary"
        size="3em"
        :thickness="2"
        />
    </q-inner-loading>
  </q-card>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
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
      tab: 'url',
      torrentUrl: null,
      torrentFile: null,
      loading: false,
    }
  },
  mounted()
  {
    // TODO: allow for this to be opt in
    // TODO: check compatibility with electron and mobile
    navigator.clipboard.readText()
      .then(text => {
        if (text.startsWith('http') || text.startsWith('magnet'))
        {
          // TODO: show icon or notification that clipboard has been pasted
          this.torrentUrl = text
        }
      })
      .catch(error => this.$q.notify({
        message: 'Sorry we couldnt fetch your clipboard contents.',
        color: 'negative',
      }))
  },
  methods:
  {
    ...mapMutations('session', {setSelectedTorrentId: 'SET_SELECTED_TORRENT_ID'}),
    handleError: function ({ message })
    {
      this.$q.notify({ color: 'negative', message: message })
      this.loading = false
    },
    handleSuccess: function (options)
    {
      // show notification all good
      this.resetForms()
      this.$q.notify(options)
      // close popup
      this.$refs["cancel-btn"].$el.click()
      this.loading = false
    },
    resetForms()
    {
      this.torrentUrl = ''
      this.torrentFile = null
    },
    addBase64: async function (blob)
    {
      //TODO: create external object to handle all of this so it can be reused
      // on bex context menus
      this.loading = true
      let base64Torrent = await BlobToBase64(blob)

      this.client.addBase64(base64Torrent)
        .then(success => {
          this.handleSuccess({
            message: `Torrent Successfully added: ${success.name}`,
            actions: [
              this.viewDetailsAction(success.id)
            ]
          }
          )})
        .catch(error => {
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
      this.loading = true
      // TODO: maybe add configuration to make this an opt out functionality
      if (this.torrentUrl.startsWith('http'))
      {
        this.downloadAndAddTorrent()
      } else {
        // handle as simple url or magnet
        this.client.addUrl(this.torrentUrl)
          .then(success => {
            this.handleSuccess({
              message: `Torrent Successfully added: ${success.name}`,
              actions: [
                this.viewDetailsAction(success.id)
              ]
            }
            )}
          )
          .catch(error => this.handleError({ message: 'Something went wrong' }) )
      }
    },
    addTorrentFromFile: function ()
    {
      // TODO: maybe add abilitty to load various files at once
      this.addBase64(this.torrentFile[0])
    },
    viewDetailsAction: function (id)
    {
      var self = this
      return {
        label: 'View Details',
        color: 'white',
        handler: () => { self.setSelectedTorrentId(id) }
      }
    }
  },
  computed:
  {
    ...mapGetters('configs', ['client']),
  }

}
</script>
