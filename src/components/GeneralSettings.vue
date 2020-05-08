<template>

  <div class="row">
    <div class="col-2">
        <q-tabs
          v-model="tab"
          vertical
          class="text-teal"
        >
          <q-tab name="torrents" icon="cloud_download" label="torrents" />
          <q-tab name="speed" icon="speed" label="speed" />
          <q-tab name="peers" icon="group" label="peers" />
          <q-tab name="network" icon="swap_horiz" label="network" />

        </q-tabs>
    </div>
    <div class="col">
        <q-tab-panels
          v-model="tab"
          animated
          swipeable
          vertical
          transition-prev="jump-up"
          transition-next="jump-up"
        >
          <q-tab-panel name="torrents">
            <div class="text-h4 q-mb-md">Torrents</div>
            <p> Under construction </p>
          </q-tab-panel>

          <q-tab-panel name="speed">
            <div class="text-h4 q-mb-md">Speed</div>
            <p> Under construction </p>
          </q-tab-panel>

          <q-tab-panel name="peers">
            <div class="text-h4 q-mb-md">peers</div>
            <p> Under construction </p>
          </q-tab-panel>
          <q-tab-panel name="network">
            <div class="text-h4 q-mb-md">Network</div>
            <p> Under construction </p>
          </q-tab-panel>
        </q-tab-panels>
    </div>
  </div>
</template>

<script>
export default {
    name: "GeneralSettings",
    data () {
    return {
      tab: 'torrents'
    }
  }
}
</script>