import axios from 'axios'
import helpers from '../../utils/helperFunctions'

export default {
    state:{
        token: '',
        errors: null,
        loginStarted: false,
        loginFinished: false,
        networkError: null,
        successMessage: null,
        invalidMessage: null,
    },
    getters:{
        GET_TOKEN(state) {
            return state.token
        },
        GET_LOGIN_ERRORS(state) {
            return state.errors
        },
        GET_LOGIN_STARTED(state){
            return state.loginStarted
        },
        GET_LOGIN_FINISHED(state){
            return state.loginFinished
        },
        GET_LOGIN_NETWORK_ERROR(state) {
            return state.networkError
        },
        GET_LOGIN_SUCCESS_MESSAGE(state) {
            return state.successMessage
        },
        GET_INVALID_LOGIN_MESSAGE(state){
            return state.invalidMessage
        }
    },
    mutations:{
      SET_TOKEN(state, payload) {
          state.token = payload
      },
      SET_LOGIN_ERRORS(state, payload){
          state.errors = payload
      },
      SET_LOGIN_START(state, payload){
          state.loginStarted = payload
      },
      SET_LOGIN_STOP(state, payload) {
          state.loginFinished = payload
      },
      SET_LOGIN_NETWORK_ERROR(state, payload){
          state.networkError = payload
      },
      SET_LOGIN_SUCCESS_MESSAGE(state, payload){
          state.successMessage = payload
      },
      SET_LOGIN_INVALID_MESSAGE(state, payload){
         state.invalidMessage = payload
      }

    },
    actions: {
        async loginUser({commit}, userData){
           commit('SET_LOGIN_START', true)
           await axios.post(`${helpers.baseUrl}/auth/login`, userData)
                 .then(response => {
                      if(response.data) {
                          commit('SET_TOKEN', response.data.token)
                          localStorage.setItem('token', response.data.token)
                          commit('SET_LOGIN_START', false)
                          commit('SET_LOGIN_STOP', true)
                          commit('SET_LOGIN_SUCCESS_MESSAGE', 'You have successfully logged in.')
                      }
                 })
                 .catch(error => {
                     if(error.response){
                         commit('SET_LOGIN_STOP', true)
                         commit('SET_LOGIN_START', false)
                         commit('SET_LOGIN_ERRORS', error.response.data)
                     }

                     
                 })
        }
    }
}