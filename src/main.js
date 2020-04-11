import Vue from 'vue'
import App from './App.vue'
// import socketio from 'socket.io-client';
// import VueSocketIO from 'vue-socket.io';

// export const SocketInstance = socketio('http://localhost:4113')
// Vue.use(VueSocketIO, SocketInstance);
// Vue.use(new VueSocketIO({
//   debug: true,
//   connection: SocketIO('http://localhost:4113', {}),
// }))

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
