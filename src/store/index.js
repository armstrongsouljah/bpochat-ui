import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import signupModule from './modules/signUpModule'
import loginStoreModule from './modules/loginStoreModule'

export default new Vuex.Store({
    state:{},
    getters:{},
    mutations:{},
    actions:{},
    modules:{
        signupModule,
        loginStoreModule
    }
})