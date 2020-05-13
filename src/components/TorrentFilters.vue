<template>
  <div>
    <q-list>
      <!-- TODO: add ? icon to show info on how filters are applied -->
      <q-item>
        <q-item-section>
          <q-input rounded standout dark dense
                   placeholder="Filter by Name"
                   input-class="text-left"
                   clearable
                   v-model="nameFilter">

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
      <q-item tag="label" v-ripple dense>
        <q-item-section>
          <q-select v-model='statusFilter' :options="filters" dense>
          </q-select>
        </q-item-section>
      </q-item>
    </q-list>

    <q-separator></q-separator>

    <q-btn class="full-width"
           align="between"
           icon-right="clear"
           flat
           @click="clearFilters"
           v-if="anyActiveFilters">
      Clear All
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
          icon: 'asterisk',
          value: 'ALL',
          label: 'All'
        },
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
        {
          icon: 'warning',
          value: 'ERROR',
          label: 'Has Error'
        },
        {
          icon: 'disc_full',
          value: 'CHECK',
          label: 'Verifying'
        }
      ],
    }
  },
  methods: {
    ...mapMutations('session', {
      updateNameFilter: 'UPDATE_NAME_FILTER',
      updateStatusFilter: 'UPDATE_STATUS_FILTER',
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
    statusFilter: {
      get: function ()
      {
        return this.filters.find((option) => option.value === this.activeFilters.statusFilter)
      },
      set: function (option)
      {
        this.updateStatusFilter(option.value)
      }
    },
    anyActiveFilters: function ()
    {
      return this.nameFilter || this.activeFilters.statusFilter !== 'ALL'
    },
    // TODO: add computed property that recalculates trackers only when new
    // torrents are added/removed
  }
}
</script>
