<template>
  <v-container>
    <Snackbar v-model="isShow" text="fsdfdsf" snackbarColor="blue" :timeout="2000" />
    <v-btn @click="test">test</v-btn>

    <v-btn @click="test2">test</v-btn>

    <template>
      <div class="text-center">
        <v-btn color="orange-darken-2" @click="snackbar = true">
          Open Snackbar
        </v-btn>

        <v-snackbar :modelValue="snackbar" @update:modelValue="true" :timeout="timeout">
          {{ text }}

          <template v-slot:actions>
            <v-btn color="blue" variant="text" @click="snackbar = false">
              Close
            </v-btn>
          </template>
        </v-snackbar>
      </div>
    </template>
  </v-container>
</template>

<script>
import Snackbar from '@/components/Snackbar.vue'

export default {
  data() {
    return {
      isShow: false,
      snackbar: false,
      timeout: 3000,
      text: 'gfgfgf'
    }
  },
  components: {
    Snackbar
  },
  methods: {
    test() {
      this.isShow = true
    },
    test2() {
      this.snackbar = true
    }
  }
}

</script>
