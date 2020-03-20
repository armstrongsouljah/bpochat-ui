import axios from 'axios'
import helpers from '../../utils/helperFunctions'
export default {
    state:{
        users:[],
        messages: [],
        isLoading: false
    },
    getters: {
        GET_USERS (state){
        return state.users
        },
        GET_IS_LOADING(state){
            return state.isLoading
        }
    },
    mutations: {
        SET_USER_LIST(state, payload){
            state.users = payload
        },
        SET_IS_LOADING(state, payload){
            state.isLoading = payload
        }
    },
    actions: {
        async fetchUsers({commit}){
          commit('SET_IS_LOADING', true)
          await axios.get(`${helpers.baseUrl}/auth/users`, helpers.config())
                .then(response => {
                    if(response.data){
                        commit('SET_USER_LIST', response.data)
                        commit('SET_IS_LOADING', false)
                    }
                    
                })
                .catch(error => console.log(error.response.data))
        }
    }
}