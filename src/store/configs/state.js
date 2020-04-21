import { defaultServerTemplate } from '../../lib/servers'

export default function () {
  return {
    servers: [],
    currentServer: defaultServerTemplate(),
  }
}
