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
            <q-avatar color="primary" text-color="white">
              <!-- TODO: get favicon -->
            </q-avatar>
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
export default {
  name: 'TrackersList',
  props: ['trackers'],
  computed:
  {
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
