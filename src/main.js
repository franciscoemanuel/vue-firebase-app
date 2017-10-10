import Vue from 'vue'
import Vuetify from 'vuetify'
import './stylus/main.styl'
import App from './App'
import router from './router'
import { store } from './store'
import DateFilter from './filters/date'
import * as firebase from 'firebase'
import AlertCmp from './components/Shared/Alert.vue'
import EditMeetupDetailsDialog from './components/Meetup/edit/EditMeetupDetailsDialog'
import EditMeetupDateDialog from './components/Meetup/edit/EditMeetupDateDialog'
import EditMeetupTimeDialog from './components/Meetup/edit/EditMeetupTimeDialog'
import RegisterDialog from './components/Registration/RegisterDialog'

Vue.use(Vuetify)
Vue.config.productionTip = false
Vue.filter('date', DateFilter)
Vue.component('app-alert', AlertCmp)
Vue.component('app-edit-meetup-details-dialog', EditMeetupDetailsDialog)
Vue.component('app-edit-meetup-date-dialog', EditMeetupDateDialog)
Vue.component('app-edit-meetup-time-dialog', EditMeetupTimeDialog)
Vue.component('app-meetup-register-dialog', RegisterDialog)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  created () {
    firebase.initializeApp({
      apiKey: 'AIzaSyB60-W9Mgwc6MYij9IM2vguIsTqBhAlEQk',
      authDomain: 'vuejs-firebaseapp.firebaseapp.com',
      databaseURL: 'https://vuejs-firebaseapp.firebaseio.com',
      projectId: 'vuejs-firebaseapp',
      storageBucket: 'vuejs-firebaseapp.appspot.com'
    })
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch('autoSignIn', user)
        this.$store.dispatch('fetchUserData')
      }
    })
    this.$store.dispatch('loadMeetups')
  }
})
