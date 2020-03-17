export default {
    state:{
        users: [
            {username: 'armstrong1'},
            {username: 'armstrong2'},
            {username: 'armstrong4'}
        ],
        messages: []
    },
    getters: {
        GET_USERS (state){
        return state.users
        }
    },
    mutations: {},
    actions: {}
}