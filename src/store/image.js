import fetch from '@/api/fetch'

export default {
    namespaced: true,//开启命名空间
    state: {
        image: {},
    },
    mutations: {
    },
    actions: {
        // 获取图片链接
        async getImageUrl(context, payload) {
            return await fetch('/imageSever/upload', 'post', payload, { 
                "Content-Type": "multipart/form-data" 
            })
        },
    }
}