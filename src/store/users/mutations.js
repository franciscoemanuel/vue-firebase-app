import {merge} from 'lodash'

export default {
  setUser (state, payload) {
    state.user = payload
  },
  updateUserData (state, payload) {
    merge(state.user, payload)
  }
}
