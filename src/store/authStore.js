import { defineStore } from "pinia";
import handleAuthAPI from "@/API/handleAuthAPI";

export const useAuthStore = defineStore("authStore", {
  state: () => ({
    currentUser: null,
  }),
  actions: {
    async signUp(newUserData) {
      await handleAuthAPI.signUp(newUserData);
    },
    async logIn(userData) {
      const data = await handleAuthAPI.logIn(userData);
      this.currentUser = data.user;
      return data;
    },
  },
});
