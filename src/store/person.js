import fetch from '@/api/fetch'

export default {
    namespaced: true,//开启命名空间
    actions: {
        //查询自己的博文（分页查询，按时间降序）
        async selectOwnBlog(context, payload) {
            return await fetch('/blog/selectOwnBlog', 'get', payload)
        },
        // 专栏
        async selectColumnByUserId(context, payload) {
            return await fetch('/blog/selectColumnByUserId', 'get', payload)
        },
        // 根据专栏查询博文
        async selectBlogListByColumnId(context, payload) {
            return await fetch('/blog/selectBlogListByColumnId', 'get', payload)
        },     
        // 新建专栏
        async insertColumn(context, payload) {
            return await fetch('/blog/insertColumn', 'post', payload)
        },
        // 新建标签
        async insertTag(context, payload) {
            return await fetch('/blog/insertTag', 'post', payload)
        },

        // 查询自己的审核通过的博文（分页查询，按时间降序
        async selectOwnBlog(context, payload) {
            return await fetch('/blog/selectOwnBlog', 'get', payload)
        },
        //查看自己的审核不通过的博文（分页查询，按时间降序）
        async selectOwnFailBlog(context, payload) {
            return await fetch('/blog/selectOwnFailBlog', 'get', payload)
        },
        //查看自己的草稿博文（分页查询，按时间降序）
        async selectOwnDraftFailBlog(context, payload) {
            return await fetch('/blog/selectOwnDraftFailBlog', 'get', payload)
        },
        //查看自己的待审核的博文（分页查询，按时间降序）
        async selectOwnNotAuditFailBlog(context, payload) {
            return await fetch('/blog/selectOwnNotAuditFailBlog', 'get', payload)
        },

        
    }
}