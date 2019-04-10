import '@mdi/font/css/materialdesignicons.css'
import 'typeface-roboto/index.css';
import Vue from 'vue'
import './vuetify'
import App from '../App.vue'
import router from './router'
import store from './store'

new Vue({
    el: '#app',
    template: '<App/>',
    components: { App },
    router,
    store
}).$mount('#app');