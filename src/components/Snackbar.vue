<template>
  <v-snackbar :color="snackbarColor" :text="text" :icon="icon" location="top">
    <div class="text-center"><v-icon :icon="icon"></v-icon> {{ text }} </div>

    <template v-slot:actions>
      <v-btn variant="text" @click="$emit('update:modelValue', false)">
        <v-icon icon="mdi-close"></v-icon>
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      required: true
    },
    snackbarColor: {
      type: String,
      required: true
    }
  }
}
</script>