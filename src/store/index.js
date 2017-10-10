import Vue from 'vue'
import Vuex from 'vuex'
import shared from './shared'
import users from './users'
import meetups from './meetups'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    shared: shared,
    users: users,
    meetups: meetups
  }
})
