/**
 * 个性化配置参数
 */

export default {
    namespaced: true,//开启命名空间
    state: {
        grayscale: false
    },
    mutations: {
        UpdateGrayScale(state, payload) {
            state.grayscale = payload
            sessionStorage.setItem('config', JSON.stringify(state))
        },
        UpdateConfig(state, payload) {
            state = payload
            console.log(payload);
            sessionStorage.setItem('config', JSON.stringify(state))
        }
    },
    actions: {
        // 获取个性化配置信息
        async getConfig(context, payload) {
            const config = {
                grayscale: false, //灰度
                theme: "", //主题：目前默认有四种
                menu_pos: "0", //个人信息显示位置：0,1
                swiperList: [], //轮播图列表
                userImageAnimation: true, //头像动画
                waveAnimation: true, //波浪动画
            }
            // 模拟的数据
            context.commit('UpdateConfig', config)
        },
    }
}