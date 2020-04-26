<template>
  <div>
    <ul>
      <li v-for="filter in filters"
          @click="toggleFilter(filter)"
          :key="filter"
          :class="{active: isActive(filter)}">
        <!-- TODO: add filter.icon -->
        {{filter.name}}
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'TorrentFilters',
  data() {
    return {
      // TODO: add search input to filter by name
      // TODO: move filters to vuex
      activeFilter: null,
      filters: [
        {icon: 'eye', name: 'All'},
        {icon: 'eye', name: 'Active'},
        {icon: 'eye', name: 'Downloading'},
        {icon: 'eye', name: 'Seeding'},
        {icon: 'eye', name: 'Paused'},
        {icon: 'eye', name: 'Finished'},
      ],
    }
  },
  methods: {
    toggleFilter: function (filter)
    {
      this.activeFilter = (this.isActive(filter)) ? null : filter
    },
    isActive: function (filter)
    {
      return this.activeFilter == filter
    }
  },
  computed: {
    // TODO: add computed property that recalculates trackers only when new
    // torrents are added/removed
  }
}
</script>
