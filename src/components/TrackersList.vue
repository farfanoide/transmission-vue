<template>
  <div class="row">
    <div class="tier" v-for="tier in tiers" :key="`tier-${tier}`">
      <q-list>
        <q-item-label header>
          Tier {{tier}}
        </q-item-label>
        <q-item v-for="(tracker, index) in trackersByTier[tier]"
                :key="`tracker-${tier}-${index}`">
          <q-item-section avatar>
            <template v-if="faviconFor(tracker.host)">
              <q-avatar>
                <img :src="faviconFor(tracker.host)" :alt="tracker.host">
              </q-avatar>
            </template>
            <template v-else>
              <q-avatar color="primary" icon="track_changes" text-color="white">
                <!-- TODO: get favicon -->
              </q-avatar>
            </template>
          </q-item-section>
          <q-item-section>
            <q-item-label>
              <strong>
                {{tracker.announce}}
              </strong>
              <!-- TODO: add all tracker details -->
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import parseUri from '../lib/uri_parser'
import parseFavicon from 'parse-favicon'

export default {
  name: 'TrackersList',
  props: ['trackers'],
  mounted()
  {
    for (let tracker of this.trackers)
    {
      let uri = parseUri(tracker.host)
      let host = 'http://' + ((uri.host.split('.').length > 2) ?
        uri.host.substring(uri.host.indexOf('.') + 1) :
        uri.host)
      if (!this.trackerImages[tracker.host])
      {

        this.$http.get(host)
          .then(({ data: html }) => parseFavicon(html, {
            baseURI: host,
            allowUseNetwork: true,
            allowParseImage: true
          }))
          .then(response => {
            if (response.length >= 1)
            {
              this.addTrackerImage({
                tracker: tracker.host,
                imageUrl: response[0]['url']
              })
            }
          })
          .catch(console.log)
      }

    }
  },
  methods:
  {
    ...mapMutations('configs', {
      addTrackerImage: 'ADD_TRACKER_IMAGE',
    }),
    faviconFor: function (trackerUrl)
    {
      return this.trackerImages[trackerUrl]
    }
  },
  computed:
  {
    ...mapState('configs', ['trackerImages']),
    // TODO: allow to add and delete trackers
    tiers: function ()
    {
      return [...new Set(this.trackers.map(tracker => tracker.tier))]
    },
    trackersByTier: function ()
    {
      // Although not common, tiers might have more than one tracker so we
      // group them by tier.
      let trackersByTier = Object.fromEntries(this.tiers.map(tier => [tier, []]))
      for (const tracker of this.trackers)
      {
        trackersByTier[tracker.tier].push(tracker)
      }
      return trackersByTier
    }
  }
}
</script>
