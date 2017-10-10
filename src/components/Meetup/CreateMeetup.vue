<template>
  <v-container>
    <v-layout>
      <v-flex xs12 sm6 offset-sm3>
        <v-form v-model="valid" ref="form">
          <h4 class="grey--text">Create a new Meetup</h4>
          <v-text-field
            label="Title"
            v-model="title"
            :rules="titleRules"
            :counter="200"
            required></v-text-field>
          <v-text-field
            label="Location"
            v-model="location"
            :counter=100
            :rules="locationRules"
            required></v-text-field>
          <!-- <v-text-field
            label="Image URL"
            v-model="imageUrl"
            :rules="imageRules"
            required></v-text-field> -->
          <v-layout row>
            <v-flex xs12 sm6>
              <v-btn raised @click="onPickFile">Upload image *</v-btn>
              <p class="error--text">{{imageError}}</p>
              <input
                required
                type="file"
                style="display: none"
                ref="fileInput"
                accept="image/*"
                @change="onFilePicked">
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6>
              <img :src="imageUrl" height="200">
            </v-flex>
          </v-layout>
          <v-text-field
            v-model="description"
            label="Description"
            :rules="descriptionRules"
            multi-line
            required></v-text-field>
          <v-layout row wrap>
            <v-flex xs12 sm6>
              <v-menu
                lazy
                :close-on-content-click="false"
                v-model="menu"
                transition="scale-transition"
                offset-y
                full-width
                :nudge-left="40"
                max-width="290px">
                <v-text-field
                  slot="activator"
                  label="Picker in menu"
                  v-model="date"
                  prepend-icon="event"
                  required
                  :rules="dateRules"
                  readonly></v-text-field>
                <v-date-picker v-model="date" no-title scrollable actions>
                  <template scope="{ save, cancel }">
                    <v-card-actions>
                      <v-btn flat primary @click.native="cancel()">Cancel</v-btn>
                      <v-btn flat primary @click.native="save()">Save</v-btn>
                    </v-card-actions>
                  </template>
                </v-date-picker>
              </v-menu>
            </v-flex>
            <v-flex>
              <v-menu
                lazy
                :close-on-content-click="false"
                v-model="menu2"
                transition="scale-transition"
                offset-y
                :nudge-left="40">
                <v-text-field
                  slot="activator"
                  label="Picker in menu"
                  v-model="time"
                  prepend-icon="access_time"
                  required
                  :rules="timeRules"
                  readonly></v-text-field>
                <v-time-picker format="24hr" v-model="time" autosave></v-time-picker>
              </v-menu>
            </v-flex>
          </v-layout>
          <v-btn :disabled="loading" :loading="loading" @click="submit" :class="{ green: valid, red: !valid}">submit</v-btn>
          <v-btn @click="clear">clear</v-btn>
        </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>


<script>
  export default {
    data () {
      return {
        valid: false,
        title: '',
        titleRules: [
          (v) => !!v || 'Title is required',
          (v) => v && v.length <= 200 || 'Title must be less than 10 characters'
        ],
        location: '',
        locationRules: [
          (v) => !!v || 'Location is required',
          (v) => v && v.length <= 100 || 'Title must be less than 20 characters'
        ],
        imageUrl: '',
        imageRules: [
          (v) => !!v || 'Image is required'
        ],
        description: '',
        descriptionRules: [
          (v) => !!v || 'Description is required'
        ],
        date: null,
        dateRules: [
          (v) => !!v || 'Date is required'
        ],
        menu: false,
        time: null,
        timeRules: [
          (v) => !!v || 'Time is required'
        ],
        menu2: false,
        image: null,
        imageError: ''
      }
    },
    methods: {
      validateImage () {
        if (this.image) return true
        this.imageError = 'The image file is required'
        return false
      },
      submit () {
        if (this.$refs.form.validate() && this.validateImage()) {
          this.submitMeetup()
        }
      },
      clear () {
        this.imageError = ''
        this.image = null
        this.imageUrl = ''
        this.$refs.form.reset()
      },
      submitMeetup () {
        const meetupData = {
          title: this.title,
          location: this.location,
          image: this.image,
          description: this.description,
          date: this.dateTime
        }
        this.$store.dispatch('createMeetup', meetupData)
          .then(() => {
            this.$router.push(`/meetups`)
          })
      },
      onPickFile () {
        this.$refs.fileInput.click()
      },
      onFilePicked (event) {
        const files = event.target.files
        let filename = files[0].name
        if (filename.lastIndexOf('.') <= 0) {
          return alert('Please add a valid file!')
        }
        const fileReader = new FileReader()
        fileReader.addEventListener('load', () => {
          this.imageUrl = fileReader.result
        })
        fileReader.readAsDataURL(files[0])
        this.image = files[0]
        this.imageError = ''
      }
    },
    computed: {
      loading () {
        return this.$store.getters.loading
      },
      dateTime () {
        const date = new Date(this.date)
        const time = this.time || new Date()
        if (typeof time === 'string') {
          let hours = time.match(/^(\d+)/)[1]
          let minutes = time.match(/:(\d+)/)[1]
          date.setHours(hours)
          date.setMinutes(minutes)
        } else if (typeof time === 'object') {
          date.setHours(time.getHours())
          date.setMinutes(time.getMinutes())
        }
        return date
      }
    }
  }
</script>
