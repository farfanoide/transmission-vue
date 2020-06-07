import Transmission from './transmission_promise'
import Torrent from '../models/torrent'
import specV15 from '../lib/rpc_spec/v15.js';
class TransmissionClient extends Transmission
{

  constructor(data) {
    super(data);
    // update set types to accept RPC spec
    // version 15 parameters
    this.methods.session.setTypes =
      Object.fromEntries(
        Object.entries(specV15.session)
          .filter(([fieldName, fieldSpec])=> fieldSpec.set)
          .map(([fieldName, fieldSpec]) => [fieldName, true])
      );
  }
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
