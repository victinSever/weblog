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
        meta: { title: '内容管理' },
        component: () => import('@/views/User/content'),
        redirect: 'content/essays',
        children
    },
    {
        path: 'active',
        name: 'active',
        meta: { title: '动态管理' },
        component: () => import('@/views/User/active')
    },
    {
        path: 'column',
        name: 'column',
        meta: { title: '专栏管理' },
        component: () => import('@/views/User/column')
    },
    {
        path: 'data',
        name: 'data',
        meta: { title: '博客数据' },
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
    {
        path: 'cate',
        name: 'cate',
        meta: { title: '分类' },
        component: () => import('@/views/User/cate')
    },
    {
        path: 'tag',
        name: 'tag',
        meta: { title: '标签' },
        component: () => import('@/views/User/tag')
    },
]