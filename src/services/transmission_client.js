import Transmission from 'transmission-promise'
import Torrent from '../models/torrent'

class TransmissionClient extends Transmission
{
  active(...args)
  {
    return super.active(...args).then(({torrents}) => Torrent.fromRPC(torrents))
  }

  get(...args)
  {
    return super.get(...args).then(({torrents}) => Torrent.fromRPC(torrents))
  }
}
export default TransmissionClient
