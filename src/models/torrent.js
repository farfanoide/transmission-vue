import TorrentMapper from '../lib/torrent_mapper'
import RPCReference from '../lib/rpc'


class Torrent {

  constructor(data)
  {
    for (var prop in data)
    {
      this[prop] = TorrentMapper.mapValue(prop, data[prop])
    }
  }

  isFinished()
  {
    return this.isFinished
  }
  isDownloading()
  {
    return this.status == RPCReference.status.DOWNLOAD
  }
  // TODO: add a fromMany method to handle instantiation of multiple torrents
  // at once
}

export default Torrent
