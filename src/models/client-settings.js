export default class ClientSettings
{
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
    constructor(data) {
        this.settings = Object.assign({}, data)
    }
}