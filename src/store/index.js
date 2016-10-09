import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import travels from './modules/travels'
import createLogger from 'vuex/dist/logger'

const debug = process.env.NODE_ENV !== 'production'

Vue.use(Vuex)
Vue.config.debug = debug

export default new Vuex.Store({
  actions,
  getters,
  modules: {
    travels
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
