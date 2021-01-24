// https://github.com/ChenCyl/vue-network-d3
// https://mdbootstrap.com/docs/vue/components/cards/#testimonial-card
// https://element.eleme.io/#/en-US/component/button
// https://bootstrap-vue.org/docs/components/sidebar#accessibility
// https://bl.ocks.org/steveharoz/8c3e2524079a8c440df60c1ab72b5d03
import '@fortawesome/fontawesome-free/css/all.min.css'
import 'bootstrap-css-only/css/bootstrap.min.css'
import 'mdbvue/lib/css/mdb.min.css'

import Vue from "vue";
import App from "./App.vue";
import router from "./router";
// import axios from "axios";
import store from "./store";
import VueSweetalert2 from "vue-sweetalert2";

import BootstrapVue from "bootstrap-vue/dist/bootstrap-vue.esm";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

import * as VueWindow from "@hscmap/vue-window";

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false;
Vue.use(VueSweetalert2);
Vue.use(BootstrapVue);
Vue.use(VueWindow);
Vue.use(ElementUI);

Vue.prototype.$clone = function(value) {
    if (typeof value != "object") {
        return value;
    }

    var obj = value;
    var newObj;

    if (obj instanceof Array) {
        newObj = [];
    } else if (typeof obj == "object") {
        newObj = {};
    }

    for (let k in obj) {
        let v = obj[k];

        if (obj instanceof Array) {
            newObj.push(this.$clone(v));
        } else if (typeof obj === "object") {
            newObj[k] = this.$clone(v);
        } else {
            //should not arrive at this point
        }
    }

    return newObj;
};

new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount("#app");