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
      // location.reload();
    },

    async getUsers(currentPage, limit) {
      const response = await handleUserAPI.getUsers(currentPage, limit);
      this.users = response.data.users;
      return response;
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
