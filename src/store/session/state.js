export default function () {
  return {
    data: {}, // TODO: rename to session or something better
    stats: {},
    torrents: {},
    activeTorrentsIds: [],
    selectedTorrentsIds: [],
    activeFilters: {
      nameFilter: '',
      statusFilter: 'ALL',
    },
    sorting: {
      sortBy: 'queue',
      reverse: false,
    }
    // TODO: maybe store last filters and sorting on localstorage but it should
    // probably be per server
  }
}
