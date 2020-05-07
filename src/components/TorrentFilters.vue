<template>
  <div class="q-pa-md">
      <q-list>
        <q-item-label header>
          Filter by Name
        </q-item-label>
        <!-- TODO: add ? icon to show info on how filters are applied -->
        <q-item>
          <q-item-section>
            <q-input dense outlined v-model="nameFilter" >
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
          </q-item-section>
        </q-item>
      </q-list>

      <q-list>
        <q-item-label header>
          Filter by Status
        </q-item-label>
        <q-item v-for="filter in filters" :key="`filter-${filter.value}`" tag="label" v-ripple dense>
          <q-item-section>
            <q-item-label>
              <q-icon :name="filter.icon"></q-icon>
              {{filter.label}}
            </q-item-label>
          </q-item-section>
          <q-item-section avatar>
            <q-toggle color="blue" v-model="statusFilters" :val="filter.value" />
          </q-item-section>
        </q-item>
      </q-list>

      <q-separator></q-separator>

      <q-btn class="full-width"
             align="between"
             icon-right="clear"
             @click="clearFilters"
             v-if="anyActiveFilters">
        Clear
      </q-btn>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex'
import RPCReference from '../lib/rpc'

export default {
  name: 'TorrentFilters',
  data() {
    return {
      filters: [
        {
          icon: 'swap_vert',
          value: 'ACTIVE',
          label: 'Active'
        },
        {
          icon: 'arrow_downward',
          value: RPCReference.status.DOWNLOAD,
          label: 'Downloading'
        },
        {
          icon: 'arrow_upward',
          value: RPCReference.status.SEED,
          label: 'Seeding'
        },
        {
          icon: 'pause',
          value:RPCReference.status.STOPPED,
          label: 'Paused'
        },
        {
          icon: 'check',
          value: 'FINISHED',
          label: 'Finished'
        },

      ],
    }
  },
  methods: {
    ...mapMutations('session', {
      updateNameFilter: 'UPDATE_NAME_FILTER',
      updateStatusFilters: 'UPDATE_STATUS_FILTERS',
      clearFilters: 'CLEAR_FILTERS',
    }),
  },
  computed: {
    ...mapState('session', ['activeFilters']),
    nameFilter: {
      get: function ()
      {
        return this.activeFilters.nameFilter
      },
      set: function (nameSubstring)
      {
        this.updateNameFilter(nameSubstring)
      }
    },
    statusFilters: {
      get: function ()
      {
        return this.activeFilters.statusFilters
      },
      set: function (filters)
      {
        this.updateStatusFilters(filters)
      }
    },
    anyActiveFilters: function ()
    {
      return this.nameFilter || this.statusFilters.length > 0
    },
    // TODO: add computed property that recalculates trackers only when new
    // torrents are added/removed
  }
}
</script>
