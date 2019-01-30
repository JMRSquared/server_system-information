// Polyfills
import 'es6-promise/auto'
import 'babel-polyfill'

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VeeValidate from 'vee-validate'
import App from './App'
import store from './store'
import router from './router'
import VuesticPlugin from '@/vuestic-theme/vuestic-plugin'
import './i18n'
import YmapPlugin from 'vue-yandex-maps'
import VueSocketIO from 'vue-socket.io'

Vue.use(VuesticPlugin)
Vue.use(YmapPlugin)

// NOTE: workaround for VeeValidate + vuetable-2
Vue.use(VeeValidate, {
    fieldsBagName: 'formFields'
})

router.beforeEach((to, from, next) => {
    store.commit('setLoading', true)
    next()
})

router.afterEach((to, from) => {
    store.commit('setLoading', false)
})

/* eslint-disable no-new */
/*
 ENABLE THIS WHEN YOU GET THE SOCKETS TO WORK
Vue.use(new VueSocketIO({
  debug: true,
  connection: 'https://jmrsquared.com/api/',
  vuex: {
    store,
    actionPrefix: 'SOCKET_',
    mutationPrefix: 'SOCKET_'
  }
}))
*/

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App),
})