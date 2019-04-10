import Vue from "vue";
import Router from "vue-router";
import store from './store'
import Home from '../pages/Home.vue'
import Admin from '../pages/Admin.vue'
import Products from '../components/Products.vue'
import Product from '../pages/Product.vue'
import Companies from '../components/Companies.vue'
import Company from '../pages/Company.vue'
import Contact from '../pages/Contact.vue'
import Login from '../pages/Login.vue'

Vue.use(Router);
const routes = [
    {
        path: '/',
        component: Home
    },
    {
        path: '/products',
        component: Products
    },
    {
        path: '/products/:id',
        name: 'product',
        component: Product
    },
    {
        path: '/companies',
        component: Companies
    },
    {
        path: '/companies/:id',
        name: 'company',
        component: Company
    },
    {
        path: '/contact',
        name: 'contact',
        component: Contact
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/admin',
        name: 'admin',
        component: Admin,
        meta: {
            requiresAuth: true
        }
    },
];
let router = new Router({
    routes,
    mode: 'history'
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (store.getters.isLoggedIn) {
            next()
            return
        }
        next('/login')
    } else {
        next()
    }
})

export default router;