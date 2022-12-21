/**
 * 个性化配置参数
 */
 import fetch from '@/api/fetch'

export default {
    namespaced: true,//开启命名空间
    state: {
        config: JSON.parse(sessionStorage.getItem('config'))
    },
    mutations: {
        UpdateConfig(state, payload) {
            state.config = payload
            sessionStorage.setItem('config', JSON.stringify(payload))
        }
    },
    actions: {
        // 获取个性化配置信息并更新
        async getConfig(context, payload) {
            const {data: res} = await fetch('/user/getTheme', 'get', {userId: payload})
            context.commit('UpdateConfig', res.data)
        },
        //修改自定义设计
        async setUserTheme(context, payload) {
            return await fetch('/user/setUserTheme', 'put', {}, payload)
        },
    },
}