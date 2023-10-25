<template>
  <div class="not-found-page d-flex flex-column justify-end align-center">
    <!-- <v-img src="../assets/404.svg"></v-img> -->
    <div class="text-h5 mb-4">
      Oops, we couldn't find that page. Go back to
      <router-link :to="{ name: 'Home' }">Homepage</router-link>
    </div>
  </div>
</template>
<style>
.not-found-page {
  height: 100vh;
  width: 100vw;
  background-image: url("../assets/404.svg");
  background-position: center;
  background-size: contain;
}
</style>
