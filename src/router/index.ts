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
    name: "centerNews",
    component: () => import("../views/CenterNewsView.vue"),
  },
  {
    path: "/recruit",
    component: () => import("../views/RecruitmentView.vue"),
    children: [
      {
        path: "",
        name: "recruitmentList",
        component: () => import("../pages/RecruitmentPage.vue"),
      },
      {
        path: ":recruitId",
        name: "recruitmentDetail",
        component: () => import("../pages/RecruitmentDetailPage.vue"),
        props: true,
      }
    ]
  },
  {
    path: "/career",
    name: "careerProfile",
    component: () => import("../views/CareerProfileView.vue"),
  },
  // 존재하지 않는 경로에 대한 처리
  {
    path: "/:pathMatch(.*)*",
    name: "notFound",
    component: () => import("../views/error/NotFoundView.vue"),
  }
];
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
