<template>
  <div>
    <h1>Torrent Options</h1>
    <dl>
      <dt>Priority</dt>
      <dd>
      <torrent-priority :torrent="torrent"></torrent-priority>
      </dd>
    </dl>
  </div>

</template>

<script>
import TorrentPriority from './torrent_options/TorrentPriority'

export default {
  name: 'TorrentOptions',
  props: ['torrent'],
  components:
  {
    TorrentPriority,
  }
}
</script>
