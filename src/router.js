import Vue from "vue";
import Router from "vue-router";
import auth from "./auth";
import Home from "./views/home";
import defaultLayout from "./layouts/master-layout";
import simpleLayout from "./layouts/login-layout";

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: "/home",
      name: "home",
      meta: { requiresAuth: true },
      components: {
        layout: defaultLayout,
        content: Home
      }
    },
    {
      path: "/login-form",
      name: "login-form",
      meta: { requiresAuth: false },
      components: {
        layout: simpleLayout,
        content: () =>
          import(/* webpackChunkName: "login" */ "./views/login/login-form")
      },
      props: {
        layout: {
          title: "Iniciar Sesión"
        }
      }
    },
    {
      path: "/reset-password",
      name: "reset-password",
      meta: { requiresAuth: false },
      components: {
        layout: simpleLayout,
        content: () =>
          import(/* webpackChunkName: "login" */ "./views/login/reset-password-form")
      },
      props: {
        layout: {
          title: "Resetear Contraseña",
          description: "Ingrese la dirección de correo electrónico que tiene registrado y le enviaremos un enlace para restablecer su contraseña por correo electrónico."
        }
      }
    },
    {
      path: "/",
      redirect: "/home"
    },
    {
      path: "*",
      redirect: "/home"
    }
  ],
  mode: "history"
});

router.beforeEach((to, from, next) => {

  if (to.name === "login-form" && auth.loggedIn()) {
    next({ name: "home" });
  }

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!auth.loggedIn()) {
      next({
        name: "login-form",
        query: { redirect: to.fullPath }
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
