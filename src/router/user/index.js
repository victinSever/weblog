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
]