<!-- <template>
  <v-alert error dismissible @input="onClose" :value="true">
    {{ text }}
  </v-alert>
</template> -->
<template>
  <v-snackbar
    :timeout="timeout"
    :top="y === 'top'"
    :right="x === 'right'"
    :multi-line="mode === 'multi-line'"
    v-model="snackbar"
    error
    primary
  >
    {{ text }}
    <v-btn flat class="white--text" @click.native="onClose"><v-icon>close</v-icon></v-btn>
  </v-snackbar>
</template>


<script>
  export default {
    data () {
      return {
        snackbar: true,
        y: 'top',
        x: 'right',
        mode: 'multi-line',
        timeout: 3000
      }
    },
    props: ['text'],
    methods: {
      onClose () {
        this.$emit('dismissed')
      }
    }
  }
</script>
