import Vue from 'vue';
import App from './App.vue';
import router from '@/router';
import store from '@/store';
// import { initStore } from './store'
import registerApp from '@/global';

Vue.config.productionTip = false;
registerApp(Vue);

// Vue.use(initStore)
new Vue({
  render: (h) => h(App),
  store,
  router,
}).$mount('#app');
