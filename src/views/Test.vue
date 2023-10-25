<template>
  <v-btn @click="test"></v-btn>
</template>

<script>
import handleAuthAPI from "@/API/handleAuthAPI";

export default {
  data() {
    return {};
  },
  methods: {
    async test() {
      const data = await handleAuthAPI.authenticate();
      console.log(data);
    },
  },
};
</script>
