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
        v-for="item in menuItems"
        :key="item.title"
        :title="item.title"
        :prepend-icon="item.icon"
        :value="item.title"
        @click="routerHandler(item.name)"
      >
      </v-list-item>

      <v-list-item
        v-if="isAdmin"
        class="hidden-sm-and-down ms-7"
        key="Admin panel"
        title="Admin panel"
        :to="{ name: 'Admin' }"
      >
      </v-list-item>
    </v-list>

    <v-list nav class="d-flex">
      <v-list-item
        v-if="!isLogged"
        class="hidden-sm-and-down me-2 px-4 text-blue"
        key="Sign up"
        variant="outlined"
        title="Sign up"
        :to="{ name: 'Sign Up' }"
      >
      </v-list-item>

      <v-list-item
        v-if="!isLogged"
        class="hidden-sm-and-down me-2 bg-blue px-4"
        key="Log in"
        title="Log in"
        :to="{ name: 'Log In' }"
      >
      </v-list-item>

      <span v-else class="d-flex align-center ms-7">
        <span class="w-100"
          >Welcome,
          <p class="font-weight-bold d-inline">
            {{ currentUser.fullname }}
          </p></span
        >
        <v-menu min-width="200px" rounded>
          <template v-slot:activator="{ props }">
            <v-btn icon v-bind="props">
              <v-avatar color="blue" size="small">
                <v-icon icon="mdi-account-circle" size="x-large"></v-icon>
              </v-avatar>
            </v-btn>
          </template>
          <v-card>
            <v-card-text>
              <div class="mx-auto text-center">
                <v-avatar color="grey-darken-1">
                  <v-icon icon="mdi-account-circle" size="x-large"></v-icon>
                </v-avatar>
                <h3>{{ currentUser.fullname }}</h3>
                <p class="text-caption mt-1">{{ currentUser.email }}</p>
                <v-divider class="my-3"></v-divider>
                <v-btn rounded variant="text">Manage Blog</v-btn>
                <v-divider class="my-3"></v-divider>
                <v-btn rounded variant="text" @click="logOut"> Log out </v-btn>
              </div>
            </v-card-text>
          </v-card>
        </v-menu></span
      >
    </v-list>
  </v-app-bar>

  <v-navigation-drawer v-model="sidebar" temporary class="bg-blue" fixed>
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
        v-if="isAdmin"
        key="Admin panel"
        title="Admin panel"
        :to="{ name: 'Admin' }"
      >
      </v-list-item>

      <v-list-item
        v-for="item in menuItems"
        :key="item.title"
        :title="item.title"
        :prepend-icon="item.icon"
        :value="item.title"
        @click="routerHandler(item.name)"
      >
      </v-list-item>
    </v-list>

    <template v-slot:append>
      <div v-if="isLogged" class="pa-2">
        <v-btn block @click="logOut"> Logout </v-btn>
      </div>
      <div v-else class="pa-2">
        <v-btn block @click="this.$router.push({ name: 'Log In' })">
          Log in
        </v-btn>
      </div>
    </template>
  </v-navigation-drawer>

  <SearchVue class="position-absolute search-inp" />
</template>

<script>
import authMiddleware from "@/middleware/authMiddleware";
import router from "@/router";
import SearchVue from "@/components/Search.vue";

export default {
  name: "App",
  data() {
    return {
      appTitle: "Awesome App",
      sidebar: false,
      menuItems: [
        { title: "Blogs", name: "Home" },
        { title: "Categories", name: "" },
        { title: "Support", name: "" },
        { title: "Introduction", name: "Introduction" },
        { title: "Create blog", name: "CreateBlog" },
      ],
      isLogged: null,
      isAdmin: null,
      currentUser: {},
    };
  },
  components: { SearchVue },
  mounted() {
    this.isLogged = authMiddleware.isAuthenticated();
    this.isAdmin = authMiddleware.isAdmin();
    this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
  },
  methods: {
    routerHandler(name) {
      this.$router.push({ name: `${name}` });
    },

    logOut() {
      localStorage.clear();
      window.location.href = "/";
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

.search-inp {
  top: 5px;
  z-index: 99999;
  right: 20%;
}
</style>
