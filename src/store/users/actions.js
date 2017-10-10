import * as firebase from 'firebase'
import {pull} from 'lodash'

export default {
  signUserUp ({commit}, payload) {
    commit('setLoading', true)
    commit('clearError')
    firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
      .then(user => {
        const newUser = {
          id: user.uid,
          email: user.email,
          registredMeetups: []
        }
        return firebase.database()
          .ref('users')
          .child(newUser.id)
          .set({id: newUser.id})
      })
      .then(newUser => {
        commit('setLoading', false)
        commit('setUser', newUser)
      })
      .catch(err => {
        commit('setLoading', false)
        commit('setError', err)
        console.log(err)
      })
  },
  signUserIn ({commit}, payload) {
    commit('setLoading', true)
    commit('clearError')
    firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
      .then(user => {
        const registredUser = {
          id: user.uid,
          email: user.email,
          registredMeetups: user.registredMeetups || []
        }
        commit('setLoading', false)
        commit('setUser', registredUser)
      })
      .catch(err => {
        commit('setLoading', false)
        commit('setError', err)
        console.log(err)
      })
  },
  autoSignIn ({commit}, payload) {
    commit('setUser', {id: payload.uid, registredMeetups: []})
  },
  fetchUserData ({commit, getters}) {
    commit('setLoading', true)
    const userId = getters.user.id
    firebase.database().ref('users').child(userId).child('registredMeetups').once('value')
      .then(data => {
        const meetups = data.val()
        commit('setUser', {
          id: userId,
          registredMeetups: meetups || []
        })
        commit('setLoading', false)
      })
      .catch(err => {
        console.log(err)
        commit('setLoading', false)
      })
  },
  logout ({commit}) {
    firebase.auth().signOut()
    commit('setUser', null)
  },
  registerUserForMeetup ({commit, getters}, payload) {
    commit('setLoading', true)
    const user = getters.user
    user.registredMeetups.push(payload.meetupId)
    firebase.database().ref('users').child(user.id).update(user)
      .then(() => {
        commit('setLoading', false)
        commit('updateUserData', user)
      })
      .catch(err => {
        console.log(err)
        commit('setLoading', false)
      })
  },
  unregisterFromMeetup ({commit, getters}, payload) {
    commit('setLoading', true)
    const user = getters.user
    pull(user.registredMeetups, payload.meetupId)
    firebase.database().ref('users').child(user.id).update(user)
      .then(() => {
        commit('setLoading', false)
        commit('updateUserData', user)
      })
      .catch(err => {
        console.log(err)
        commit('setLoading', false)
      })
  }
}
