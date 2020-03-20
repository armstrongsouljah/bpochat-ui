// import AxiosCalls from '../../utils/AxiosCalls'
import axios from 'axios';
import helpers from '../../utils/helperFunctions'

export default {
    state: {
        signupStarted: false,
        signupEnded: false,
        errors: null,
        successResponse: null,
        sucessMessage: null,
        networkError: null
    },
    getters:{
        GET_SIGNUP_STARTED (state) {
            return state.signupStarted
        },
        GET_SIGNUP_FINISHED(state) {
            return state.signupEnded
        },
        GET_ERRORS(state){
            return state.errors
        },
        GET_SUCCESS_RESPONSE(state){
            return state.successResponse
        },
        GET_SUCCESS_MESSAGE(state){
            return state.sucessMessage
        },
        GET_SIGNUP_NETWORK_ERROR(state){
            return state.networkError
        }
    },
    actions: {
        BEGIN_SIGNUP({commit, state}) {
            commit('SET_SIGNUP_START', true)
            console.log('signup started', state.signupStarted)
        },
        END_SIGNUP({commit}){
            commit('SET_SIGNUP_END', false)
        },
        async registerUser({commit}, userData){
           commit('SET_SIGNUP_START', true)
            await axios.post(`${helpers.getSerVerBase()}/auth/signup`, userData).then(response => {
                if(response.data){
                    commit('SET_SIGNUP_START', false)
                    commit('SET_SIGNUP_END', true)
                    commit('SET_SIGNUP_SUCCESS_RESPONSE', response.data.user)
                    commit('SET_SUCCESS_MESSAGE', 'Account successfully created')
                }
            }).catch(error => {
                if(error.response){ //server errors
                    commit('SET_ERROR_MESSAGES', error.response.data.user)
                    commit('SET_SIGNUP_START', false)
                    commit('SET_SIGNUP_END', true)
                }
                
                if(error.request &&! error.response.data){ // check for internet connection
                    commit('SET_SIGNUP_START', false)
                    commit('SET_SIGNUP_END', true)
                    commit('SET_NETWORK_CONNECTION_ERROR', 'There was a problem with your internet connection')
                }
            })
            
            
        }
    },
    mutations: {
        SET_ERROR_MESSAGES(state, payload){
            state.errors = payload
        },
        SET_SUCCESS_MESSAGE(state, payload){
            state.sucessMessage = payload

        },
        SET_SIGNUP_START(state, payload){
            state.signupStarted = payload
        },
        SET_SIGNUP_END(state, payload){
            state.signupEnded = payload
        },
        SET_SIGNUP_SUCCESS_RESPONSE(state, payload) {
            state.successResponse = payload
        },
        SET_NETWORK_CONNECTION_ERROR(state, payload){
            state.networkError = payload
        }
    }
}