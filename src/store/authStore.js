import { defineStore } from "pinia";
import handleAuthAPI from "@/API/handleAuthAPI";

export const useAuthStore = defineStore("authStore", {
  state: () => ({
    currentUser: null,
  }),
  actions: {
    async signUp(newUserData) {
      const data = await handleAuthAPI.signUp(newUserData);
      return data;
    },
    async logIn(userData) {
      const data = await handleAuthAPI.logIn(userData);
      this.currentUser = data.user;
      return data;
    },
  },
});
