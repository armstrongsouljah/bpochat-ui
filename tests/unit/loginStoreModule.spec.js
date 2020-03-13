/* eslint-disable no-unused-vars */
import AxiosMockAdapter from 'axios-mock-adapter'
import axios  from 'axios'
import loginModule from '../../src/store/modules/loginStoreModule'
const mock = new AxiosMockAdapter(axios)

const mockState = {
    token: '',
        errors: null,
        loginStarted: false,
        loginFinished: false,
        networkError: null,
        successMessage: null,
        invalidMessage: null,
}
const resp = {
       
        token: 'nndndnndndnnndnndn'
}
const commit = jest.fn()

describe('Actions', () => {
    it('logs in a user if valid data is provided', () => {
       const userData = {
           user: {
               email: 'soultech25@gmail.com',
               password: '#Pho3nix9q'
           }
       }
       mock.onPost('https://bpochat-api.herokuapp.com/auth/login').reply(201, resp)
       loginModule.actions.loginUser({commit}, userData)
             .then(() => {
                 expect(commit).toHaveBeenCalled()
             })
    })
})

describe('Mutations', ()=> {
    it('Sets success message', ()=> {
        loginModule.mutations.SET_LOGIN_SUCCESS_MESSAGE(mockState, 'success')
        expect(mockState.successMessage).toBeDefined()
    })
    it(' sets token', ()=> {
        loginModule.mutations.SET_TOKEN(mockState, 'dedededede')
        expect(mockState.token).toEqual('dedededede')
    })
    it(' sets network error', ()=> {
        loginModule.mutations.SET_LOGIN_NETWORK_ERROR(mockState, 'dedededede')
        expect(mockState.networkError).toEqual('dedededede')
    })
})