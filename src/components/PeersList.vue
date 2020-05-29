<template>
  <table class="peers-table">
    <thead>
      <tr class="justify-between">
        <th><!-- Flag --></th>
        <th>IP Address</th>
        <th>Client</th>
        <th>Peer Status</th>
        <th>Percent Done</th>
        <th>Download Rate</th>
        <th>Upload Rate</th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="peer in peers" :key="peer.ip" class="justify-between">
        <td>
          <country-flag :country="flagFor(peer.address)"></country-flag>
        </td>
        <td>{{peer.address}}</td>
        <td>{{peer.clientName}}</td>
        <td>{{peer.flagStr}}</td>
        <td>{{peer.progress|toPercent|percentString}}%</td>
        <td>{{peer.rateToClient | speedBps}}</td>
        <td>{{peer.rateToPeer | speedBps}}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import CountryFlag from 'vue-country-flag'
import CountryMask from '../lib/country_mask'

export default {
  name: 'PeersList',
  props: ['peers'],
  components:
  {
    CountryFlag,
  },
  mounted()
  {
    let countryMask

    for (const peer of this.peers)
    {
      countryMask = CountryMask(peer.address)

      if (!this.countriesByMask[countryMask])
      {
        // TODO: get geobyttes key
        this.$http.get(`https://secure.geobytes.com/GetCityDetails?key=7c756203dbb38590a66e01a5a3e1ad96&fqcn=${peer.address}`)
          .then(response => {
            this.updateCountriesByMask({
              mask: countryMask,
              country: {
                code: response.data.geobytesinternet,
                name: response.data.geobytescountry,
              }
            })
          })
      }
    }
  },
  computed:
  {
    ...mapState('countryflags', ['countriesByMask']),
  },
  methods:
  {
    ...mapMutations('countryflags', {
      updateCountriesByMask: 'UPDATE_COUNTRIES_BY_MASK',
      clearCountriesByMask: 'CLEAR_COUNTRIES_BY_MASK',
    }),
    flagFor: function (address)
    {
      let countryMask = CountryMask(address)
      return (this.countriesByMask[countryMask] || {code: '', country: null}).code.toLowerCase()
    }
  },
}
</script>

<style>
.peers-table {
  width: 100%;
  text-align: left;
}
</style>
