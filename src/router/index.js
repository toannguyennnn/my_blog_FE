import { createRouter, createWebHistory } from "vue-router";
import authMiddleware from "@/middleware/authMiddleware";

const routes = [
  {
    path: "/",
    component: () => import("@/layouts/default/Default.vue"),
    children: [
      {
        path: "",
        name: "Home",
        component: () => import("@/views/Home.vue"),
      },
      // {
      //   path: "/admin",
      //   name: "Admin",
      //   component: () => import("@/views/Admin.vue"),
      //   meta: { requireAdmin: true },
      // },
      // {
      //   path: "/manage-blogs",
      //   name: "Manage Blogs",
      //   component: () => import("@/views/ManageBlogs.vue"),
      //   meta: { requireAdmin: true },
      // },
      {
        path: "/test",
        name: "Test",
        component: () => import("@/views/Test.vue"),
      },
      {
        path: "/blog/:id",
        name: "Blog",
        component: () => import("@/views/Blog.vue"),
      },
      {
        path: "/create-blog",
        name: "CreateBlog",
        component: () => import("@/views/CreateBlog.vue"),
        meta: { requireAuth: true },
      },
    ],
  },
  {
    path: "/sign-up",
    name: "Sign Up",
    component: () => import("@/views/SignUp.vue"),
  },
  {
    path: "/log-in",
    name: "Log In",
    component: () => import("@/views/LogIn.vue"),
  },

  {
    path: "/:pathMatch(.*)*",
    name: "404NotFound",
    component: () => import("@/views/404NotFound.vue"),
  },
  {
    path: "/",
    component: () => import("@/layouts/admin/Default.vue"),
    children: [
      {
        path: "/admin",
        name: "Admin",
        component: () => import("@/views/Admin.vue"),
        meta: { requireAdmin: true },
      },
      {
        path: "/admin/manage-users",
        name: "Manage Users",
        component: () => import("@/views/ManageUsers.vue"),
        meta: { requireAdmin: true },
      },
      {
        path: "/admin/manage-blogs",
        name: "Manage Blogs",
        component: () => import("@/views/ManageBlogs.vue"),
        meta: { requireAdmin: true },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from) => {
  const isAuth = authMiddleware.isAuthenticated();
  const isAdmin = authMiddleware.isAdmin();

  console.log(isAdmin);

  if (to.meta.requireAdmin && isAdmin) {
    return true;
  }
  if (to.meta.requireAdmin && !isAdmin) {
    return { name: "Home" };
  }

  if (to.meta.requireAuth && isAuth) {
    return true;
  }

  if (to.meta.requireAuth && !isAuth && to.name !== "Log In") {
    return { name: "Log In" };
  }

  if (isAuth) {
    if (to.name == "Sign Up" || to.name == "Log In") {
      return { name: "Home" };
    }
  }
});

export default router;
