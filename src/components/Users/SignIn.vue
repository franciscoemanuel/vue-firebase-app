<template>
    <v-layout>
      <v-flex xs12 sm6 offset-sm3>
        <v-card>
          <v-card-text>
            <v-container>
              <v-form v-model="valid" ref="form">
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field
                      label="Email"
                      v-model="email"
                      :rules="[rules.email, rules.required]"
                      required
                    ></v-text-field>
                    <v-text-field
                      label="Password"
                      v-model="password"
                      :rules="[rules.required, rules.password]"
                      type="password"
                      required
                    ></v-text-field>
                    <v-btn @click="submit" :disabled="!valid || loading" class="info" :loading="loading">submit</v-btn>
                    <v-btn @click="clear">clear</v-btn>
                  </v-flex>
                </v-layout>
              </v-form>
            </v-container>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>


<script>
  export default {
    data () {
      return {
        valid: false,
        email: '',
        password: '',
        rules: {
          password: (value) => value && value.length <= 5 ? 'The password must contain at least 6 characters' : true,
          required: (value) => !!value || 'Value is required.',
          email: (value) => {
            const pattern = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            return pattern.test(value) || 'Invalid e-mail.'
          }
        }
      }
    },
    methods: {
      submit () {
        if (this.$refs.form.validate()) {
          this.$store.dispatch('signUserIn', {email: this.email, password: this.password})
        }
      },
      clear () {
        this.$refs.form.reset()
      },
      onDismissed () {
        console.log('dismissed alert!')
        this.$store.dispatch('clearError')
      }
    },
    computed: {
      user () {
        return this.$store.getters.user
      },
      error () {
        return this.$store.getters.error
      },
      loading () {
        return this.$store.getters.loading
      }
    },
    watch: {
      user (value) {
        if (value !== null && value !== undefined) {
          this.$router.push('/')
        }
      }
    }
  }
</script>
