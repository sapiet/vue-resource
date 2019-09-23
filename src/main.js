import Vue from 'vue'
import VueResource from 'vue-resource'
import App from './App.vue'

Vue.config.productionTip = false

Vue.use(VueResource);
Vue.http.options.root = 'https://jsonplaceholder.typicode.com';

Vue.http.interceptors.push((request, next) => {
  next(response => {
    if (request.after) {
      request.after.call(this, request);
    }
  });
});

new Vue({
  render: h => h(App)
}).$mount('#app')
