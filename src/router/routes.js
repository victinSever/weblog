/**
 * 一级路由
 */

//引入二级路由
import creator from './creator'
import user from './user'
import signup from './signup'

export default [
    {
        path: '/',
        meta: { title: 'weblog'},
        name: 'passage',
        component: () => import('@/views/Passage'),
    },
    {
        path: '/signup',
        meta: { title: 'weblog - 用户登录', hiddenHeader: true},
        component: () => import('@/views/signup'),
        redirect: '/signup/login',
        children: signup
    },
    {
        path: '/userAgreement',
        meta: { title: 'weblog - 用户协议'},
        component: () => import('@/views/UserAgreement'),
    },
    {
        path: '/editor/:id',
        name: 'editor',
        meta: { title: 'weblog - 创作文章', hiddenHeader: true},
        component: () => import('@/views/Editor'),
    },
    {
        path: '/creator',
        meta: { title: 'weblog - 创作者中心'},
        component: () => import('@/views/Creator'),
        redirect: '/creator/content',
        // children: creator
    },
    {
        path: '/search',
        meta: { title: 'weblog - 搜索'},
        component: () => import('@/views/Search'),
    },
    {
        path: '/post/:id',
        name: 'post',
        meta: { title: 'weblog'},
        component: () => import('@/views/Post'),
    },
    {
        path: '/user',
        name: 'user',
        meta: { title: 'weblog - 个人中心', hiddenHeader: true},
        component: () => import('@/views/User'),
        children: user
    },
]