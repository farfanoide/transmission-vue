export default function () {
  return {
    data: {}, // TODO: rename to session or something better
    stats: {},
    torrents: {},
    activeTorrentsIds: [],
    selectedTorrentsIds: [], // used for multi actions
    selectedTorrentId: null, // used to get torrent data on details modal
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
