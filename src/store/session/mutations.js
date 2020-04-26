export function SET_SESSION_DATA (state, data)
{
  state.data = data;
}

export function SET_SESSION_STATS (state, stats)
{
  state.stats = stats;
}

export function SET_SESSION_TORRENTS (state, torrents)
{
  state.torrents = torrents;
}

export function SET_ACTIVE_TORRENTS (state, torrentIds)
{
  // TODO: active torrents are only needed for their ids, no need for the extra
  // work and memory
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
