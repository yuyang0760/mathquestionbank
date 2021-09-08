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

Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')