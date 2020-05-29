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

  progressInfo: function (target, prop, receiver)
  {
    return target.isSeeding() ?
      this.seedingProgressInfo(target, prop, receiver) :
      this.downloadingProgressInfo(target, prop, receiver)
  },

  downloadingProgressInfo: function (target, prop, receiver)
  {
    return `${TransmissionFormatter.size(target.sizeWhenDone - target.leftUntilDone)} of ${TransmissionFormatter.size(target.sizeWhenDone)}`
  },

  seedingProgressInfo: function (target, prop, receiver)
  {
    return `${TransmissionFormatter.size(target.sizeWhenDone)}, uploaded ${TransmissionFormatter.size(target.uploadedEver)} (Ratio ${target.uploadRatio.toTruncFixed(2)})`
  },

  dateCreated: function(target, prop, receiver)
  {
    let date = target[prop]
    return (typeof(date) == "object" ) ?
      date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() :
      date
  },
}

const TorrentPresenter = function (torrent)
{
  return new Proxy(torrent, TorrentPresenterHandler)
}

export default TorrentPresenter
