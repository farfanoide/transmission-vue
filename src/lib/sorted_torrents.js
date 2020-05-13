// TODO: add more sorting options

export const SortReference = {
  options: [
        {
          value: 'dateCreated',
          label: 'Date Created',
        },
        {
          value: 'size',
          label: 'Size'
        },
        {
          value: 'name',
          label: 'Name',
        },
        {
          value: 'queue',
          label: 'Queue Order',
        },
        {
          value: 'percentDone',
          label: 'Percent Done',
        }
  ]
}

const SortFunctions = {
  // Key must match one of SortReference
  dateCreated: (torrenta, torrentb) => torrenta.dateCreated - torrentb.dateCreated,
  percentDone: (torrenta, torrentb) => torrenta.percentDone - torrentb.percentDone,
  size:        (torrenta, torrentb) => torrenta.sizeWhenDone - torrentb.sizeWhenDone,
  queue:       (torrenta, torrentb) => torrenta.queuePosition - torrentb.queuePosition,
  name: (torrenta, torrentb) => {
    if      (torrenta.name < torrentb.name) { return -1 }
    else if (torrenta.name > torrentb.name) { return 1  }
    return 0
  }
}

export default function SortedTorrents(sortBy, reverse, torrents)
{
  return reverse ?
    torrents.sort(SortFunctions[sortBy]).reverse() :
    torrents.sort(SortFunctions[sortBy])
}
