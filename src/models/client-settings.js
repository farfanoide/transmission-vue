/**
 * These are the session settings specified in the
 * rpc protocol specification.
 *
 * Uncomment to make them available in the model.
 */
const rpc_settings = [
  "alt-speed-down",               // | number     | max global download speed (KBps)
  //"alt-speed-enabled",            // | boolean    | true means use the alt speeds
  "alt-speed-time-begin",         // | number     | when to turn on alt speeds (units: minutes after midnight)
  "alt-speed-time-enabled",       // | boolean    | true means the scheduled on/off times are used
  "alt-speed-time-end",           // | number     | when to turn off alt speeds (units: same)
  "alt-speed-time-day",           // | number     | what day(s) to turn on alt speeds (look at tr_sched_day)
  "alt-speed-up",                 // | number     | max global upload speed (KBps)
  "blocklist-url",                // | string     | location of the blocklist to use for "blocklist-update"
  "blocklist-enabled",            // | boolean    | true means enabled
  "blocklist-size",               // | number     | number of rules in the blocklist
  //"cache-size-mb",                // | number     | maximum size of the disk cache (MB)
  //"config-dir",                   // | string     | location of transmission's configuration directory
  "download-dir",                 // | string     | default path to download torrents
  //"download-queue-size",          // | number     | max number of torrents to download at once (see download-queue-enabled)
  //"download-queue-enabled",       // | boolean    | if true, limit how many torrents can be downloaded at once
  "dht-enabled",                  // | boolean    | true means allow dht in public torrents
  "encryption",                   // | string     | "required", "preferred", "tolerated"
  "idle-seeding-limit",           // | number     | torrents we're seeding will be stopped if they're idle for this long
  "idle-seeding-limit-enabled",   // | boolean    | true if the seeding inactivity limit is honored by default
  //"incomplete-dir",               // | string     | path for incomplete torrents, when enabled
  //"incomplete-dir-enabled",       // | boolean    | true means keep torrents in incomplete-dir until done
  "lpd-enabled",                  // | boolean    | true means allow Local Peer Discovery in public torrents
  "peer-limit-global",            // | number     | maximum global number of peers
  "peer-limit-per-torrent",       // | number     | maximum global number of peers
  "pex-enabled",                  // | boolean    | true means allow pex in public torrents
  //"peer-port",                    // | number     | port number
  //"peer-port-random-on-start",    // | boolean    | true means pick a random peer port on launch
  //"port-forwarding-enabled",      // | boolean    | true means enabled
  //"queue-stalled-enabled",        // | boolean    | whether or not to consider idle torrents as stalled
  //"queue-stalled-minutes",        // | number     | torrents that are idle for N minuets aren't counted toward seed-queue-size or download-queue-size
  "rename-partial-files",         // | boolean    | true means append ".part", to incomplete files
  //"rpc-version",                  // | number     | the current RPC API version
  //"rpc-version-minimum",          // | number     | the minimum RPC API version supported
  //"script-torrent-done-filename", // | string     | filename of the script to run
  //"script-torrent-done-enabled",  // | boolean    | whether or not to call the "done", script
  "seedRatioLimit",               // | double     | the default seed ratio for torrents to use
  "seedRatioLimited",             // | boolean    | true if seedRatioLimit is honored by default
  //"seed-queue-size",              // | number     | max number of torrents to uploaded at once (see seed-queue-enabled)
  //"seed-queue-enabled",           // | boolean    | if true, limit how many torrents can be uploaded at once
  "speed-limit-down",             // | number     | max global download speed (KBps)
  "speed-limit-down-enabled",     // | boolean    | true means enabled
  "speed-limit-up",               // | number     | max global upload speed (KBps)
  "speed-limit-up-enabled",       // | boolean    | true means enabled
  "start-added-torrents",         // | boolean    | true means added torrents will be started right away
  //"trash-original-torrent-files", // | boolean    | true means the .torrent file of added torrents will be deleted
  //"units",                        // | object     | see below
  //"utp-enabled",                  // | boolean    | true means allow utp
  //"version",                      // | string     | long version string "$version ($revision)"
]

    
/**
 * This class represents all settings
 * that can be setted/getted to/from the
 * Transmission client thru rpc
 *
 * More info at RPC specs:
 * https://gist.github.com/RobertAudi/807ec699037542646584#41-session-arguments
 *
 * @param data  Plain js object.
 *
 */
export default class ClientSettings
{
    /**
     * An object containng key mappings from rpc spec to
     * model props.
     * Transforms kebab-case into lowerCamelCase
     * i.e { 'download-dir':'downloadDir' ... }
     * 
     * Relies in rpc_spec so to make available a prop on the
     * model, just uncomment rpc_spec above
     * 
     * Used in constructor to map session settings to 
     * model props.
     */
    static GeneralSettings = Object.fromEntries(
        rpc_settings.map(settingName => 
            [
                settingName,
                settingName.replace(/(\-)([a-z])/g, (match,g1,g2) => g2.toUpperCase())
            ]
        )        
    )

    static EncriptionOptions = ["required", "preferred", "tolerated"]

    constructor(data) {
        /**
         * Assigns each data key received an object prop.
         *
         */
        Object.entries(data)
            .forEach(([name, value]) => {
                if (ClientSettings.GeneralSettings[name])
                    this[ClientSettings.GeneralSettings[name]] = value
            })

    }

    /**
     * Returns a subset of this model settings
     * @param {Array<string>} settingsArray A list of settings to return from model
     * 
     * @returns {Object} A subset of settings
     */
    getSettings(settingsArray) {
        return Object.fromEntries(
            Object.entries(this)
                .filter(([name,value]) => settingsArray.includes(name))
        );
    }
}
