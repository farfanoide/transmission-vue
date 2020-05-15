<template>
  <q-list>
    <q-item-label header>
      Peers
    </q-item-label>
    <q-item v-for="( peer, index ) in peers" :key="`pier${index}`">
      {{peer}}
    </q-item>
  </q-list>
</template>

<script>
export default {
  name: 'PeersList',
  props: ['peers'],
}
</script>
