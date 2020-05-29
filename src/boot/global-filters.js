import TransmissionFormatter from '../lib/formatter'
import RPCReference from '../lib/rpc'

export default async ({ Vue }) => {
  Vue.filter('speedBps',          bps => TransmissionFormatter.speedBps(bps))
  Vue.filter('ratioString',       str => TransmissionFormatter.ratioString(str))
  Vue.filter('percentString',     pct => TransmissionFormatter.percentString(pct))
  Vue.filter('size',              bts => TransmissionFormatter.size(bts))
  Vue.filter('timeInterval',      tms => TransmissionFormatter.timeInterval(tms))
  Vue.filter('timestamp',         tms => TransmissionFormatter.timestamp(tms))
  Vue.filter('toPercent',         pct => pct * 100)
  Vue.filter('statusName',        sts => RPCReference.statusName(sts))
}
