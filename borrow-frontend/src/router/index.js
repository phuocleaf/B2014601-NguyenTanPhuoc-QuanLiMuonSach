import { createWebHistory, createRouter } from "vue-router";
import ContactBook from "@/views/admin/BorrowBook.vue";

const routes = [

    {
        path: "/admin/login",
        name: "login",
        component: () => import("@/views/admin/SignIn.vue"),
    },

    {
        path: "/admin/",
        name: "borrowbook",
        component: ContactBook,
        meta: { requiresAuth: true }
    },

    {
        path: "/:pathMatch(.*)*",
        name: "notfound",
        component: () => import("@/views/NotFound.vue"),
    },

    {
        path: "/admin/book/:id",
        name: "book.edit",
        component: () => import("@/views/admin/BookEdit.vue"),
        props: true, // Truyền các biến trong $route.params vào làm props
        meta: { requiresAuth: true }
    },

    {
        path: "/admin/book/add",
        name: "book.add",
        component: () => import("@/views/admin/BookAdd.vue"),
        meta: { requiresAuth: true }
    },

    {
        path: "/admin/nxb/add",
        name: "nxb.add",
        component: () => import("@/views/admin/NXBAdd.vue"),
        meta: { requiresAuth: true }
    },
    {
        path: "/admin/nhaxuatban/:id",
        name: "nxb.edit",
        component: () => import("@/views/admin/NXBEdit.vue"),
        props: true, // Truyền các biến trong $route.params vào làm props
        meta: { requiresAuth: true }
    },
    {
        path: "/admin/nxb",
        name: "NXB",
        component: () => import("@/views/admin/NXBBook.vue"),
        meta: { requiresAuth: true }
    },

    {
        path: "/admin/info",
        name: "admin.info",
        component: () => import("@/views/admin/AdminInfo.vue"),
        meta: { requiresAuth: true }
    },

    {
        path: "/",
        name: "home",
        component: () => import("@/views/user/BorrowBook.vue"),
    },
    
    {
        path: "/user/login",
        name: "user.login",
        component: () => import("@/views/user/SignIn.vue"),
    },

    {
        path: "/user/signup",
        name: "user.signup",
        component: () => import("@/views/user/SignUp.vue"),
    },

    {
        path: "/user/info",
        name: "user.info",
        component: () => import("@/views/user/UserInfo.vue"),
        meta: { requiresUserAuth: true }
    }
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

router.beforeEach((to, from, next) => {
    const isAuthenticated = localStorage.getItem("AdminId");
    if (to.meta.requiresAuth && !isAuthenticated) {
      next({ name: "login" });
    } else if (to.name === "login" && isAuthenticated) {
      next({ name: "borrowbook" });
    } else {
      next();
    }

  });

export default router;
