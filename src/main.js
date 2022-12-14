import Vue from 'vue'
import App from './App.vue'

//引入vuex
import store from '@/store'

//引入路由
import router from '@/router'

//引入element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI)

// 引入mavon-editor，md富文本编辑器
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
Vue.use(mavonEditor)

// 引入md文章渲染器样式
import 'github-markdown-css/github-markdown.css'

// 引入代码高亮
import hljs from 'highlight.js'
// 如果开启了typescript 需要额外安装 npm install @types/highlight.js
// 通过 import * as hljs from 'highlight.js' 引入
Vue.directive('highlight', function (el) {
  const blocks = el.querySelectorAll('pre code')
  blocks.forEach(block => {
    hljs.highlightBlock(block)
  })
})

// 引入npgrogress
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
Vue.prototype.$nprogress = nprogress

// 关闭生产提示
Vue.config.productionTip = false

// 绑定一个bus，实现全局总线通信
Vue.prototype.$bus = new Vue()

// 绑定图片上传路径
import {imageSeverUrl} from '@/api/base';
Vue.prototype.$upload_path = imageSeverUrl

import VueParticles from 'vue-particles'
Vue.use(VueParticles)

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
