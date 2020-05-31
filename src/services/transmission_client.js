import Transmission from './transmission_promise'
import Torrent from '../models/torrent'

class TransmissionClient extends Transmission
{
  active(fields)
  {
    return super.get('recently-active', fields || []).then(({torrents}) => Torrent.fromRPC(torrents))
  }

  get(...args)
  {
    return super.get(...args).then(({torrents}) => Torrent.fromRPC(torrents))
  }
}
export default TransmissionClient
