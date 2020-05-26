import FilteredTorrents from '../../lib/filtered_torrents'
import SortedTorrents from '../../lib/sorted_torrents'

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
  return state.stats.uploadSpeed
}

export function totalDownloadRate (state)
{
  return state.stats.downloadSpeed
}

export function filteredTorrents (state)
{
  return SortedTorrents(
    state.sorting.sortBy,
    state.sorting.reverse,
    FilteredTorrents(state.activeFilters, torrents(state))
  )
}

export function altSpeedEnabled (state)
{
  return state.data['alt-speed-enabled']
}
