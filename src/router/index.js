import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import SignUp from "../views/SignUp.vue";
import DisplayView from "../views/DisplayView.vue";
import VerifyClient from "../views/VerifyClient.vue";
import AdminOrganization from "../views/AdminOrganization.vue";
import AdminInventory from "../views/AdminInventory.vue";
import NotFound from "../views/NotFound.vue";
import UserProfile from "../views/UserProfile.vue";

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
        meta: {
            hideNavbar: true,
        },
    },
    {
        path: "/displayview/admin-organization",
        name: "AdminOrganization",
        component: AdminOrganization,
        meta: {
            hideNavbar: true,
        },
    },
    {
        path: "/displayview/admin-inventory",
        name: "AdminInventory",
        component: AdminInventory,
        meta: {
            hideNavbar: true,
        },
    },
    {
        path: "/displayview/user-profile",
        name: "UserProfile",
        component: UserProfile,
        meta: {
            hideNavbar: true,
        },
    },
    {
        path: "/verify-client",
        name: "VerifyClient",
        component: VerifyClient,
    },
    {
        path: "*",
        name: "NotFound",
        component: NotFound,
        meta: {
            hideNavbar: true,
        },
    },
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});

export default router;
