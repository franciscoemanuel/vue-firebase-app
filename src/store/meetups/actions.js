import * as firebase from 'firebase'

export default {
  createMeetup ({commit, getters}, payload) {
    commit('setLoading', true)
    const meetup = {
      title: payload.title,
      location: payload.location,
      description: payload.description,
      date: payload.date.toISOString(),
      creatorId: getters.user.id
    }
    let imageUrl
    let key
    return new Promise((resolve, reject) => {
      firebase.database().ref('meetups').push(meetup)
      .then(data => {
        key = data.key
        return key
      })
      .then(key => {
        const filename = payload.image.name
        const ext = filename.slice(filename.lastIndexOf('.'))
        return firebase.storage().ref('meetups/' + key + '.' + ext).put(payload.image)
      })
      .then(fileData => {
        imageUrl = fileData.metadata.downloadURLs[0]
        return firebase.database().ref('meetups').child(key).update({imageUrl})
      })
      .then(data => {
        commit('createMeetup', {
          ...meetup,
          imageUrl: imageUrl,
          id: key
        })
        commit('setLoading', false)
        resolve()
      })
      .catch(err => {
        reject(err)
      })
    })
  },
  loadMeetups ({commit}) {
    commit('setLoading', true)
    firebase.database().ref('meetups').once('value')
    .then(data => {
      const meetups = []
      const obj = data.val()
      Object.keys(obj).forEach(key => {
        meetups.push({
          id: key,
          title: obj[key].title,
          description: obj[key].description,
          imageUrl: obj[key].imageUrl,
          date: obj[key].date,
          creatorId: obj[key].creatorId,
          location: obj[key].location
        })
      })
      commit('setLoadedMeetups', meetups)
      commit('setLoading', false)
    })
    .catch(err => {
      console.log(err)
      commit('setLoading', false)
    })
  },
  updateMeetupData ({commit}, payload) {
    commit('setLoading', true)
    const updatedObj = {}
    if (payload.title) {
      updatedObj.title = payload.title
    }
    if (payload.description) {
      updatedObj.description = payload.description
    }
    if (payload.date) {
      updatedObj.date = payload.date
    }
    firebase.database().ref('meetups').child(payload.id).update(updatedObj)
      .then(() => {
        commit('setLoading', false)
        commit('updateMeetupData', payload)
      })
      .catch(err => {
        console.log(err)
        commit('setLoading', false)
      })
  }
}
