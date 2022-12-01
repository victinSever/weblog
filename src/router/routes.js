/**
 * 一级路由
 */

//引入二级路由
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
        meta: { title: '用户登录', hiddenHeader: true},
        component: () => import('@/views/signup'),
        redirect: '/signup/login',
        children: signup
    },
    {
        path: '/userAgreement',
        meta: { title: '用户协议'},
        component: () => import('@/views/UserAgreement'),
    },
    {
        path: '/editor/:id',
        name: 'editor',
        meta: { title: '创作文章', hiddenHeader: true},
        component: () => import('@/views/Editor'),
    },
    {
        path: '/creator',
        meta: { title: '创作者中心'},
        component: () => import('@/views/Creator'),
    },
    {
        path: '/search',
        meta: { title: '搜索'},
        component: () => import('@/views/Search'),
    },
    {
        path: '/post/:id',
        name: 'post',
        meta: { title: '文章详情'},
        component: () => import('@/views/Post'),
    },
    {
        path: '/user',
        name: 'user',
        meta: { title: '个人中心', hiddenHeader: true},
        component: () => import('@/views/User'),
        children: user
    },
]