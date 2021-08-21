import TransmissionFormatter from '../lib/formatter'
import RPCReference from '../lib/rpc'

export default async ({ app }) => {
  app.config.globalProperties.$filters = {
    speedBps:          (bps) => TransmissionFormatter.speedBps(bps),
    ratioString:       (str) => TransmissionFormatter.ratioString(str),
    toPercent:         (pct) => pct * 100,
    percentString:     (pct) => TransmissionFormatter.percentString(pct),
    fullPercentString: (pct) => `${TransmissionFormatter.percentString(pct * 100)}%`,
    size:              (bts) => TransmissionFormatter.size(bts),
    timeInterval:      (tms) => TransmissionFormatter.timeInterval(tms),
    timestamp:         ( tms ) => TransmissionFormatter.timestamp(tms),
  }
}
