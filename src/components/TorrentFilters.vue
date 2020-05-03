<template>
  <div class="q-pa-md">
    <q-btn-dropdown flat icon="filter_list">

      <q-list>
        <q-item-label header>
          Filter by Name
        </q-item-label>
        <q-item>
          <q-item-section>
            <q-input dense outlined v-model="localFilters.nameFilter" >
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
        <q-item v-for="filter in filters" :key="`filter-${filter.value}`" tag="label" v-ripple>
          <q-item-section>
            <q-item-label>
              <q-icon :name="filter.icon"></q-icon>
              {{filter.label}}
            </q-item-label>
          </q-item-section>
          <q-item-section avatar>
            <q-toggle color="blue" v-model="localFilters.statusFilters" :val="filter.value" />
          </q-item-section>
        </q-item>
      </q-list>

      <q-separator></q-separator>

      <q-btn class="full-width"
             align="between"
             icon-right="clear"
             @click="clearFilters">
        Clear
      </q-btn>
    </q-btn-dropdown>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex'
import { extend } from 'quasar'
import RPCReference from '../lib/rpc'

export default {
  name: 'TorrentFilters',
  data() {
    return {
      localFilters: {
        nameFilter: '',
        statusFilters: [],
      },
      filters: [
        {
          icon: 'swap_vert',
          value: 'Active',
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
          value: 'Finished',
          label: 'Finished'
        },

      ],
    }
  },
  created()
  {
    this.updateLocalFilters()
  },
  watch:
  {
    activeFilters: {
      deep: true,
      handler: 'updateLocalFilters',
    },
    localFilters: {
      deep: true,
      handler: function () {
        this.updateActiveFilters(extend(true, {}, this.localFilters))
      },
    },
  },

  methods: {
    ...mapMutations('session', {
      updateActiveFilters: 'UPDATE_ACTIVE_FILTERS',
      clearFilters: 'CLEAR_FILTERS',
    }),
    updateLocalFilters: function ()
    {
      this.localFilters = extend(true, this.localFilters, this.activeFilters)
    }
  },
  computed: {
    ...mapState('session', ['activeFilters']),
    ...mapGetters('session', ['filteredTorrents']),
    // TODO: add computed property that recalculates trackers only when new
    // torrents are added/removed
  }
}
</script>
