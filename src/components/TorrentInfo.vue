<template>
  <div>
    <strong>
      {{torrent.name}}
    </strong>
    <!-- TODO: add more data -->
  </div>
</template>

<script>
export default {
  name: 'TorrentInfo',
  props: ['torrent'],
}
</script>

