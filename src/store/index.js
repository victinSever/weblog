import Vue from 'vue'
import Vuex from 'vuex'

import user from './user.js'
import image from './image.js'
import config from './config.js'
import passage from './passage.js'
import person from './person.js'
import admin from './admin.js'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        user,
        image,
        passage,
        config,
        person,
        admin
    }
})

export default store