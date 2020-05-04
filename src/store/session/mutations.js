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
  console.log("SST", torrents)
  state.torrents = torrents;
  console.log(state)
}

export function SET_ACTIVE_TORRENTS (state, torrentIds)
/**
 * Set current torrents that had some recent activity
 * i.e: has been seeded, has been downloaded, etc...
 */
{
  console.log("SAT", torrentIds)
  state.activeTorrents = torrentIds;
  console.log(state)
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
