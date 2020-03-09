// import AxiosCalls from '../../utils/AxiosCalls'
import axios from 'axios';
const baseUrl = 'https://bpochat-api.herokuapp.com'

export default {
    state: {
        signupStarted: false,
        signupEnded: false,
        errors: null,
        successResponse: null,
        sucessMessage: null
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
            await axios.post(`${baseUrl}/auth/signup`, userData).then(response => {
    
                commit('SET_SIGNUP_START', false)
                commit('SET_SIGNUP_END', true)
                commit('SET_SIGNUP_SUCCESS_RESPONSE', response.data.user)
                commit('SET_SUCCESS_MESSAGE', 'Account successfully created')
            }).catch(error => {
                commit('SET_ERROR_MESSAGES', error.response.data.user)
                commit('SET_SIGNUP_START', false)
                commit('SET_SIGNUP_END', true)
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
        }
    }
}