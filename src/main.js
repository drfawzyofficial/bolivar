import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import VueSweetalert2 from 'vue-sweetalert2'
import VueApexCharts from 'vue-apexcharts'
import router from './router/index'
import store from '@/store/index'
import vco from "v-click-outside"
import "@/design/index.scss";
import Sparkline from 'vue-sparklines';



Vue.use(BootstrapVue);

Vue.config.productionTip = false

Vue.use(VueSweetalert2)
Vue.use(require('vue-chartist'))
Vue.use(vco)
Vue.use(Sparkline)
Vue.component('apexchart', VueApexCharts)

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
