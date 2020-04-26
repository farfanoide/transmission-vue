import RPCReference from './rpc'
import TransmissionFormatter from './formatter'

export function percent (val)
{
  return val * 100
}

export function  date (seconds)
{
  return seconds > 0 ? new Date( 1000 * seconds ): "-";
}

export  function size (bytes)
{
  return TransmissionFormatter.size(bytes)
}

export function status (statusId)
{
  // Map RPC status to our personal more readable status slugs, ie: `0` becomes
  // "STOPPED"
  // TODO: theres a special status not present in the rpc which is when the
  // torrent is 'STOPPED' but has also the isFinished flag set to true which
  // represents a "Finished Seeding" status, this could be an extra status on
  // our side to make filters easy and everything more cohesive.
  return RPCReference.statusSlug(statusId)
}
