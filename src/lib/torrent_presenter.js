const TorrentPresenterHandler = {
  // here we store all presentation logic, for example how to format specific
  // dates, etc

  get: function(target, prop, receiver)
  {
    if (this.hasOwnProperty(prop))
    {
      return this[prop](target[prop])
    }
    return Reflect.get(...arguments);
  },

  percentDone: function(percent)
  {
    return percent + '%'
  },

  dateCreated: function(date)
  {

    return (typeof(date) == "object" ) ?
      date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() :
      date
  }
}

const TorrentPresenter = function (torrent)
{
  return new Proxy(torrent, TorrentPresenterHandler)
}

export default TorrentPresenter
