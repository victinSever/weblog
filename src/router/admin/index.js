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
    {
        path: 'check-list',
        name: 'check-list',
        meta: { title: '管理员 - 审核记录'},
        component: () => import('@/views/Admin/checkList'),
    },
    {
        path: 'user-list',
        name: 'user-list',
        meta: { title: '管理员 - 用户信息'},
        component: () => import('@/views/Admin/userList'),
    },
]