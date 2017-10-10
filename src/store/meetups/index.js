import actions from './actions'
import mutations from './mutations'

export default {
  state: {
    loadedMeetups: [
      // {imageUrl: 'https://goo.gl/hQLYhx', id: '1', title: 'Meetup in Maceió', date: new Date(), location: 'Ritz Lagoa da anta', description: 'meetup em Maceió no ritz'},
      // {imageUrl: 'https://goo.gl/WoVcY9', id: '2', title: 'Meetup in Recife', date: new Date(), location: 'Ritz Lagoa da anta', description: 'meetup em Recife no ritz'},
      // {imageUrl: 'https://goo.gl/WdNKRh', id: '3', title: 'Meetup in Aracaju', date: new Date(), location: 'Ritz Lagoa da anta', description: 'meetup em Aracaju no ritz'}
    ]
  },
  mutations: mutations,
  actions: actions,
  getters: {
    loadedMeetups (state) {
      return state.loadedMeetups.sort((meetupA, meetupB) => {
        return meetupA.date > meetupB.date
      })
    },
    featuredMeetups (state, getters) {
      return getters.loadedMeetups.slice(0, 5)
    },
    loadedMeetup (state) {
      return (meetupId) => {
        return state.loadedMeetups.find(meetup => {
          return meetup.id === meetupId
        })
      }
    }
  }
}
