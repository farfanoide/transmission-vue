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
  },

  eta: function (seconds)
  {
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
