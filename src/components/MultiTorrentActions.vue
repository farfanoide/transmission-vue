<template>
  <q-dialog v-model="showMultTorrentActions" seamless position="bottom">
    <q-card style="width: 100%">

      <q-card-section class="row items-center no-wrap">

        <div v-if="selectedTorrentsIds.length > 1">
          <div class="text-weight-bold">
            Apply action on multiple Torrents
          </div>
        </div>

        <q-space></q-space>
        <!-- TODO: Add a mark all btn? -->
        <!-- TODO: move to its own component -->
        <!-- TODO: finde better UX for all available torrent actions -->
        <q-btn icon="youtube_searched_for"
               flat round
               @click="reannounceSelectedTorrents">
          <q-tooltip anchor="top middle" :offset="[30, 30]">
            Reannounce (ask tracker for more peers)
          </q-tooltip>
        </q-btn>
        <q-btn icon="library_add_check"
               flat round
               @click="verifySelectedTorrents">
          <q-tooltip anchor="top middle" :offset="[30, 30]">
            Verify Local Data
          </q-tooltip>
        </q-btn>

        <q-btn icon="priority_high"
               flat round
               @click="startSelectedTorrentsNow">
          <q-tooltip anchor="top middle" :offset="[30, 30]">
            Start Now
          </q-tooltip>
        </q-btn>

        <q-btn icon="play_arrow"
               flat round
               @click="startSelectedTorrents">
          <q-tooltip anchor="top middle" :offset="[30, 30]">
            Start
          </q-tooltip>
        </q-btn>

        <q-btn flat round icon="pause" @click="stopSelectedTorrents">
          <q-tooltip anchor="top middle" :offset="[30, 30]">
            Pause
          </q-tooltip>
        </q-btn>

        <q-btn icon="delete"
               flat round
               @click="confirmDelete({deleteFiles: false })">
          <q-tooltip anchor="top middle" :offset="[30, 30]">
            Remove
          </q-tooltip>
        </q-btn>

        <q-btn icon="delete_forever"
               flat round
               @click="confirmDelete({deleteFiles: true })">
          <q-tooltip anchor="top middle" :offset="[30, 30]">
            Delete Files and Remove
          </q-tooltip>
        </q-btn>

        <q-space></q-space>

        <q-btn flat round icon="close" @click="clearSelectedTorrents">
          <q-tooltip anchor="top middle" :offset="[30, 30]">
            Cancel
          </q-tooltip>
        </q-btn>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
export default {
  name: "MultiTorrentActions",
  methods:
  {
    ...mapMutations('session', {
      clearSelectedTorrents: 'CLEAR_SELECTED_TORRENTS',
    }),
    ...mapActions("session", [
      "deleteSelectedTorrents",
      "reannounceSelectedTorrents",
      "startSelectedTorrents",
      "startSelectedTorrentsNow",
      "stopSelectedTorrents",
      "verifySelectedTorrents",
    ]),
    confirmDelete: function ({ deleteFiles })
    {
      this.$q.dialog({
        title: 'Confirm',
        message: `Are you sure you want to delete this torrents ${deleteFiles ? 'and all of its files' : ''}?`,
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.deleteSelectedTorrents({ deleteFiles })
      })

    },
  },
  //TODO:use selected torrents within vuex store
  computed: {
    ...mapGetters("session", ["selectedTorrentsIds"]),
    showMultTorrentActions: function() {
      return this.selectedTorrentsIds.length > 0;
    }
  }
};
</script>
