<template>
  <div>
    <q-btn flat size="sm">
      Remove
    </q-btn>
    <br>
    <q-btn flat size="sm">
      Pause
    </q-btn>
    <br>
    <q-btn flat size="sm">
      Restart
    </q-btn>
    <!-- TODO: A `Share` button would be nice -->
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'TorrentActions',
  props: ['torrent', 'torrentPresenter'],
}
</script>


