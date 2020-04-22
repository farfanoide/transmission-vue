const percent = function (val)
{
  return val * 100
}

const date = function (seconds)
{
  return seconds > 0 ? new Date( 1000 * seconds ): "-";
}

const size = function (bytes)
{
   var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
   if (bytes == 0) return '0 Byte';
   var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
   return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
}

const mappers = {
  'percentDone': percent,
  'dateCreated': date,
  'sizeWhenDone': size,
}
class TorrentMapper {

  static hasMapperFor(prop)
  {
    return true
  }

  static mapperFor(prop)
  {
    return mappers[prop] || function (v) { return v }
  }

  static mapValue(prop, value)
  {
    return this.mapperFor(prop)(value)
  }
}

window.TorrentMapper = TorrentMapper

const TorrentPresenterHandler = {

  get: function(target, prop, receiver)
  {
    if (TorrentMapper.hasMapperFor(prop))
    {
      return TorrentMapper.mapValue(prop, target[prop])
    }
    return Reflect.get(...arguments);
  }
}

const TorrentPresenter = function (data)
{
  return new Proxy(data, TorrentPresenterHandler)
}

export default TorrentPresenter
