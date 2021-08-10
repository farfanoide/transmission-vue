<template>
  <!-- TODO: add configurable or fluid dimensions -->
  <canvas ref="chartCanvas" height="140px" style="width: 100%">
  </canvas>
</template>

<script>
import { SmoothieChart, TimeSeries } from 'smoothie'

export default {
  name: 'NetworkChart',
  props: ['uploadRate', 'downloadRate', 'bandwidthLimited'],
  // TODO: split bandwidthLimited into uploadLimited and downlaodLimited to
  // account for usage per torrent instead of session wide
  data ()
  {
    return {
      smoothie: null,
      interval: null,
      seriesIndex: { downloadGraph: 0, uploadGraph: 1 },
    }
  },
  beforeUnmount()
  {
    clearInterval(this.interval)
  },
  mounted()
  {
    var downloadGraph = new TimeSeries();
    var uploadGraph = new TimeSeries();
    var self = this

    // TODO: configure interval just like the client maybe?
    this.interval = setInterval(function() {
      downloadGraph.append(new Date().getTime(), self.downloadRate);
      uploadGraph.append(new Date().getTime(), self.uploadRate);
    }, 1000);

    this.smoothie = new SmoothieChart({
      labels: {disabled: true},
      grid: {
        strokeStyle: 'transparent',
        fillStyle: 'transparent',
        lineWidth: 0,
        millisPerLine: 0,
        verticalSections: 0
      }
    });

    // TODO: add configurable colors or matche them to the current style
    this.smoothie.addTimeSeries(downloadGraph, this.downloadGraphColors);
    this.smoothie.addTimeSeries(uploadGraph, this.uploadGraphColors);

    this.smoothie.streamTo(this.$refs.chartCanvas, 1000);
  },
  methods:
  {
    toggleAltSpeedColors: function ()
    {
      this.smoothie.seriesSet[this.seriesIndex.downloadGraph].options = this.downloadGraphColors
      this.smoothie.seriesSet[this.seriesIndex.uploadGraph].options = this.uploadGraphColors
    }
  },
  watch:
  {
    'bandwidthLimited': 'toggleAltSpeedColors',
  },
  computed:
  {
    downloadGraphColors: function ()
    {
      return {
        strokeStyle: this.bandwidthLimited ? 'rgb(255, 0, 0)' : 'rgb(0, 255, 0)',
        fillStyle: this.bandwidthLimited ? 'rgba(255, 0, 0, 0.4)' : 'rgba(0, 255, 0, 0.4)',
        lineWidth: 2
      }
    },
    uploadGraphColors: function ()
    {
      return {
        // TODO: find some kind of violet for alt speed upload
        strokeStyle: this.bandwidthLimited ?  'rgb(44, 133, 244)' : 'rgb(44, 133, 244)',
        fillStyle: this.bandwidthLimited ? 'rgba(44, 133, 244, 0.3)' : 'rgba(44, 133, 244, 0.3)',
        lineWidth: 2
      }
    }
  }
}
</script>
