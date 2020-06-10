import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Notes from "../views/Notes.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Notes",
    component: Notes
  },
  {
    path: "/labels/:label",
    component: Notes
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
