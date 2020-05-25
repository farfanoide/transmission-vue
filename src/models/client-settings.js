import specV15  from '../lib/rpc_spec/v15.js';
const sessionSettingsSpec = Object.keys(specV15.session);

/**
 * This class represents all settings
 * that can be setted/getted to/from the
 * Transmission client session thru rpc
 *
 * More info at RPC specs:
 * https://gist.github.com/RobertAudi/807ec699037542646584#41-session-arguments
 *
 * @param data  Plain js object.
 *
 */
export default class ClientSettings
{

  static EncriptionOptions = ["required", "preferred", "tolerated"]

  constructor(data) {
    // Filter data received with rpc data specification
    Object.keys(data).filter( name => sessionSettingsSpec.includes(name))
      .forEach(name => this[name] = data[name]);
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

  /**
   * Returns this settings excluding some settings
   * @param {Array<string>} exclude The properties to exclude
   * from this getter
   */
  getSettingsExcept(exclude) {
    let settings = Object.assign({}, this);
    exclude.forEach(excludeSetting => delete settings[excludeSetting]);
    return settings;
  }
}
