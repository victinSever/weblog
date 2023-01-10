import axios from 'axios'
import {baseUrl, adminUrl} from './base'

import nprogress from 'nprogress'

// axios前置拦截
axios.interceptors.request.use(request => {
    // 加载进度条
    nprogress.start()
    request.headers.Authorization = window.sessionStorage.getItem('token')
    //为请求对象添加token验证的Authorization
    return request
})

// axios后置拦截
axios.interceptors.response.use(response => {
    // 结束进度条
    nprogress.done()
    return response
})

/**
 * 接口要求，params，data
 */
export default async (
    url = '', 
    type = 'GET', 
    params = {}, 
    data = {},
    header = {}, 
    ) => {

    url = (url.includes('admin') ? adminUrl : baseUrl) + url


    type = type.toUpperCase()

    return await axios({
        method: type, url, params, data, header
    })   
}