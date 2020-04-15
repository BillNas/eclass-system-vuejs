import Vue from "vue";
import firebase from "firebase";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Register from "../views/auth/Register.vue";
import Login from "../views/auth/Login.vue";
import Profile from "../views/auth/Profile.vue";
import Lessons from "../views/Lessons.vue";
import LessonDetail from "../views/LessonDetail.vue";
import About from "../views/About.vue";
Vue.use(VueRouter);

const routes = [{
        path: "/",
        name: "home",
        component: Home
    },
    {
        path: "/register",
        name: "register",
        component: Register
    },
    {
        path: "/login",
        name: "login",
        component: Login
    },
    {
        path: "/profile",
        name: "profile",
        component: Profile,
        meta: {
            auth: true
        }
    },
    {
        path: "/about",
        name: "about",
        component: About
    },
    {
        path: "/lessons",
        name: "lessons",
        component: Lessons,
        meta: {
            auth: true
        }
    },
    {
        path: "/:name",
        name: "lesson",
        component: LessonDetail,
        meta: {
            auth: true
        }
    }
];

const router = new VueRouter({
    routes
});
router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.auth)) {
        firebase.auth().onAuthStateChanged(function(user) {
            if (!user) {
                next({
                    path: "/login"
                });
            } else {
                next();
            }
        });
    } else {
        next();
    }
});
export default router;