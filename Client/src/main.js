import '@fortawesome/fontawesome-free/css/all.min.css'
import 'bootstrap-css-only/css/bootstrap.min.css'
import 'mdbvue/lib/css/mdb.min.css'

import Vue from 'vue'
import App from './App.vue'
import router from './router'
// import axios from "axios";
import store from './store'
import VueSweetalert2 from 'vue-sweetalert2';

import BootstrapVue from 'bootstrap-vue/dist/bootstrap-vue.esm';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

Vue.config.productionTip = false
Vue.use(VueSweetalert2);
Vue.use(BootstrapVue);

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')