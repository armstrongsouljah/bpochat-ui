/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import {shallowMount, createLocalVue} from '@vue/test-utils'
import Vuex from 'vuex'
import SignupPage from '../../src/components/SignupComponent.vue'

let localVue = createLocalVue()
localVue.use(Vuex)

const userData = {
    user: {
        username: 'soultech25',
        email: 'soultech25@gmail.com',
        password: '#Pho3nix9q'
    }
}

describe('SignupPage', () => {
    let wrapper, getters, actions, state, mutations
    beforeEach(() => {
        actions = {
            registerUser : jest.fn(),
        },
        getters = {
            GET_ERRORS: jest.fn(),
            GET_SIGNUP_STARTED: jest.fn(),
            GET_SIGNUP_FINISHED:jest.fn(),
            GET_SUCCESS_MESSAGE: jest.fn(),
        }
        mutations = {
            SET_SIGNUP_START: jest.fn()
        }
        const store = new Vuex.Store({state, getters, actions})
    })
    it('should register a user on signup', () => {
        const store = new Vuex.Store({state, getters, actions, mutations})
        wrapper = shallowMount(SignupPage, {store, localVue })
        wrapper.vm.handleSignup(userData)
        expect(actions.registerUser).toBeCalled()
    })
})