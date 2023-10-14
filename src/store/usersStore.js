import { defineStore } from "pinia";
import handleUserAPI from "@/API/handleUserAPI";

export const useUsersStore = defineStore("usersStore", {
  state: () => ({
    users: [],
  }),
  actions: {
    async createUser(newUserData) {
      await handleUserAPI.createUser(newUserData);
      this.getUsers();
    },

    async getUsers() {
      const response = await handleUserAPI.getUsers();
      if (response) {
        this.users = response.users;
      }
    },

    async updateUser(userId, updatedData) {
      await handleUserAPI.updateUser(userId, updatedData);
      this.getUsers();
    },

    async deleteUser(userId) {
      await handleUserAPI.deleteUser(userId);
      this.getUsers();
    },
  },
});
