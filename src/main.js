import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import * as firebase from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyDlW80QsSNWI0QeTP02F1oRuSkDBF6S_Z4",
    authDomain: "litecount-5fba6.firebaseapp.com",
    projectId: "litecount-5fba6",
    storageBucket: "litecount-5fba6.appspot.com",
    messagingSenderId: "1095864396718",
    appId: "1:1095864396718:web:dce04920df42396f14f63f",
    measurementId: "G-HKS5CKY6KG",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

Vue.config.productionTip = false;

new Vue({
    router,
    render: (h) => h(App),
}).$mount("#app");
