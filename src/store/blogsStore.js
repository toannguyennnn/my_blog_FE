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

    async getBlogs(blogId, currentPage, limit) {
      const response = await handleBlogAPI.getBlogs(blogId, currentPage, limit);
      this.blogs = response.blogs;
      return response;
    },

    // async updateUser(userId, updatedData) {
    //   await handleUserAPI.updateUser(userId, updatedData);
    //   this.getUsers();
    // },

    async deleteBlog(blogId) {
      await handleBlogAPI.deleteBlog(blogId);
      this.getBlogs("all");
    },
  },
});
