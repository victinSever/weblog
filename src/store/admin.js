import fetch from '@/api/fetch'

export default {
    namespaced: true,//开启命名空间
    actions: {
        // 获取待审核博文
        async getAuditBlogs(context, payload) {
            return await fetch('/admin/getAuditBlogs', 'get', payload)
        },
        //获取已经审核记录
        async getHaveAuditedBlogs(context, payload) {
            return await fetch('/admin/getHaveAuditedBlogs', 'get', payload)
        },
        //审核
        async auditBlog(context, payload) {
            return await fetch('/admin/auditBlog', 'post', payload)
        },
        //获取用户列表
        async getAllUser(context, payload) {
            return await fetch('/admin/getAllUser', 'get', payload)
        },
    }
}