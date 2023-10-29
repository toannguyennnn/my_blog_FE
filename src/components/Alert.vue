<template>
  <v-alert
    width="600"
    class="position-absolute alert-message"
    density="compact"
    :type="errStore.type"
    :title="errStore.title"
    elevation="10"
    v-model="errStore.isShow"
    closable
  >
    <template #text>
      <p>{{ errStore.message }}</p>
      <div v-if="errStore.action" class="text-right">
        <v-btn class="text-black px-8" @click="errStore.handleAction">
          {{ errStore.action }}
        </v-btn>
      </div>
    </template>
  </v-alert>
</template>
<script setup>
import { useErrStore } from "@/store/errStore";

const errStore = useErrStore();
</script>

<style>
.alert-message {
  top: 60px;
  z-index: 5000;
  left: 50%;
  transform: translateX(-50%);
}
</style>
