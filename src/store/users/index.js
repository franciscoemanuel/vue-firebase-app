import actions from './actions'
import mutations from './mutations'

export default{
  state: {
    user: null
  },
  getters: {
    user (state) {
      return state.user
    }
  },
  mutations: mutations,
  actions: actions
}
