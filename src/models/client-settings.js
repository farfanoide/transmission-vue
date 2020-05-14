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
        /**
         * Assigns each data key received an object prop.
         * 
         * @TODO Currently all data passed as argument is
         * is stored on object. So a mapper or something 
         * like that so only relevant information is stored.
         */
        Object.keys(data).forEach(key => {
            this[key] = data[key]
        });
    }
}