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

    async getBlogs(blogId) {
      const response = await handleBlogAPI.getBlogs(blogId);
      if (response) {
         return (this.blogs = response.blogs);
      }

    },

    // async updateUser(userId, updatedData) {
    //   await handleUserAPI.updateUser(userId, updatedData);
    //   this.getUsers();
    // },

    async deleteBlog(blogId) {
      await handleBlogAPI.deleteBlog(blogId);
      this.getBlogs('all');
    },
  },
});
