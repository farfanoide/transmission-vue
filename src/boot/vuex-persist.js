import VuexPersistence from 'vuex-persist'
// import localForage from "localforage";

export default async ({ store }) => {
  new VuexPersistence({
    key: 'transmission-vue',
    storage: window.localStorage,
    modules: ['configs'],
  }).plugin(store);
};
