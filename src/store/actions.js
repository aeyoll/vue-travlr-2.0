import * as api from '../api'
import * as types from './mutation-types'

export const getAllTravels = ({ commit }) => {
  return api
    .getAllTravels()
    .then(travels => {
      commit(types.RECEIVE_TRAVELS, travels)
    })
}

export const getTravel = ({ commit, state }, args) => {
  const { slug } = args

  return state.travels.all[slug]
    ? Promise.resolve(state.travels.all[slug])
    : api
      .getTravel(slug)
      .then(travel => {
        let obj = {}
        obj[slug] = travel
        commit(types.RECEIVE_TRAVELS, obj)
      })
}

export const addTravel = ({ commit }, ...args) => {
  commit(types.ADD_TRAVEL, ...args)
}

export const deleteTravel = ({ commit }, ...args) => {
  commit(types.DELETE_TRAVEL, ...args)
}

export const editTravel = ({ commit }, ...args) => {
  commit(types.EDIT_TRAVEL, ...args)
}
