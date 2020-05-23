<template>
  <div class="text-right">
    <div class="torrent-actions" :class="{'show-extra': showExtra}">

      <template v-if="isPaused">
        <q-btn icon="play_arrow"
               flat dense
               size="sm"
               @click="startTorrents([torrentId])">
          <q-tooltip anchor="top middle" :offset="[30, 30]">
            Start
          </q-tooltip>
        </q-btn>
      </template>

      <template v-else>
        <q-btn flat dense
               size="sm"
               icon="pause" @click="stopTorrents([torrentId])">
          <q-tooltip anchor="top middle" :offset="[30, 30]">
            Pause
          </q-tooltip>
        </q-btn>
      </template>

      <q-btn icon="youtube_searched_for"
             flat dense
             size="sm"
             v-if="showExtra"
             @click="reannounceTorrents([torrentId])">
        <q-tooltip anchor="top middle" :offset="[30, 30]">
          Reannounce (ask tracker for more peers)
        </q-tooltip>
      </q-btn>

      <q-btn icon="library_add_check"
             flat dense
             size="sm"
             v-if="showExtra"
             @click="verifyTorrents([torrentId])">
        <q-tooltip anchor="top middle" :offset="[30, 30]">
          Verify Local Data
        </q-tooltip>
      </q-btn>

      <q-btn icon="priority_high"
             flat dense
             size="sm"
             v-if="showExtra"
             @click="startTorrentsNow([torrentId])">
        <q-tooltip anchor="top middle" :offset="[30, 30]">
          Start Now
        </q-tooltip>
      </q-btn>

      <q-btn icon="delete"
             flat dense
             size="sm"
             v-if="showExtra"
             @click="confirmDelete({deleteFiles: false})">
        <q-tooltip anchor="top middle" :offset="[30, 30]">
          Remove
        </q-tooltip>
      </q-btn>

      <q-btn icon="delete_forever"
             flat dense
             size="sm"
             v-if="showExtra"
             @click="confirmDelete({deleteFiles: true})">
        <q-tooltip anchor="top middle" :offset="[30, 30]">
          Delete Files and Remove
        </q-tooltip>
      </q-btn>

      <q-btn flat dense
             size="sm"
             v-if="showExtra" icon="close" @click="showExtra = !showExtra">
        <q-tooltip anchor="top middle" :offset="[30, 30]">
          Cancel
        </q-tooltip>
      </q-btn>

      <q-btn flat dense
             size="sm"
             v-if="!showExtra"
             icon="more_vert"
             @click="showExtra = !showExtra">
        <q-tooltip anchor="center left" self="center middle" :offset="[60, 30]">
          Show More Options
        </q-tooltip>
      </q-btn>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

// TODO: handle a loading state to disable all buttons while another one has been called
export default {
  name: 'TorrentActions',
  props: ['torrentId', 'isPaused'],
  data()
  {
    return {
      showExtra: false
    }
  },
  methods:
  {
    ...mapActions("session", [
      "deleteTorrents",
      "reannounceTorrents",
      "startTorrents",
      "startTorrentsNow",
      "stopTorrents",
      "verifyTorrents",
    ]),
    confirmDelete: function ({ deleteFiles })
    {
      this.$q.dialog({
        title: 'Confirm',
        message: `Are you sure you want to delete this torrent ${deleteFiles ? 'and all of its files' : ''}?`,
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.deleteTorrents({
          torrentIds: [this.torrentId],
          deleteFiles: deleteFiles,
        })
      })

    },
  }
}
</script>

<style>

.torrent-actions {
  border-radius: .2em;
  display: inline-block;
  padding: .3em;
}

.torrent-actions.show-extra {
  border: 1px solid rgba(0, 0, 0, 0.3);
}
</style>

