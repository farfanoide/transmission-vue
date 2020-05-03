export default function () {
  return {
    data: {}, // rename to session or something better
    stats: {},
    torrents: {},
    activeTorrents: {},
    // TODO: Maybe change name to reflect that
    // data stored are Ids. Should also rename getter.
    selectedTorrents: [],
    activeFilters: {
      nameFilter: '',
      statusFilters: [],
    }
  }
}
