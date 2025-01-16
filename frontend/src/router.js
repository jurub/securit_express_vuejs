import { createRouter, createWebHistory } from "vue-router";
import login from "/src/components/login.vue";
import verification from "/src/components/verification.vue";
import visitList from "/src/components/visitList.vue";

const routes = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    component: login,
  },
  {
    path: "/verification",
    component: verification,
  },
  {
    path: "/visites",
    component: visitList,
  },
];

const router = createRouter({
  history: createWebHistory("/"),
  routes,
});

export default router;
