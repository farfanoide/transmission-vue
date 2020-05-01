<template>
  <q-dialog v-model="showMultTorrentActions" seamless position="bottom">
    <q-card style="width: 100%">
      <q-card-section class="row items-center no-wrap">
        <div>
          <div class="text-weight-bold">
            Apply action on multiple Torrents
          </div>
          <div class="text-grey"></div>
        </div>

        <q-space></q-space>

        <!-- TODO: move to its own component -->
        <q-btn
          flat
          round
          icon="priority_high"
          @click="startTorrentsNow(selectedTorrents)"
        >
          <q-tooltip anchor="top middle" :offset="[30, 30]">
            Start Now
          </q-tooltip>
        </q-btn>
        <q-btn
          flat
          round
          icon="play_arrow"
          @click="startTorrents(selectedTorrents)"
        >
          <q-tooltip anchor="top middle" :offset="[30, 30]">
            Start
          </q-tooltip>
        </q-btn>
        <q-btn flat round icon="pause" @click="stopTorrents(selectedTorrents)">
          <q-tooltip anchor="top middle" :offset="[30, 30]">
            Pause
          </q-tooltip>
        </q-btn>

        <q-btn
          flat
          round
          icon="delete"
          @click="
            deleteTorrents({ torrentIds: selectedTorrents, deleteFiles: false })
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
            deleteTorrents({ torrentIds: selectedTorrents, deleteFiles: true })
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
      "startTorrentsNow",
      "startTorrents",
      "stopTorrents",
      "deleteTorrents"
    ])
  },
  //TODO:use selected torrents within vuex store
  computed: {
    ...mapGetters("session", ["selectedTorrents"]),
    showMultTorrentActions: function() {
      return this.selectedTorrents.length > 0;
    }
  }
};
</script>
