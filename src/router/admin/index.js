export default [
    {
        path: 'welcome',
        name: 'welcome',
        meta: { title: '管理员 - 主页'},
        component: () => import('@/views/Admin/welcome'),
    },
    {
        path: 'check',
        name: 'check',
        meta: { title: '管理员 - 审核'},
        component: () => import('@/views/Admin/check'),
    },
]