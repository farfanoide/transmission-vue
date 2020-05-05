export function SET_SESSION_DATA (state, data)
{
  state.data = data;
}

export function UPDATE_SESSION_DATA (state, data)
{
  Object.assign(state.data, data)
}

export function SET_SESSION_STATS (state, stats)
{
  state.stats = stats;
}

export function SET_SESSION_TORRENTS (state, torrents)
{
  /**
   * Set all torrents returned by transmission rpc.
   */
  state.torrents = torrents;
}

export function SET_ACTIVE_TORRENTS (state, torrentIds)
/**
 * Set current torrents that had some recent activity
 * i.e: has been seeded, has been downloaded, etc...
 */
{
  state.activeTorrents = torrentIds;
}

export function UPDATE_ACTIVE_TORRENTS (state, torrents)
{
  for (const torrent of torrents)
  {
    state.torrents[torrent.id] = torrent
  }
}

export function TOGGLE_SELECED_TORRENT ({ selectedTorrents }, torrentId)
{
  selectedTorrents.includes(torrentId) ?
    selectedTorrents.splice(selectedTorrents.indexOf(torrentId), 1) :
    selectedTorrents.push(torrentId)
}

export function CLEAR_SELECTED_TORRENTS (state)
{
  state.selectedTorrents = []
}

export function CLEAR_FILTERS  (state)
{
  state.activeFilters = {
    nameFilter: '',
    statusFilters: [],
  }
}

export function UPDATE_STATUS_FILTERS (state, statusFilters)
{
  state.activeFilters.statusFilters = statusFilters
}

export function UPDATE_NAME_FILTER (state, nameFilter)
{
  state.activeFilters.nameFilter = nameFilter
}
