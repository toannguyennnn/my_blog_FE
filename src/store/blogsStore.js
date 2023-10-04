import { defineStore } from "pinia";
import handleUserAPI from "@/API/handleUserAPI";
import handleBlogAPI from "@/API/handleBlogAPI";

export const useBlogsStore = defineStore("blogsStore", {
  state: () => ({
    blogs: [],
  }),
  actions: {
    // async createUser(newUserData) {
    //   await handleUserAPI.createUser(newUserData);
    //   this.getUsers();
    // },

    async getBlogs() {
      const response = await handleBlogAPI.getBlogs();
      return this.blogs = response.blogs;
    },

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
