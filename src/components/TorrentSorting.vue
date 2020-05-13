<template>
  <q-list>
    <q-item-label header>
      Sort By
    </q-item-label>
    <q-item>
      <q-item-section>
        <q-select v-model="sortBy" :options="sortOptions" dense borderless>
            <template v-slot:selected>
              <q-avatar :icon="sortBy.icon"></q-avatar>
              {{ sortBy.label }}
            </template>
          <template v-slot:option="scope">
            <q-item v-bind="scope.itemProps"
                    v-on="scope.itemEvents">
              <q-item-section avatar>
                <q-icon :name="scope.opt.icon" />
              </q-item-section>
              <q-item-section>
                <q-item-label>
                  {{scope.opt.label}}
                </q-item-label>
              </q-item-section>
            </q-item>
          </template>
        </q-select>
      </q-item-section>
    </q-item>
    <q-item tag='label' v-ripple dense>
      <q-item-section>
        <q-item-label>
          Reverse
        </q-item-label>
      </q-item-section>
      <q-item-section avatar>
        <q-toggle v-model="reverse" color='blue' dense>
        </q-toggle>
      </q-item-section>
    </q-item>
  </q-list>
</template>
<script>
import { mapMutations, mapState } from 'vuex'
import { SortReference } from  '../lib/sorted_torrents'

export default {
  name: 'TorrentSorting',
  data()
  {
    return {
      sortOptions: SortReference.options,
    }
  },
  methods:
  {
    ...mapMutations('session', {
      updateSortBy: 'UPDATE_SORT_BY',
      updateSortReversed: 'UPDATE_SORT_REVERSED',
    })
  },
  computed:
  {
    ...mapState('session', ['sorting']),
    reverse:
    {
      get: function ()
      {
        return this.sorting.reverse
      },
      set: function (reverse)
      {
        this.updateSortReversed(reverse)
      }
    },
    sortBy:
    {
      get: function ()
      {
        return this.sortOptions.find((option) => option.value === this.sorting.sortBy)
      },
      set: function (sort)
      {
        this.updateSortBy(sort.value)
      }
    }
  }

}
</script>
