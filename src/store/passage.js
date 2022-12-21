/**
 * 文章相关参数
 */
import fetch from '@/api/fetch'

export default {
    namespaced: true,//开启命名空间
    actions: {
        // 获取推荐文章列表
        async getPassageList(context, payload) {
            return await fetch('/public/selectAdviceBlog', 'get', payload)
        },
        // 获取最新文章列表
        async getPassageLatestList(context, payload) {
            return await fetch('/public/selectLatestBlog', 'get', payload)
        },
        // 获取最热文章列表
        async getPassageHotList(context, payload) {
            return await fetch('/public/selectHotBlog', 'get', payload)
        },      
        // 首页 分类博文
        async selectBlogListByCategoryId(context, payload) {
            return await fetch('/public/selectBlogListByCategoryId', 'get', payload)
        },

        // 根据id获取文章信息
        async getPassageInfo(context, payload) {
            return await fetch('/blog/selectOneBlog', 'get', payload)
        },
        // 发布评论
        async publishComment(context, payload) {
            return await fetch('/comment/publishComment', 'post', payload)
        },
        // 回复评论
        async publishReply(context, payload) {
            return await fetch('/comment/publishReply', 'post', payload)
        },
        //查询评论列表
        async getCommentList(context, payload) {
            return await fetch('/comment/selectCommentListByBlogId', 'get', payload)
        },
        //查询回复列表
        async getReplyList(context, payload) {
            return await fetch('/comment/selectReplyListByCommentId', 'get', payload)
        },

        //点赞评论   
        async likeComment(context, payload) {
            return await fetch('/comment/likeComment', 'post', payload)
        },
        // (取消）点赞博文
        async likeBlog(context, payload) {
            return await fetch('/blog/likeBlog', 'post', payload)
        },
        //(取消）点赞回复
        async likeReply(context, payload) {
            return await fetch('/comment/likeReply', 'post', payload)
        },

        /**
         * 查询
         */
        //综合排序 搜索 博文
         async searchAdviceBlog(context, payload) {
            return await fetch('/public/searchAdviceBlog', 'get', payload)
        },
        async searchHotBlog(context, payload) {
            return await fetch('/public/searchHotBlog', 'get', payload)
        },
        async searchLatestBlog(context, payload) {
            return await fetch('/public/searchLatestBlog', 'get', payload)
        },


        //发表博文
        async publishBlog(context, payload) {
            return await fetch('/blog/publishBlog', 'post', {}, payload)
        },
        //修改博文
        async updateBlogByBlogId(context, payload) {
            return await fetch('/blog/updateBlogByBlogId', 'post', {}, payload)
        },
        //删除博文
        async deleteBlogByBlogId(context, payload) {
            return await fetch('/blog/deleteBlogByBlogId', 'delete', payload)
        },
        //分类博文
        async selectBlogListByUserIdCategoryId(context, payload) {
            return await fetch('/blog/selectBlogListByUserIdCategoryId', 'get', payload)
        },


        //博文增加浏览量
        async blogReadAmountAddOne(context, payload) {
            return await fetch('/blog/blogReadAmountAddOne', 'put', payload)
        },
        
    }
}