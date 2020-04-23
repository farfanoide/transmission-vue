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
  }

}

const TorrentPresenter = function (torrent)
{
  return new Proxy(torrent, TorrentPresenterHandler)
}

export default TorrentPresenter
