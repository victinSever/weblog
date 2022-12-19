import fetch from '@/api/fetch'

export default {
    namespaced: true,//开启命名空间
    actions: {
        // 
        async getCheckList(context, payload) {
            return await fetch('/blog/selectOwnBlog', 'get', payload)
        },
    }
}