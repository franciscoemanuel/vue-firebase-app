<template>
  <v-dialog persistent width="350px" v-model="editDialog">
    <v-btn slot="activator">
      <v-icon>edit</v-icon>
      Edit time
    </v-btn>
    <v-card>
      <v-container>
        <v-layout row wrap>
          <v-flex xs12>
            <v-time-picker v-model="editableTime" style="width: 100%" actions format="24hr">
              <template scope="{save, cancel}">
                <v-btn class="blue--text darken-1" flat @click="editDialog = false">Close</v-btn>
                <v-btn class="blue--text darken-1" flat @click="onSavedChanges">Save</v-btn>
              </template>
            </v-time-picker>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    props: ['meetup'],
    data () {
      return {
        editDialog: false,
        editableTime: null
      }
    },
    methods: {
      onSavedChanges () {
        const newDate = new Date(this.meetup.date)
        const time = this.editableTime
        let hours = time.match(/^(\d+)/)[1]
        let minutes = time.match(/:(\d+)/)[1]
        newDate.setHours(hours)
        newDate.setMinutes(minutes)
        this.$store.dispatch('updateMeetupData', {
          id: this.meetup.id,
          date: newDate
        })
        this.editDialog = false
      }
    },
    created () {
      this.editableTime = new Date(this.meetup.date).toTimeString()
    }
  }
</script>
