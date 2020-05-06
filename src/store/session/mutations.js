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
   * Set all torrents returned by transmission rpc as a dictionary where each
   * key is a torrent id and points to that torrent. This makes updates much
   * easyer.
   */
  state.torrents = Object.fromEntries(torrents.map(torrent => [torrent.id, torrent]))
}

export function SET_ACTIVE_TORRENTS (state, torrents)
/**
 * Set current torrents that had some recent activity
 * i.e: has been seeded, has been downloaded, etc...
 */
{
  state.activeTorrentsIds = torrents.map(torrent => torrent.id);
}

export function UPDATE_ACTIVE_TORRENTS (state, torrents)
{
  for (const torrent of torrents)
  {
    state.torrents[torrent.id] = torrent
  }
}

export function TOGGLE_SELECED_TORRENT ({ selectedTorrentsIds }, torrentId)
{
  selectedTorrentsIds.includes(torrentId) ?
    selectedTorrentsIds.splice(selectedTorrentsIds.indexOf(torrentId), 1) :
    selectedTorrentsIds.push(torrentId)
}

export function CLEAR_SELECTED_TORRENTS (state)
{
  state.selectedTorrentsIds = []
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
