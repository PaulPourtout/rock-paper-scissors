import Vue from 'vue'
import App from './App.vue'
import VueSocketIO from 'vue-socket.io'
import { store } from './store'

Vue.use(new VueSocketIO({
  debug: true,
  connection: 'http://localhost:4113',
  vuex: {
    store,
    actionPrefix: 'SOCKET_',
    mutationPrefix: 'SOCKET_'
  }
}));
Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
