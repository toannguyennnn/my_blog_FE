<template>
  <v-app-bar elevation="2" class="position-relative">
    <span class="d-md-none">
      <v-app-bar-nav-icon @click="sidebar = !sidebar"> </v-app-bar-nav-icon>
    </span>
    <v-app-bar-title><router-link to="/" class="text-decoration-none text-black">My Blogs</router-link> </v-app-bar-title>
    <v-list nav class="d-flex">
      <v-list-item
        class="hidden-sm-and-down"
        v-for="item in menuItems"
        :key="item.title"
        :title="item.title"
        :prepend-icon="item.icon"
        :value="item.title"
        @click="routerHandler(item.path)"
      >
      </v-list-item></v-list
  ></v-app-bar>

  <!-- <v-navigation-drawer v-model="sidebar" temporary>
    <v-list nav>
      <v-list-item
        v-for="item in menuItems"
        :key="item.title"
        :title="item.title"
        :prepend-icon="item.icon"
        :value="item.title"
        @click="routerHandler(item.path)"
      >
      </v-list-item>
    </v-list>
  </v-navigation-drawer> -->
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      appTitle: "Awesome App",
      sidebar: false,
      menuItems: [
        { title: "Create Blog", path: "/create", icon: "mdi-plus" },
        { title: "Sign Up", path: "/sign-up", icon: "mdi-account-plus" },
        { title: "Sign In", path: "#", icon: "mdi-login" },
      ],
    };
  },
  methods: {
    routerHandler(path) {
      this.$router.push(`${path}`);
    },
  },
};
</script>
<style></style>
