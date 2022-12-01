export default [
    {
        path: 'login',
        name: 'login',
        meta: { title: '登录'},
        component: () => import('@/views/signup/pages/login.vue'),
    },
    {
        path: 'reback',
        name: 'reback',
        meta: { title: '找回密码'},
        component: () => import('@/views/signup/pages/reback.vue'),
    },
    {
        path: 'register',
        name: 'register',
        meta: { title: '注册'},
        component: () => import('@/views/signup/pages/register.vue'),
    },
]