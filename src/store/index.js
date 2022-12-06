import Vue from 'vue'
import Vuex from 'vuex'

import user from './user.js'
import image from './image.js'
import config from './config.js'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        user,
        image,
        config
    }
})

export default store