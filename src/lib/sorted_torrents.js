// TODO: add more sorting options
const SortFunctions = {
  dateCreated: (torrenta, torrentb) => {
    return torrenta.dateCreated - torrentb.dateCreated
  },
  percentDone: (torrenta, torrentb) => {
    return torrenta.percentDone - torrentb.percentDone
  },
  size: (torrenta, torrentb) => {
    return torrenta.sizeWhenDone - torrentb.sizeWhenDone
  },
  queue: (torrenta, torrentb) => {
    return torrenta.queuePosition - torrentb.queuePosition
  },
  name: (torrenta, torrentb) => {
    if (torrenta.name < torrentb.name) {
      return -1
    } else if (torrenta.name > torrentb.name) {
      return 1
    }
    return 0
  }
}

export default function SortedTorrents(sortBy, reverse, torrents)
{
  return reverse ?
    torrents.sort(SortFunctions[sortBy]).reverse() :
    torrents.sort(SortFunctions[sortBy])
}
