<template>
  <!-- TODO: add configurable or fluid dimensions -->
  <canvas ref="chartCanvas" height="140px" style="width: 100%"></canvas>
</template>

<script>
import { SmoothieChart, TimeSeries } from 'smoothie'

export default {
  name: 'NetworkChart',
  props: ['uploadRate', 'downloadRate'],
  data ()
  {
    return {
      smoothie: null,
      interval: null,
    }
  },
  beforeDestroy()
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
      grid: { strokeStyle: 'rgb(0, 0, 0)',
        fillStyle: 'transparent',
        lineWidth: 0,
        millisPerLine: 0,
        verticalSections: 0
      }
    });

    // TODO: add configurable colors or matche them to the current style
    this.smoothie.addTimeSeries(downloadGraph, {
      strokeStyle: 'rgb(0, 255, 0)',
      fillStyle: 'rgba(0, 255, 0, 0.4)',
      lineWidth: 2
    });
    this.smoothie.addTimeSeries(uploadGraph, {
      strokeStyle: 'rgb(44, 133, 244)',
      fillStyle: 'rgba(44, 133, 244, 0.3)',
      lineWidth: 2
    });

    this.smoothie.streamTo(this.$refs.chartCanvas, 1000);
  },
}
</script>
