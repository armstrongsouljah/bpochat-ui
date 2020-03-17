import axios from 'axios'
import helpers from '../../utils/helperFunctions'


export default {
    state: {
        messageSendingError: null,
        messageSuccess: false,
        sender: null,
        receipient: null
    },
    getters: {
        GET_MESSAGING_ERROR(state){
          return state.messageSendingError
        },
        GET_MESSAGE_SEND_SUCCESS(state){
           return state.messageSuccess
        }
    },
    mutations: {
        SET_SEND_MESSAGE_SUCCESS(state, payload){
            state.messageSuccess = payload
        },
        SET_SEND_MESSAGE_ERROR(state, payload){
            state.messageSendingError = payload
        },
        SET_RECEIPIENT_NAME(state, payload){
            state.receipient = payload
        }
    }, 
    actions: {
        async sendMessage({state}, messageData){
            if(helpers.validateToken()) await axios.post(`${helpers.baseUrl}/messages/${state.receipient}`, 
                messageData,
                helpers.config()
                ).then(response => console.log(response.data))
                .catch(error => console.log(error.response.data))
            
            
        },
        setSelectedUser({commit}, user) {
            commit('SET_RECEIPIENT_NAME', user)
        }
    }
}