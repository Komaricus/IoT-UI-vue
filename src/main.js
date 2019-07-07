import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueApexCharts from 'vue-apexcharts'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueKonva from 'vue-konva'


Vue.component('apexchart', VueApexCharts)
Vue.use(ElementUI);
Vue.use(VueKonva)

Vue.config.productionTip = false

new Vue({
  router,
  render: function (h) {
    return h(App)
  }
}).$mount('#app')