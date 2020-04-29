<template>
  <div>
    <q-btn flat size="sm" disabled>
      Remove
    </q-btn>
    <br>
    <q-btn flat size="sm" disabled>
      Pause
    </q-btn>
    <br>
    <q-btn flat size="sm" disabled>
      Restart
    </q-btn>
    <!-- TODO: A `Share` button would be nice -->
  </div>
</template>

<script>
export default {
  name: 'TorrentActions',
  props: ['torrent', 'torrentPresenter'],
}
</script>


