export default function () {
  return {
    data: {}, // rename to session or something better
    stats: {},
    torrents: {},
    activeTorrentsIds: [],
    selectedTorrentsIds: [],
    activeFilters: {
      nameFilter: '',
      statusFilters: [],
    }
  }
}
