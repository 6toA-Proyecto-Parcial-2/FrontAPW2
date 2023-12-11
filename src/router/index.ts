import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";
import Encargado from "../views/Encargado.vue";
import Inventario from "../views/Inventario.vue";
import Idioma from "../views/Idioma.vue";
import origenIdioma from "../views/origenIdioma.vue";
import TraduccionIdioma from "../views/TraduccionIdioma.vue";
import Libro from "../views/Libro.vue";
import Categoria from "../views/Categoria.vue";
import Editorial from "../views/Editorial.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/encargado",
    name: "encargado",
    component: Encargado,
  },
  {
    path: "/inventario",
    name: "inventario",
    component: Inventario,
  },
  {
    path: "/idioma",
    name: "idioma",
    component: Idioma,
  },
  {
    path: "/origenIdioma",
    name: "origenIdioma",
    component: origenIdioma,
  },
  {
    path: "/TraduccionIdioma",
    name: "TraduccionIdioma",
    component: TraduccionIdioma,
  },
  {
    path: "/libros",
    name: "libro",
    component: Libro,
  },
  {
    path: "/categorias",
    name: "categoria",
    component: Categoria,
  },
  {
    path: "/editoriales",
    name: "editorial",
    component: Editorial,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
