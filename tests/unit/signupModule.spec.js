/* eslint-disable no-unused-vars */
import signupModule from '../../src/store/modules/signUpModule'
import AxiosMockAdapter from 'axios-mock-adapter'
import axios  from 'axios'

const mock = new AxiosMockAdapter(axios)

const mockState = {
    signupStarted: false,
    signupEnded: false,
    errors: null,
    successResponse: null,
    sucessMessage: null
}
const resp = {
    user: {
        email: 'hehe@ee.coco',
        username: 'usdusd',
        token: 'nndndnndndnnndnndn'
    }
}
const commit = jest.fn()

describe('Mutattions', () => {
    it('registers a user', () => {
       const userData = {
           user: {
               username: 'soultech25',
               email: 'soultech25@gmail.com',
               password: '#Pho3nix9q'
           }
       }
       mock.onPost('https://bpochat-api.herokuapp.com/auth/signup').reply(201, resp)
       signupModule.actions.registerUser({commit}, userData)
             .then(() => {
                 expect(commit).toHaveBeenCalled()
             })
    })
})