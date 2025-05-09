import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: () => import("../views/HomeView.vue"),
  },
  {
    path: "/news",
    name: "Center News",
    component: () => import("../views/CenterNewsView.vue"),
  },
  {
    path: "/recruit",
    name: "Recruitment",
    component: () => import("../views/RecruitmentView.vue"),
  },
  {
    path: "/career",
    name: "Career Profile",
    component: () => import("../views/CareerProfileView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
