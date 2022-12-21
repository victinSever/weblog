/**
 * 一级路由
 */

//引入二级路由
import user from './user'
import signup from './signup'
import admin from './admin'

export default [
    {
        path: '/',
        meta: { title: '博客大厅'},
        name: 'passage',
        component: () => import('@/views/Passage'),
    },
    {
        path: '/admin',
        meta: { title: '管理员模块'},
        name: 'admin',
        component: () => import('@/views/Admin'),
        redirect: '/admin/welcome',
        children: admin
    },
    {
        path: '/signup',
        meta: { title: '用户登录'},
        component: () => import('@/views/signup'),
        redirect: '/signup/login',
        children: signup
    },
    {
        path: '/editor/:blogId',
        name: 'editor',
        meta: { title: '创作文章'},
        component: () => import('@/views/Editor'),
    },
    {
        path: '/search',
        meta: { title: '搜索'},
        component: () => import('@/views/Search'),
    },
    {
        path: '/post/:blogId',
        name: 'post',
        meta: { title: '文章详情'},
        component: () => import('@/views/Post'),
    },
    {
        path: '/user',
        name: 'user',
        meta: { title: '个人中心'},
        component: () => import('@/views/User'),
        children: user
    },
]