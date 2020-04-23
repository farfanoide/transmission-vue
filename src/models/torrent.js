import TorrentMapper from '../lib/torrent_mapper'


class Torrent {

  constructor(data)
  {
    for (var prop in data)
    {
      this[prop] = TorrentMapper.mapValue(prop, data[prop])
    }
  }
}

export default Torrent
