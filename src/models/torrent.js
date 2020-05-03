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
    return [
      RPCReference.status.DOWNLOAD,
      RPCReference.status.DOWNLOAD_WAIT
    ].includes(this.status)
  }

  isActive()
  {
    return (this.peersGettingFromUs > 0) ||
      (this.peersSendingToUs > 0) ||
      (this.webseedsSendingToUs > 0) ||
      (this.status === RPCReference.status.CHECK)
  }

  isSeeding()
  {
    return [
      RPCReference.status.SEED,
      RPCReference.status.SEED_WAIT
    ].includes(this.status)
  }

  isPaused()
  {
    return this.status === RPCReference.status.STOPPED
  }

  hasFinished()
  {
    this.isFinished;
  }
  // TODO: add a fromMany method to handle instantiation of multiple torrents
  // at once
}

export default Torrent
