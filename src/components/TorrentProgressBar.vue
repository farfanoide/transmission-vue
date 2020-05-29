<template>
  <div class="row items-baseline q-pb-md">
    <div v-if="showIcon" class="col-1" style="max-width: 30px;">
      <q-icon class="q-pt-xs"
              :name="torrent.isPaused() ? 'pause' : 'play_arrow'"
              :color="progressColor">
        <q-tooltip anchor="top middle" :offset="[30, 30]">
          {{torrent.status | statusName}}
        </q-tooltip>
      </q-icon>
    </div>

    <div class="col">
      <q-linear-progress class="q-mt-md"
                         rounded :color='progressColor'
                         :value="torrent.percentDone"
                         :size="size || '10px'">

        <q-tooltip anchor="top middle" :offset="[30, 30]">
          {{ torrent.percentDone | fullPercentString }}
        </q-tooltip>

      </q-linear-progress>
    </div>
  </div>
  <!-- TODO: check how to add  gradient to progressbars -->
  <!-- style="background: linear&#45;gradient(145deg,#1976d2 11%,#0f477e 75%)"  -->
  <!-- idea: backound should be full progressbar with gradient, while
    the filled progressbar has a css filter that changes background
    into black and white -->
</template>
<script>
export default {
  name: 'TorrentProgressBar',
  props: ['torrent', 'size', 'show-icon'],
  data()
  {
    return {
      statusColors: {
        STOPPED:       'blue-grey-6',
        CHECK_WAIT:    'blue-grey-6',
        CHECK:         'warning',
        DOWNLOAD_WAIT: 'teal-6',
        DOWNLOAD:      'blue',
        SEED_WAIT:     'cyan-6',
        SEED:          'positive',
        ISOLATED:      'blue-2',
      }
    }
  },
  computed:
  {
    progressColor: function ()
    {
      return this.statusColors[this.torrent.status]
    }
  }
}
</script>
