const children = [
    {
        path: 'drafts',
        name: 'drafts',
        component: () => import('@/views/User/content/drafts'),
    },
    {
        path: 'essays',
        name: 'essays',
        component: () => import('@/views/User/content/essays'),
    }
]

export default [
    {
        path: 'content',
        name: 'content',
        component: () => import('@/views/User/content'),
        redirect: 'content/essays',
        children
    },
    {
        path: 'active',
        name: 'active',
        component: () => import('@/views/User/active')
    },
    {
        path: 'column',
        name: 'column',
        component: () => import('@/views/User/column')
    },
    {
        path: 'data',
        name: 'data',
        component: () => import('@/views/User/data')
    },
    {
        path: 'setting',
        name: 'setting',
        meta: { title: '博客个性化配置' },
        component: () => import('@/views/User/setting')
    },
    {
        path: 'change',
        name: 'change',
        meta: { title: '修改信息' },
        component: () => import('@/views/User/change')
    },
]