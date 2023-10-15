import { defineStore } from "pinia";
import handleAuthAPI from "@/API/handleAuthAPI";

export const useAuthStore = defineStore("authStore", {
  state: () => ({
    users: [],
  }),
  actions: {
    async signUp(newUserData) {
      await handleAuthAPI.signUp(newUserData);
    },

    // async getUsers() {
    //   const response = await handleUserAPI.getUsers();
    //   if (response) {
    //     this.users = response.users;
    //   }
    // },

    // async updateUser(userId, updatedData) {
    //   await handleUserAPI.updateUser(userId, updatedData);
    //   this.getUsers();
    // },

    // async deleteUser(userId) {
    //   await handleUserAPI.deleteUser(userId);
    //   this.getUsers();
    // },
  },
});
