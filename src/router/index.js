// Composables
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: () => import("@/layouts/default/Default.vue"),
    children: [
      {
        path: "",
        name: "Home",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import("@/views/Home.vue"),
      },
      {
        path: "/admin",
        name: "Admin",
        component: () => import("@/views/Admin.vue"),
      },
      {
        path: "/create",
        name: "CreateBlog",
        component: () => import("@/views/CreateBlog.vue"),
      },
      {
        path: "/sign-up",
        name: "SignUp",
        component: () => import("@/views/SignUp.vue"),
      }
    ],
  },
  {
    path: "/sign-up",
    component: () => import("@/layouts/default/Auth.vue"),
    children: [
      {
        path: "/sign-up",
        name: "SignUp",
        component: () => import("@/views/SignUp.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
