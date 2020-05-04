import Transmission from 'transmission-promise';
import store from '../store/index';

class TransmissionService {
    /**
     *  Singleton Class
     *  
     */
    static INSTANCE = undefined;
    static CONFIGS = {
        clientConfigs: undefined
    }
    intervals = []
    constructor(config)
    {
        /**
         * If this class has already been instantiated
         * returns the current instance; otherwise
         * instantiates a new service class and returns it
         * @param config :  Plain js object to initialize 
         *                  it properties.
         */
        if (!TransmissionService.INSTANCE)
        {
            this._initialize(config);
            TransmissionService.INSTANCE = this
        }
        return TransmissionService.INSTANCE;
    }
    
    _initialize(configs) {
        this.id = Math.random();
        // make a config variable with a known and needed interface
        // based on TransmissionService.CONFIGS
        this.configs = Object.assign({},TransmissionService.CONFIGS, configs);
        this.setClient(this.configs.clientConfigs);
        // get the store
        this.store = store();
        // do what needed with other configs

    }
    static getInstance() {
        /**
         * This should be the method to use this class
         * instances. 
         */
        if (!this.INSTANCE){
            this.INSTANCE = new TransmissionService();
        }
        console.log(this.INSTANCE)
        return this.INSTANCE;
    }

    setClient(config) {
        this.client = new Transmission(config)
    }

    /*          Torrent fetching              */
    fetchActiveTorrents() {
        /**
         * Fetch only active torrents and store them 
         * in the store
         */
        this.client.active().then(
            response => {
                const torrentIds = response.torrents.map(torrent => torrent.id)
                this.store.commit(
                    {
                        type: 'session/SET_ACTIVE_TORRENTS',
                        torrentIds: torrentIds
                    }, {root: true})
                console.log(this.store.getters('session/torrents'))
            }
        )
    }

    fetchAllTorrents() {
        /**
         * Fetch all torrents from daemon and store them
         * on the store.
         */
        console.log("service.fetchAllTorrents called")
        this.client.get().then(
            response => {
                this.store.commit(
                    {
                        type: 'session/SET_SESSION_TORRENTS',
                        torrents:  response.torrents
                    },{root: true})
                
            }
        )
    }

    startFetchingTorrents() {
        this.intervals.push(setInterval(() => this.fetchActiveTorrents(), 5000))
        // fetch and set in store torrents
    }

    stopFetching() {
        this.intervals.forEach(intervalId => clearInterval(intervalId))
    }



}

export default TransmissionService;