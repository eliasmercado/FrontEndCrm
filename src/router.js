import Vue from "vue";
import Router from "vue-router";
import auth from "./auth";
import Home from "./views/home";
import Contacts from "./views/contacts/contacts-form"
import Company from "./views/contacts/company-form"
import Category from "./views/products/category-form"
import Brand from "./views/products/brand-form"
import Product from "./views/products/product-form"
import Opportunity from "./views/sales/opportunity-form"
import defaultLayout from "./layouts/master-layout";
import simpleLayout from "./layouts/login-layout";
import ContactsLead from "./views/leads/contacts-form"
import CompanyLead from "./views/leads/company-form"
import BranchForm from "./views/sales/branch-form"

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
      },
    },
    {
      path: "/contactos",
      name: "contacts",
      meta: { requiresAuth: true },
      components: {
        layout: defaultLayout,
        content: Contacts
      },
    },
    {
      path: "/empresas",
      name: "company",
      meta: { requiresAuth: true },
      components: {
        layout: defaultLayout,
        content: Company
      },
    },
    {
      path: "/categorias",
      name: "category",
      meta: { requiresAuth: true },
      components: {
        layout: defaultLayout,
        content: Category
      },
    },
    {
      path: "/marcas",
      name: "Brand",
      meta: { requiresAuth: true },
      components: {
        layout: defaultLayout,
        content: Brand
      },
    },
    {
      path: "/productos",
      name: "Products",
      meta: { requiresAuth: true },
      components: {
        layout: defaultLayout,
        content: Product
      },
    },
    {
      path: "/oportunidades",
      name: "Opportunity",
      meta: { requiresAuth: true },
      components: {
        layout: defaultLayout,
        content: Opportunity
      },
    },
    ,
    {
      path: "/lead/contactos",
      name: "contactsLead",
      meta: { requiresAuth: true },
      components: {
        layout: defaultLayout,
        content: ContactsLead
      },
    },
    {
      path: "/lead/empresas",
      name: "companyLead",
      meta: { requiresAuth: true },
      components: {
        layout: defaultLayout,
        content: CompanyLead
      },
    },
    {
      path: "/sucursales",
      name: "Branches",
      meta: { requiresAuth: true },
      components: {
        layout: defaultLayout,
        content: BranchForm
      },
    },
    {
      path: "/login",
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
