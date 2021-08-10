import configs from './configs'
import session from './session'
import countryflags from './countryflags'

import { createStore } from 'vuex'
// import example from './module-example'

export default function (/* { ssrContext } */) {
  const Store = createStore({
    modules: {
      configs,
      session,
      countryflags,
    },

    // enable strict mode (adds overhead!)
    // for dev mode and --debug builds only
    strict: process.env.DEBUGGING
  })

  return Store
}
