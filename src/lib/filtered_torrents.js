
const AvailableFilters = {
  name: (torrent, nameSubstring) => torrent.name.toLowerCase().includes(nameSubstring.toLowerCase()),
  ACTIVE: (torrent) => torrent.isActive(),
  SEED: (torrent) => torrent.isSeeding(),
  DOWNLOAD: (torrent) => torrent.isDownloading(),
  STOPPED: (torrent) => torrent.isPaused(),
  FINISHED: (torrent) => torrent.hasFinished(),
}

AvailableFilters.enabled = function (statusFilters)
{
  return statusFilters.map(filterName => AvailableFilters[filterName])
}

export default function FilteredTorrents(activeFilters, torrents)
{
  let filtered = torrents

  if (activeFilters.nameFilter)
  {
    filtered = filtered.filter((torrent) => AvailableFilters.name(torrent, activeFilters.nameFilter))
  }
  if (activeFilters.statusFilters.length > 0)
  {
    let enabledFilters = AvailableFilters.enabled(activeFilters.statusFilters)
    filtered = filtered.filter((torrent) => enabledFilters.some((filter) => filter(torrent)))
  }
  return filtered
}
