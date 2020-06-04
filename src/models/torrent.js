import RPCReference from '../lib/rpc'


class Torrent {

  constructor(data)
  {
    this.update(data)
  }

  update(data)
  {
    Object.assign(this, data)
    this.statusSlug = RPCReference.statusSlug(this.status)
    this.statusName = RPCReference.statusName(this.statusSlug)
  }

  isFinished()
  {
    return this.isFinished
  }

  isDownloading()
  {
    return this.statusSlug === RPCReference.status.DOWNLOAD
  }

  isWaitingToDownload()
  {
    return this.statusSlug === RPCReference.status.DOWNLOAD_WAIT
  }

  isActive()
  {
    return (this.peersGettingFromUs > 0) ||
      (this.peersSendingToUs > 0) ||
      (this.webseedsSendingToUs > 0) ||
      (this.statusSlug === RPCReference.status.CHECK)
  }

  isChecking()
  {
    return this.statusSlug === RPCReference.status.CHECK
  }

  isWaitingToCheck()
  {
    return this.statusSlug === RPCReference.status.CHECK_WAIT
  }

  isSeeding()
  {
    return this.statusSlug === RPCReference.status.SEED
  }

  isWaitingToSeed()
  {
    return this.statusSlug === RPCReference.status.SEED_WAIT
  }

  isPaused()
  {
    return this.statusSlug === RPCReference.status.STOPPED
  }

  hasFinished()
  {
    this.isFinished;
  }

  hasErrors()
  {
    return this.error !== 0
  }

  static fromRPC(rpcData)
  {
    return rpcData.map(data => new Torrent(data))
  }
}

export default Torrent
