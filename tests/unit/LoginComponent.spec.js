/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import {shallowMount, createLocalVue} from '@vue/test-utils'
import Vuex from 'vuex'
import LoginForm from '../../src/components/LoginComponent.vue'

let localVue = createLocalVue()
localVue.use(Vuex)

const userData = {
    user: {
        email: 'soultech25@gmail.com',
        password: '#Pho3nix9q'
    }
}

describe('loginPage', () => {
    let wrapper, getters, actions, state, mutations
    beforeEach(() => {
        actions = {
            loginUser : jest.fn(),
        },
        getters = {
            GET_LOGIN_ERRORS: jest.fn(),
            GET_LOGIN_STARTED: jest.fn(),
            GET_FINISHED_FINISHED:jest.fn(),
            GET_LOGIN_SUCCESS_MESSAGE: jest.fn(),
            GET_LOGIN_NETWORK_ERROR: jest.fn()
        }
        mutations = {
            SET_LOGIN_START: jest.fn()
        }
        const store = new Vuex.Store({state, getters, actions})
    })
    it('should login a user on submit', () => {
        const store = new Vuex.Store({state, getters, actions, mutations})
        wrapper = shallowMount(LoginForm, {store, localVue })
        wrapper.vm.handleloginUser(userData)
        expect(actions.loginUser).toBeCalled()
    })
})