import FilteredTorrents from '../../lib/filtered_torrents'

export function torrents (state)
{
  return Object.keys(state.torrents).map(id => state.torrents[id]) || []
}

export function selectedTorrentsIds (state)
{
  return state.selectedTorrentsIds
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
  return FilteredTorrents(state.activeFilters, torrents(state))
}
