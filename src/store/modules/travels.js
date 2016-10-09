import {
  RECEIVE_TRAVELS,
  ADD_TRAVEL,
  DELETE_TRAVEL,
  EDIT_TRAVEL
} from '../mutation-types'

// initial state
const state = {
  all: []
}

// mutations
const mutations = {
  [RECEIVE_TRAVELS] (state, travels) {
    state.all = travels
  },

  [ADD_TRAVEL] (state, name, fromDate, toDate) {
    state.all.push({
      name: name,
      from_date: fromDate,
      to_date: toDate
    })
  },

  [DELETE_TRAVEL] (state, travel) {
    state.all.splice(state.all.indexOf(travel), 1)
  },

  [EDIT_TRAVEL] (state, travel, name, fromDate, toDate) {
    travel.name = name
    travel.fromDate = fromDate
    travel.toDate = toDate
  }
}

export default {
  state,
  mutations
}
