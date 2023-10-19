<template>
  <v-app-bar
    elevation="2"
    class="app-navbar position-relative"
    density="comfortable"
  >
    <span class="d-md-none">
      <v-app-bar-nav-icon @click="sidebar = !sidebar"></v-app-bar-nav-icon>
    </span>

    <v-list nav class="d-flex">
      <v-list-item>
        <router-link
          :to="{ name: 'Home' }"
          class="text-decoration-none text-black font-weight-bold d-flex"
        >
          <v-img src="../../assets/logo.svg" width="20"></v-img>
          <span class="ms-1">My Blogs</span>
        </router-link>
      </v-list-item>

      <v-list-item
        class="hidden-sm-and-down ms-7"
        v-for="item in menuItems2"
        :key="item.title"
        :title="item.title"
        :prepend-icon="item.icon"
        :value="item.title"
        @click="routerHandler(item.path)"
      >
      </v-list-item>
    </v-list>

    <v-list nav class="d-flex">
      <v-text-field
        label="Search"
        class="nav-search hidden-sm-and-down me-2"
        hide-details
        density="compact"
        append-inner-icon="mdi-magnify"
      >
      </v-text-field>

      <v-list-item
        class="hidden-sm-and-down me-2 px-4 text-blue"
        key="Sign up"
        variant="outlined"
        title="Sign up"
        :to="{ name: 'Sign Up' }"
      >
      </v-list-item>
      <v-list-item
        class="hidden-sm-and-down me-2 bg-blue px-4"
        key="Log in"
        title="Log in"
        :to="{ name: 'Log In' }"
      >
      </v-list-item>
    </v-list>
  </v-app-bar>

  <v-navigation-drawer v-model="sidebar" temporary>
    <v-list nav>
      <v-text-field
        label="Search"
        class="nav-search me-2"
        hide-details
        density="compact"
        append-inner-icon="mdi-magnify"
      >
      </v-text-field>
      <v-list-item
        v-for="item in menuItems3"
        :key="item.title"
        :title="item.title"
        :prepend-icon="item.icon"
        :value="item.title"
        @click="routerHandler(item.path)"
      >
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      appTitle: "Awesome App",
      sidebar: false,
      menuItems2: [
        { title: "Blogs", path: "#" },
        { title: "Categories", path: "#" },
        { title: "Support", path: "#" },
        { title: "Introduction", path: "#" },
        { title: "Create blog", path: "/create-blog" },
      ],
      menuItems3: [
        { title: "Blogs", path: "#" },
        { title: "Categories", path: "#" },
        { title: "Support", path: "#" },
        { title: "Introduction", path: "#" },
        { title: "Create blog", path: "#" },
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
<style>
.v-list-item__prepend > .v-icon {
  margin-right: 5px !important;
}

.v-toolbar__content,
.v-toolbar__extension {
  justify-content: space-between;
}

.nav-search .v-field.v-field--appended {
  width: 160px;
}
</style>
