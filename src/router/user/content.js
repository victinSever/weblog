export default [
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