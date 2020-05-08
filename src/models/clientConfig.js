export default class ClientConfig
{
    /**
     * This class represents all configurations
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
        this.configs = Object.assign({}, data)
    }
}