import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";
import Encargado from "../views/Encargado.vue";
import Inventario from "../views/Inventario.vue";
import Idioma from "../views/Idioma.vue";
import origenIdioma from "../views/origenIdioma.vue";
<<<<<<< HEAD
import TraduccionIdioma from "../views/TraduccionIdioma.vue";
import Libro from "../views/Libro.vue";
import Categoria from "../views/Categoria.vue";
import Editorial from "../views/Editorial.vue";
=======
import TraduccionIdioma from "../views/TraduccionIdioma.vue"
import Autores from "@/components/Autores.vue";
import Generos from "@/components/Generos.vue";
import Nacionalidades from "@/components/Nacionalidades.vue";

>>>>>>> c293f1ca58b5a4d874a3976499ae9fd744cefe85

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
<<<<<<< HEAD
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
=======
    path: "/autor",
    name: "autor",
    component: Autores,
  },
  {
    path: "/genero",
    name: "genero",
    component: Generos,
  },
  {
    path: "/nacionalidad",
    name: "nacionalidad",
    component: Nacionalidades,
>>>>>>> c293f1ca58b5a4d874a3976499ae9fd744cefe85
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
