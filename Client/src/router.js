import Vue from 'vue'
import Router from 'vue-router'

import Home from './views/Home.vue'
import Loading from './views/Loading.vue'
import Dashboard from './views/Dashboard.vue'
import Admin from './views/Admin.vue'

Vue.use(Router);
const routes = [{
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/loading',
        name: 'loading',
        component: Loading,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/admin',
        name: 'admin',
        component: Admin,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/dashboard',
        name: 'dashboard',
        component: Dashboard,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '*',
        redirect: '/'
    }
];


const router = new Router({
    mode: "history",
    base: process.env.BASE_URL,
    routes
});

router.beforeEach((to, from, next) => {
    const publicPages = ['/about', '/'];
    const authRequired = !publicPages.includes(to.path);
    const loggedIn = localStorage.getItem('jwt');
    // console.log(authRequired + " " + loggedIn + " " + to.path);
    // console.log(authRequired + " " + to.matched.some(record => record.meta.requiresAuth));
    if (authRequired && (!loggedIn || !to.matched.some(record => record.meta.requiresAuth))) {
        return next('/');
    }
    next();

    // if (to.matched.some(record => record.meta.requiresAuth)) {
    //     if (localStorage.getItem("jwt") == null) {
    //         next({
    //             path: "/"
    //         });
    //     } else {
    //         next();
    //     }
    // } else {
    //     next();
    // }
})

export default router;



// admin       test1234