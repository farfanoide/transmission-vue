import RPCReference from './rpc'
import TransmissionFormatter from './formatter'

const TorrentPresenterHandler = {
  // here we store all presentation logic, for example how to format specific
  // dates, etc

  get: function(target, prop, receiver)
  {
    if (this.hasOwnProperty(prop))
    {
      return this[prop](target, prop, receiver)
    }
    return Reflect.get(...arguments);
  },

  percentDone: function(target, prop, receiver)
  {
    return `${target.percentDone}%`
  },

  statusName: function (target, prop, receiver)
  {
    return RPCReference.statusName(target.status)
  },

  downloadingPeersInfo: function (target, prop, receiver)
  {
    if (target.peersConnected && target.webseedsSendingToUs)
    {
      // happy path, we have both peers and webseed available
      return `Downloading from ${target.peersSendingToUs} of ${target.peersConnected} peer${target.peersConnected > 1 ? 's' : ''} and ${target.webseedsSendingToUs} webseed${target.webseedsSendingToUs > 1 ? 's' : ''}`
    }

    if (target.peersConnected)
    {
      // happy path, we have both peers and webseed available
      return `Downloading from ${target.peersSendingToUs} of ${target.peersConnected} peer${target.peersConnected > 1 ? 's' : ''}`
    }

    if (target.webseedsSendingToUs)
    {
      // happy path, we have both peers and webseed available
      return `Downloading from ${target.webseedsSendingToUs} webseed${target.webseedsSendingToUs > 1 ? 's' : ''}`
    }
  },

  seedingPeersInfo: function (target, prop, receiver)
  {
    // TODO: add localization to use proper pluralization
    return `Seeding to ${target.peersGettingFromUs} of ${target.peersConnected} ${target.peersConnected > 1 ? 'peer' : 'peers'  }`
  },

  checkingPeersInfo: function (target, prop, receiver)
  {
    return `Verifying local data (${TransmissionFormatter.percentString(target.recheckProgress * 100)}% tested)`
  },

  peersInfo: function (target, prop, receiver)
  {
    if (target.isDownloading()) {
      return this.downloadingPeersInfo(target, prop, receiver)
    } else if (target.isSeeding()) {
      return this.seedingPeersInfo(target, prop, receiver)
    } else if (target.isChecking()) {
      return this.checkingPeersInfo(target, prop, receiver)
    }
    return this.statusName(target, prop, receiver)
  },

  networkStats: function (target, prop, receiver)
  {
    return target.isDownloading() ?
      `↓ ${TransmissionFormatter.speedBps(target.rateDownload)} ↑ ${TransmissionFormatter.speedBps(target.rateUpload)}` :
      `↑ ${TransmissionFormatter.speedBps(target.rateUpload)}`
  },

  dateCreated: function(target, prop, receiver)
  {
    let date = target[prop]
    return (typeof(date) == "object" ) ?
      date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() :
      date
  },

  eta: function (target, prop, receiver)
  {
    let seconds = target[prop]
    if (seconds <= 0) { return '-' }
    let days = Math.floor(seconds / 86400);
    let hours = Math.floor((seconds % 86400) / 3600);
    let minutes = Math.floor((seconds % 3600) / 60);
    let roundedSeconds = Math.floor(seconds % 60);
    let d = days + ' ' + (days > 1 ? 'days' : 'day');
    let h = hours + ' ' + (hours > 1 ? 'hours' : 'hour');
    let m = minutes + ' ' + (minutes > 1 ? 'minutes' : 'minute');
    let s = roundedSeconds + ' ' + (roundedSeconds > 1 ? 'seconds' : 'second');

    if (days) {
      if (days >= 4 || !hours) { return d; }

      return d + ', ' + h;
    }

    if (hours) {
      if (hours >= 4 || !minutes) { return h; }

      return h + ', ' + m;
    }

    if (minutes) {
      if (minutes >= 4 || !roundedSeconds) { return m; }

      return m + ', ' + s;
    }

    return s;
  }
}

const TorrentPresenter = function (torrent)
{
  return new Proxy(torrent, TorrentPresenterHandler)
}

export default TorrentPresenter
