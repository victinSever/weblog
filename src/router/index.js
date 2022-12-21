import Vue from 'vue';
import Router from 'vue-router';

import NProgress from 'nprogress'   // 导入 nprogress
import 'nprogress/nprogress.css'   // 导入样式，否则看不到效果

NProgress.configure({ showSpinner: false })   // 显示右上角螺旋加载提示

Vue.use(Router)

// 引入路由
import routes from './routes';


const router = new Router({
    //history模式，需要和服务端配合才能在生产环境下正常使用
    // mode: 'history',
    // hash
    mode: 'hash',

    // 基本路由，和vue.config.js中的publicPath一致
    // base: '/vue/',

    routes: routes
})

// 拦截器
router.beforeEach((to, from, next) => {
    const baseTitle = ' - weblog'

    if (to.meta.title) {
        document.title = to.meta.title + baseTitle; //设置标题
    }

    // 设置文章标题内容
    if (to.name === 'post') {
        if (to.params.title) document.title = to.params.title + ' - ' + document.title
    }

    NProgress.start()   // 开启进度条

    // 拦截
    // 管理员权限分级
    if(to.path.includes('admin')) {
        const {role} = JSON.parse(localStorage.getItem('userInfo'))
        if(role === 'admin') next()
    }
    else if (to.path.includes('creator') || to.path.includes('editor') || to.path.includes('user')) {
        if (localStorage.getItem('token'))
            next() //放行
    } else {
        next()
    }

    NProgress.done()   // 关闭进度条
})

export default router