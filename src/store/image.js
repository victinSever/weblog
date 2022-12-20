import fetch from '@/api/fetch'

export default {
    namespaced: true,//开启命名空间
    actions: {
        // 获取图片链接
        async getImageUrl(context, payload) {
            return await fetch('/user/uploadPicture', 'post',{}, payload, { 
                "Content-Type": "multipart/form-data" 
            })
        },
    }
}