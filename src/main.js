import Vue from 'vue'
import App from './App.vue'
import store from './store/index'
import Vuelidate from 'vuelidate';
import router from './routing'

Vue.use(Vuelidate)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  store,
  router
}).$mount('#app')
