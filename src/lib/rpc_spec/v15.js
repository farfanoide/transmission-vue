/**
 * This is intended to be the source of truth
 * regarding RPC spec version 15(2.8x).
 *
 * Used to stand how is data modeled and what is
 * available to request or send to server.
 *
 * Each key represents a modeled data object(i.e: session)
 * Each data object has keys(which are props on
 * the data object RPC representation) and each prop
 * has a type, a name(a short human understandable name),
 * and actions, such as get or set, meaning this prop
 * is part of the request/response of that particular
 * action.
 */
const specV15 = {
  session: {
    "alt-speed-down": {
      type: "number",
      name: "Alt Speed Down",
      get: true,
      set: true
    },
    "alt-speed-enabled":  {
      type: "boolean",
      name: "Alt Speed Enabled",
      get: true,
      set: true
    },
    "alt-speed-time-begin": {
      type: "number",
      name: "Alt Speed Begin At",
      get: true,
      set: true
    },
    "alt-speed-time-enabled": {
      type: "boolean",
      name: "Alt Speed Time Enabled",
      get: true,
      set: true
    },
    "alt-speed-time-end": {
      type: "number",
      name: "Alt Speed Time End",
      get: true,
      set: true
    },
    "alt-speed-time-day": {
      type: "number",
      name: "Alt Speed Time Day",
      get: true,
      set: true
    },
    "alt-speed-up": {
      type: "number",
      name: "Alt Speed Up",
      get: true,
      set: true
    },
    "blocklist-url": {
      type: "string",
      name: "Blocklist Url",
      get: true,
      set: true
    },
    "blocklist-enabled": {
      type: "boolean",
      name: "Blocklist Enabled",
      get: true,
      set: true
    },
    "blocklist-size": {
      type: "number",
      name: "Blocklist Size",
      get: true,
      set: false
    },
    "cache-size-mb": {
      type: "number",
      name: "Cache Size (Mb)",
      get: true,
      set: true
    },
    "config-dir": {
      type: "string",
      name: "Config Dir",
      get: true,
      set: false
    },
    "download-dir": {
      type: "string",
      name: "Download Dir",
      get: true,
      set: true
    },
    "download-queue-size": {
      type: "number",
      name: "Download Queue Size",
      get: true,
      set: true
    },
    "download-queue-enabled": {
      type: "boolean",
      name: "Download Queue Enabled",
      get: true,
      set: true
    },
    "dht-enabled": {
      type: "boolean",
      name: "Dht Enabled",
      get: true,
      set: true
    },
    "encryption": {
      type: "string",
      name: "encryption",
      get: true,
      set: true
    },
    "idle-seeding-limit": {
      type: "number",
      name: "Idle Seeding Limit",
      get: true,
      set: true
    },
    "idle-seeding-limit-enabled": {
      type: "boolean",
      name: "Idle Seeding Limit Enabled",
      get: true,
      set: true
    },
    "incomplete-dir": {
      type: "string",
      name: "Incomplete Dir",
      get: true,
      set: true
    },
    "incomplete-dir-enabled": {
      type: "boolean",
      name: "Incomplete Dir Enabled",
      get: true,
      set: true
    },
    "lpd-enabled": {
      type: "boolean",
      name: "Lpd Enabled",
      get: true,
      set: true
    },
    "peer-limit-global": {
      type: "number",
      name: "Peer Limit Global",
      get: true,
      set: true
    },
    "peer-limit-per-torrent": {
      type: "number",
      name: "Peer Limit Per Torrent",
      get: true,
      set: true
    },
    "pex-enabled": {
      type: "boolean",
      name: "Pex Enabled",
      get: true,
      set: true
    },
    "peer-port": {
      type: "number",
      name: "Peer Port",
      get: true,
      set: true
    },
    "peer-port-random-on-start": {
      type: "boolean",
      name: "Peer Port Random On Start",
      get: true,
      set: true
    },
    "port-forwarding-enabled": {
      type: "boolean",
      name: "Port Forwarding Enabled",
      get: true,
      set: true
    },
    "queue-stalled-enabled": {
      type: "boolean",
      name: "Queue Stalled Enabled",
      get: true,
      set: true
    },
    "queue-stalled-minutes": {
      type: "number",
      name: "Queue Stalled Minutes",
      get: true,
      set: true
    },
    "rename-partial-files": {
      type: "boolean",
      name: "Rename Partial Files",
      get: true,
      set: true
    },
    "rpc-version": {
      type: "number",
      name: "Rpc Version",
      get: true,
      set: false
    },
    "rpc-version-minimum": {
      type: "number",
      name: "Rpc Version Minimum",
      get: true,
      set: false
    },
    "script-torrent-done-filename": {
      type: "string",
      name: "Script Torrent Done Filename",
      get: true,
      set: true
    },
    "script-torrent-done-enabled": {
      type: "boolean",
      name: "Script Torrent Done Enabled",
      get: true,
      set: true
    },
    "seedRatioLimit": {
      type: "double",
      name: "Seed Ratio Limit",
      get: true,
      set: true
    },
    "seedRatioLimited": {
      type: "boolean",
      name: "seedRatioLimited",
      get: true,
      set: true
    },
    "seed-queue-size": {
      type: "number",
      name: "Seed Queue Size",
      get: true,
      set: true
    },
    "seed-queue-enabled": {
      type: "boolean",
      name: "Seed Queue Enabled",
      get: true,
      set: true
    },
    "speed-limit-down": {
      type: "number",
      name: "Speed Limit Down",
      get: true,
      set: true
    },
    "speed-limit-down-enabled": {
      type: "boolean",
      name: "Speed Limit Down Enabled",
      get: true,
      set: true
    },
    "speed-limit-up": {
      type: "number",
      name: "Speed Limit Up",
      get: true,
      set: true
    },
    "speed-limit-up-enabled": {
      type: "boolean",
      name: "Speed Limit Up Enabled",
      get: true,
      set: true
    },
    "start-added-torrents": {
      type: "boolean",
      name: "Start Added Torrents",
      get: true,
      set: true
    },
    "trash-original-torrent-files": {
      type: "boolean",
      name: "Trash Original Torrent Files",
      get: true,
      set: true
    },
    "utp-enabled": {
      type: "boolean",
      name: "Utp Enabled",
      get: true,
      set: true
    },
    "version": {
      type: "string",
      name: "version",
      get: true,
      set: false
    }
  }
}

export default specV15;
