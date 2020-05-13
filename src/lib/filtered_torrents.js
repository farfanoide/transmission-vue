
const AvailableFilters = {
  name:     (torrent, nameSubstring) => torrent.name.toLowerCase().includes(nameSubstring.toLowerCase()),
  ACTIVE:   (torrent) => torrent.isActive(),
  SEED:     (torrent) => torrent.isSeeding() || torrent.isWaitingToSeed(),
  DOWNLOAD: (torrent) => torrent.isDownloading() || torrent.isWaitingToDownload(),
  STOPPED:  (torrent) => torrent.isPaused(),
  FINISHED: (torrent) => torrent.hasFinished(),
  ERROR:    (torrent) => torrent.hasErrors(),
  CHECK:    (torrent) => torrent.isChecking() || torrent.isWaitingToCheck(),
}

export default function FilteredTorrents(activeFilters, torrents)
{
  let filtered = torrents

  if (activeFilters.nameFilter)
  {
    filtered = filtered.filter((torrent) => AvailableFilters.name(torrent, activeFilters.nameFilter))
  }
  if (activeFilters.statusFilter && activeFilters.statusFilter !== 'ALL')
  {
    filtered = filtered.filter(AvailableFilters[activeFilters.statusFilter])
  }
  return filtered
}
