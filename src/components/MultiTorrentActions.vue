<template>
  <q-dialog v-model="showMultTorrentActions" seamless position="bottom">
    <q-card style="width: 100%">
      <q-card-section class="row items-center no-wrap">
        <div v-if="selectedTorrentsIds.length > 1">
          <div class="text-weight-bold">
            Apply action on multiple Torrents
          </div>
          <div class="text-grey"></div>
        </div>

        <q-space></q-space>
        <!-- TODO: Add a mark all btn? -->
        <!-- TODO: move to its own component -->
        <!-- TODO: finde better UX for all available torrent actions -->
        <q-btn
          flat
          round
          icon="youtube_searched_for"
          @click="reannounceSelectedTorrents">
          <q-tooltip anchor="top middle" :offset="[30, 30]">
            Reannounce (ask tracker for more peers)
          </q-tooltip>
        </q-btn>
        <q-btn
          flat
          round
          icon="library_add_check"
          @click="verifyLocalData">
          <q-tooltip anchor="top middle" :offset="[30, 30]">
            Verify Local Data
          </q-tooltip>
        </q-btn>

        <q-btn
          flat
          round
          icon="priority_high"
          @click="startTorrentsNow"
          >
          <q-tooltip anchor="top middle" :offset="[30, 30]">
            Start Now
          </q-tooltip>
        </q-btn>
        <q-btn
          flat
          round
          icon="play_arrow"
          @click="startTorrents"
          >
          <q-tooltip anchor="top middle" :offset="[30, 30]">
            Start
          </q-tooltip>
        </q-btn>
        <q-btn flat round icon="pause" @click="stopTorrents">
          <q-tooltip anchor="top middle" :offset="[30, 30]">
            Pause
          </q-tooltip>
        </q-btn>

        <q-btn
          flat
          round
          icon="delete"
          @click="
                  deleteTorrents({deleteFiles: false })
                  "
          >
          <q-tooltip anchor="top middle" :offset="[30, 30]">
            Remove
          </q-tooltip>
        </q-btn>
        <q-btn
          flat
          round
          icon="delete_forever"
          @click="
                  deleteTorrents({deleteFiles: true })
                  "
          >
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
  methods: {
    ...mapMutations('session', {
      clearSelectedTorrents: 'CLEAR_SELECTED_TORRENTS',
    }),
    ...mapActions("session", [
      "verifyLocalData",
      "startTorrentsNow",
      "startTorrents",
      "stopTorrents",
      "deleteTorrents"
    ])
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
