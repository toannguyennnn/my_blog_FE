<template>
  <v-layout class="rounded rounded-md">
    <v-navigation-drawer v-model="sidebar">
      <v-list nav>
        <v-list-item>
          <router-link
            :to="{ name: 'Home' }"
            class="text-decoration-none text-black font-weight-bold d-flex"
          >
            <v-img src="../../assets/logo.svg" max-width="20px"></v-img>
            <h3 class="ms-1">My Blogs</h3>
          </router-link>
        </v-list-item>

        <v-list-item
          key="Trang chủ"
          title="Trang chủ"
          prepend-icon="mdi-home"
          :to="{ name: 'Admin' }"
        ></v-list-item>
        <v-list-item
          key="Manage Users"
          title="Manage Users"
          prepend-icon="mdi-account-circle"
          :to="{ name: 'Manage Users' }"
        ></v-list-item>
        <v-list-item
          key="Manage Blogs"
          title="Manage Blogs"
          prepend-icon="mdi-newspaper"
          :to="{ name: 'Manage Blogs' }"
        ></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar title="Management Dashboard" icon>
      <template v-slot:prepend>
        <v-app-bar-nav-icon @click="sidebar = !sidebar"></v-app-bar-nav-icon>
      </template>

      <v-list-item v-if="!sidebar" class="flex-1-1">
        <router-link
          :to="{ name: 'Home' }"
          class="text-decoration-none text-black font-weight-bold d-flex"
        >
          <v-img src="../../assets/logo.svg" max-width="20px"></v-img>
          <h3 class="ms-1">My Blogs</h3>
        </router-link>
      </v-list-item>

      <span class="d-flex align-center ms-7">
        <span class="w-100"
          >Welcome,
          <p class="font-weight-bold d-inline">{{ currentUser.fullname }}</p>
        </span>
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
                <v-btn rounded variant="text">Profile</v-btn>
                <v-divider class="my-3"></v-divider>
                <v-btn rounded variant="text" @click="logOut"> Log out </v-btn>
              </div>
            </v-card-text>
          </v-card>
        </v-menu></span
      >
    </v-app-bar>

    <v-main class="h-screen d-flex flex-column justify-space-between">
      <router-view class="flex-1-1" />

      <default-footer v-if="!sidebar" />
    </v-main>
  </v-layout>
</template>

<script setup>
import DefaultFooter from "../default/Footer.vue";
import { ref, onMounted } from "vue";

const sidebar = ref(false);
const currentUser = ref("");

onMounted(() => {
  currentUser.value = JSON.parse(localStorage.getItem("currentUser"));
});

const logOut = () => {
  localStorage.clear();
  window.location.href = "/";
};
</script>

<style></style>
