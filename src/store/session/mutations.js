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
  state.activeTorrents = torrentIds;
}
