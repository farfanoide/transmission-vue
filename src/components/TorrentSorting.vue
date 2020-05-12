<template>
  <span class="q-mx-sm q-px-sm">
    <!-- TODO: make this not look so hideous -->
    <label for="">Sort By:</label>
    <br>
    <select v-model="sortBy">
      <option v-for="option in sortOptions" :value="option.slug" :key="`sort-${option.slug}`">
      {{option.name}}
      </option>
    </select>
    <label for="">Reverse</label>
    <input type="checkbox" v-model="reverse">
  </span>
</template>
<script>
import { mapMutations, mapState } from 'vuex'

export default {
  name: 'TorrentSorting',
  data()
  {
    return {
      sortOptions: [
        {
          slug: 'dateCreated',
          name: 'Date Created',
        },
        {
          slug: 'size',
          name: 'Size'
        },
        {
          slug: 'name',
          name: 'Name',
        },
        {
          slug: 'queue',
          name: 'Queue Order',
        },
        {
          slug: 'percentDone',
          name: 'Percent Done',
        }
      ],
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
        return this.sorting.sortBy
      },
      set: function (sort)
      {
        this.updateSortBy(sort)
      }
    }
  }

}
</script>
