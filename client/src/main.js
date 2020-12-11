import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify';
import VueResource from 'vue-resource'
import Auth from './auth'

Vue.config.productionTip = false
Vue.use(VueResource)
Vue.use(Auth)

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.forVisitors)) {
      if (Vue.auth.isAuthenticated()) {
        next('/home')
      }
      else next()
    }
    if (to.matched.some(record => record.meta.requireAuth)) {
      if (!Vue.auth.isAuthenticated()) {
        next('/login')
      }
      else next()
    }
    else next()
})

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
