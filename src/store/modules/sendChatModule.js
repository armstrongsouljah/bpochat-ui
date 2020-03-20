/* eslint-disable no-unused-vars */
import axios from 'axios'
import helpers from '../../utils/helperFunctions'
import jwtDecode from 'jwt-decode'

const token = localStorage.getItem('token')


export default {
    state: {
        messageSendingError: null,
        messageSuccess: false,
        sender: null,
        receipient: null,
        messages: []
    },
    getters: {
        GET_MESSAGING_ERROR(state){
          return state.messageSendingError
        },
        GET_MESSAGE_SEND_SUCCESS(state){
           return state.messageSuccess
        },
        GET_MESSAGE_THREAD(state){
            return state.messages
        },
        GET_SELECTED_USER(state){
            return state.receipient
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
        },
        SET_MESSAGES(state, payload){
            state.messages = payload
        }
    }, 
    actions: {
        // eslint-disable-next-line no-unused-vars
        async sendMessage( {state, commit}, messageData){
            const username = helpers.getUsername()
            messageData.sender = username
            messageData.receiver = state.receipient
            let socketUrl = ''
            if(window.location.host =="https://bpochat-ui.herokuapp.com") socketUrl =`wss://bpochat-ui.herokuapp.com`
            socketUrl = socketUrl =`ws://localhost:8000`
            const ws = new WebSocket(`${socketUrl}/messages/${state.receipient}/send`)
            ws.onopen = () => {
                const json_data = JSON.stringify(messageData)
                ws.send(json_data)
            }
            ws.onmessage = (event) => {
                // console.log(event)
                const cleanData = JSON.parse(event.data)
                console.log('FROM server ',cleanData)
               state.messages.push(cleanData)
            }
            ws.onerror = (err) => console.log('error happened', err) 
        },
        setSelectedUser({state, commit}, user) {
            commit('SET_RECEIPIENT_NAME', user)
        },
       async fetchSelectedUserMessages({commit, state}){
         await axios.get(`${helpers.getSerVerBase()}/messages/${state.receipient}/send`, helpers.config())
               .then(response => {
                   console.log(response)
                   let arr = Array.from(response.data)
                   commit('SET_MESSAGES', arr)
                })
               .catch(err => console.log(err))
        }
    }
}