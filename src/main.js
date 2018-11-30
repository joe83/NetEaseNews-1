// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// 全局使用axios ajax请求
import axios from 'axios'
import VueAxios from 'vue-axios'

// 全局引入
import './public/scss/_base.scss'

Vue.config.productionTip = false

// vue 使用axios
Vue.use(VueAxios, axios)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

router.push('/')
