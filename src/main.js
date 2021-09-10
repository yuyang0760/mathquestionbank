import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
 
import XesKatex from 'xes-katex'
import 'xes-katex/dist/katex.css'
Vue.use(xesKatex,{
  flag:[{left:'$',right:'$'}],
  compatible:true,
  compatibleConfig:{
    "{align}":"{aligned}"
  },
  options:{
    strict:false,
    displayMode:false,
    throwOnError:false,
    errorColor:'#FF0000'
  }
})
// ElementUI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

import HappyScroll from 'vue-happy-scroll'
  // 引入css
  import 'vue-happy-scroll/docs/happy-scroll.css'
  Vue.use(HappyScroll)

Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
