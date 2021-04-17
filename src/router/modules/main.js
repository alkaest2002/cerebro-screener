import home from "@/views/main/home";
import about from "@/views/main/about";

export default [
  {
    path: "/",
    name: "route-main-home",
    component: home,
  },
  {
    path: "/about",
    name: "route-main-about",
    component: about,
  },
];
