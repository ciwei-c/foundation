import Vue from 'vue'
import App from './App.vue'
import "@/styles/index.scss"
import router from './router'
import store from './store'
import api from '@/api';
import ElementUI from 'element-ui';
import "@/styles/element-variables.scss"
import FoundationTable from "@/components/FoundationTable"
Vue.use(ElementUI, {
  size: 'large'
});
Vue.component('FoundationTable', FoundationTable)
Vue.config.productionTip = false
Vue.prototype.$apis = api;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
