export function torrents (state)
{
  return Object.keys(state.torrents).map(id => state.torrents[id]) || []
}

export function activeTorrentsIds (state)
{
  return Object.keys(state.activeTorrents).map(strId => Number(strId))
}

export function selectedTorrents (state)
{
  return state.selectedTorrents
}

export function totalUploadRate (state)
{
  return torrents(state).reduce((sum, torrent) => {return sum + torrent.rateUpload}, 0)
}

export function totalDownloadRate (state)
{
  return torrents(state).reduce((sum, torrent) => {return sum + torrent.rateDownload}, 0)
}

export function filteredTorrents (state)
{
  let { nameFilter, statusFilters } = state
  let filtered = torrents(state)

  // TODO: check for all status types and move into Stand alone object
  if (statusFilters.length > 0)
  {
    filtered = filtered.filter(t => statusFilters.includes(t.status))
  }
  if (nameFilter)
  {
    filtered = filtered.filter(t => t.name.toLowerCase().includes(nameFilter))
  }
  return filtered
}
