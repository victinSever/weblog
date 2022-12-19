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
        async selectBlogListByUserIdCategoryId(context, payload) {
            return await fetch('/blog/selectBlogListByUserIdCategoryId', 'get', payload)
        },
        
    }
}