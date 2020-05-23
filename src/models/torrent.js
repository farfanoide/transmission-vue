import TorrentMapper from '../lib/torrent_mapper'
import RPCReference from '../lib/rpc'


class Torrent {

  constructor(data)
  {
    Object.assign(this, data)

    for (let prop of TorrentMapper.attrsToMap())
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
    return this.status === RPCReference.status.DOWNLOAD
  }

  isWaitingToDownload()
  {
    return this.status === RPCReference.status.DOWNLOAD_WAIT
  }

  isActive()
  {
    return (this.peersGettingFromUs > 0) ||
      (this.peersSendingToUs > 0) ||
      (this.webseedsSendingToUs > 0) ||
      (this.status === RPCReference.status.CHECK)
  }

  isChecking()
  {
    return this.status === RPCReference.status.CHECK
  }

  isWaitingToCheck()
  {
    return this.status === RPCReference.status.CHECK_WAIT
  }

  isSeeding()
  {
    return this.status === RPCReference.status.SEED
  }

  isWaitingToSeed()
  {
    return this.status === RPCReference.status.SEED_WAIT
  }

  isPaused()
  {
    return this.status === RPCReference.status.STOPPED
  }

  hasFinished()
  {
    this.isFinished;
  }

  hasErrors()
  {
    return this.error !== 0
  }

  // TODO: add a fromMany method to handle instantiation of multiple torrents
  // at once

  static fromRPC(rpcData)
  {
    return rpcData.map(data => new Torrent(data))
  }
}

export default Torrent
