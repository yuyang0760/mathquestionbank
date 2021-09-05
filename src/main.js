import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// katex
import XesKatex from 'xes-katex'
import 'xes-katex/dist/katex.css'
Vue.use(xesKatex,{
  flag:[{left:'$$',right:'$$'},{left:'$',right:'$'}],
  compatible:true,
  compatibleConfig:{
    "{align}":"{aligned}"
  },
  options:{
    displayMode:true,
    throwOnError:true,
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
