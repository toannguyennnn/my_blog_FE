import { defineStore } from "pinia";
import handleBlogAPI from "@/API/handleBlogAPI";

export const useBlogsStore = defineStore("blogsStore", {
  state: () => ({
    blogs: [],
  }),
  actions: {
    async createBlog(newBlog) {
      await handleBlogAPI.createBlog(newBlog);
    },

    async getBlogs() {
      const response = await handleBlogAPI.getBlogs();
      return (this.blogs = response.blogs);
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
