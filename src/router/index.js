import { createRouter, createWebHistory } from "vue-router";
import DefaultVue from "@/layouts/default/Default.vue";
import HomeVue from "@/views/Home.vue";
import AdminVue from "@/views/Admin.vue";
import ManageBlogsVue from "@/views/ManageBlogs.vue";
import TestVue from "@/views/Test.vue";
import BlogVue from "@/views/Blog.vue";
import CreateBlogVue from "@/views/CreateBlog.vue";
import SignUpVue from "@/views/SignUp.vue";

const routes = [
  {
    path: "/",
    component: DefaultVue,
    children: [
      {
        path: "",
        name: "Home",
        component: HomeVue,
      },
      {
        path: "/admin",
        name: "Admin",
        component: AdminVue,
      },
      {
        path: "/manage-blogs",
        name: "Manage Blogs",
        component: ManageBlogsVue,
      },
      {
        path: "/test",
        name: "Test",
        component: TestVue,
      },
      {
        path: "/blog/:id",
        name: "Blog",
        component: BlogVue,
      },
      {
        path: "/create-blog",
        name: "CreateBlog",
        component: CreateBlogVue,
      },
    ],
  },
  {
    path: "/sign-up",
    name: "Sign Up",
    component: SignUpVue,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
