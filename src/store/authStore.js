import { defineStore } from "pinia";
import handleAuthAPI from "@/API/handleAuthAPI";

export const useAuthStore = defineStore("authStore", {
  state: () => ({
    // user: null,
  }),
  actions: {
    async signUp(newUserData) {
      await handleAuthAPI.signUp(newUserData);
    },
    async logIn(userData) {
      const data = await handleAuthAPI.logIn(userData);
      return data
    },
  },
});
