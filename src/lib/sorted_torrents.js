// TODO: add more sorting options

export const SortReference = {
  options: [
    {
      value: 'queue',
      label: 'Queue Order',
      icon: 'get_app',
    },
    {
      value: 'dateCreated',
      label: 'Date Created',
      icon: 'calendar_today',
    },
    {
      value: 'size',
      label: 'Size',
      icon: 'donut_small',
    },
    {
      value: 'name',
      label: 'Name',
      icon: 'sort_by_alpha',
    },
    {
      value: 'percentDone',
      label: 'Percent Done',
      icon: 'done_outline',
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
