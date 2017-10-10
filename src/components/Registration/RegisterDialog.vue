<template>
  <v-dialog persistent width="350px" v-model="registerDialog">
    <v-btn slot="activator">
      {{ userIsRegistred ? 'Unregister' : 'Register' }}
    </v-btn>
    <v-card>
      <v-container>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-title v-if="userIsRegistred">Unregister from meetup?</v-card-title>
            <v-card-title v-else>Register for meetup?</v-card-title>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-text>
              You can always change your decision later on.
            </v-card-text>
          </v-flex>
        </v-layout>
        <v-layout>
          <v-flex xs12>
            <v-card-actions>
              <v-btn flat class="green--text darken-1" flat @click="onAgree">Agree</v-btn>
              <v-btn flat class="blue--text darken-1" @click="registerDialog = false">Close</v-btn>
            </v-card-actions>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    data () {
      return {
        registerDialog: false
      }
    },
    props: ['meetupId'],
    computed: {
      userIsRegistred () {
        const user = this.$store.getters.user
        if (!user.registredMeetups) return false
        return user.registredMeetups.findIndex(meetupId => {
          return meetupId === this.meetupId
        }) !== -1
      }
    },
    methods: {
      onAgree () {
        if (!this.userIsRegistred) this.$store.dispatch('registerUserForMeetup', {meetupId: this.meetupId})
        else this.$store.dispatch('unregisterFromMeetup', {meetupId: this.meetupId})
      }
    }
  }
</script>
