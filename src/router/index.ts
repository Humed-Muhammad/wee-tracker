import { auth } from "@/utils";
import { createRouter, createWebHistory } from "@ionic/vue-router";
import {
  RouteRecordRaw,
  RouteLocationNormalized,
  NavigationGuardNext,
} from "vue-router";
import Tabs from "../views/TabsPage.vue";

const guard = (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  try {
    auth.onAuthStateChanged((user) => {
      if (user) {
        next();
      } else {
        next("/auth");
      }
    });
  } catch (error) {
    next("/auth");
  }
};

const routes: Array<RouteRecordRaw> = [
  {
    path: "/auth",
    component: () => import("@/views/AuthenticationPage.vue"),
    // beforeEnter: guard,
  },
  {
    path: "/change-password",
    component: () => import("@/views/ChangePassword.vue"),
    beforeEnter: guard,
  },
  {
    path: "/",
    component: Tabs,
    children: [
      {
        path: "",
        redirect: "/tab1",
      },
      {
        path: "tab1",
        component: () => import("@/views/HomePage.vue"),
        beforeEnter: guard,
      },
      {
        path: "tab2",
        component: () => import("@/views/Tab2Page.vue"),
        beforeEnter: guard,
      },
      {
        path: "tab3",
        component: () => import("@/views/UserSettings.vue"),
        beforeEnter: guard,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
