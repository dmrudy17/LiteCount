import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import SignUp from "../views/SignUp.vue";
import DisplayView from "../views/DisplayView.vue";
import VerifyClient from "../views/VerifyClient.vue";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "home",
        component: Home,
    },
    {
        path: "/login",
        name: "login",
        component: () => import("../views/LogIn.vue"),
    },
    {
        path: "/signup",
        name: "SignUp",
        component: SignUp,
        meta: {
            auth: true,
        },
    },
    {
        path: "/displayview",
        name: "DisplayView",
        component: DisplayView,
    },
    {
        path: "/verify-client",
        name: "VerifyClient",
        component: VerifyClient,
    },
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});

export default router;
