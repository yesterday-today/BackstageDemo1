// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Axios from 'axios'
import ViewUI from 'view-design'
import 'view-design/dist/styles/iview.css'

Vue.use(ViewUI);

Vue.config.productionTip = false

// 设置全局axios
Vue.prototype.$axios=Axios
// 设置基本的路径名称
Axios.defaults.baseURL='/api'
// 设置post请求的内容类型，不发送post请求可以不用设置
Axios.defaults.headers.post['Content-Type']='application/json'
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
