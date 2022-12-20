import fetch from '@/api/fetch'

export default {
    namespaced:true,//开启命名空间
    state: {
        userInfo: JSON.parse(localStorage.getItem('userInfo')) || {},
        token: localStorage.getItem('token') || ''
    },
    mutations: {
        // 更新token表示是否登录
        UpdateToken(state, payload) {
            state.token = payload
            localStorage.setItem('token', payload)
        },
        // 更新用户信息
        UpdateUserInfo(state, payload) {  
            state.userInfo = payload 
            localStorage.setItem('userInfo', JSON.stringify(payload))
        },
        // 退出登录
        SignOut(state) {
            state.userInfo = {} 
            state.token = '' 
            localStorage.removeItem('token')
            localStorage.removeItem('userInfo')
        }
    },
    actions: {
        // 账密登录
        async getLoginByPass(context, payload) {
            return await fetch('/user/login', 'post', payload)
        },

        // 个人修改
        async updateUserInfo(context, payload) {
            return await fetch('/user/updateUserInfo', 'put', payload)
        },
        // 获取用户信息
        async getUserInfo(context, payload) {
            return await fetch('/user/getUserInfo', 'get', payload)
        },
        //修改密码
        async updatePassword(context, payload) {
            return await fetch('/user/updatePassword', 'put', payload)
        },
        
    }
}