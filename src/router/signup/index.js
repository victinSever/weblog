export default [
    {
        path: 'login',
        name: 'login',
        meta: { title: 'CLF - 登录'},
        component: () => import('@/views/signup/pages/login.vue'),
    },
    {
        path: 'reback',
        name: 'reback',
        meta: { title: 'CLF - 找回密码'},
        component: () => import('@/views/signup/pages/reback.vue'),
    },
    {
        path: 'register',
        name: 'register',
        meta: { title: 'CLF - 注册'},
        component: () => import('@/views/signup/pages/register.vue'),
    },
]