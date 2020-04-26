export function torrents (state)
{
  return Object.keys(state.torrents).map(id => state.torrents[id])
}

export function activeTorrentsIds (state)
{
  return Object.keys(state.activeTorrents).map(strId => Number(strId))
}

export function selectedTorrents (state)
{
  return state.selectedTorrents
}
