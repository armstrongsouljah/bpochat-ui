<template>
    <div class="row">
       <!-- tab content -->
       <div  id="signupform" class="col s12">
            <form method="POST" @submit.prevent="handleSignup">
            <div class="col s12 input-field">
                <label for="password">Username</label>
               <input id="username" type="text" class="validate" v-model="username"/>
               <span class="red-text" v-if="usernameError">{{usernameError}}</span>
            </div>
            <div class="col s12 input-field">
                <label for="email">Email</label>
               <input id="email" type="email" class="validate" v-model="email"/>
               <span class="red-text" v-if="emailError">{{emailError}}</span>
            </div>
            <div class="col s12 input-field">
                <label for="password">Password</label>
                <input id="password" type="password" v-model="password">
                <span class="red-text" v-if="userPasswordError">{{userPasswordError}}</span>
            </div>
            <div class="col s12 input-field">
               <input  type="submit" value="Signup" class="btn btn-waves blue darken-2 btn-small"> <Loader :isLoading="signingUpStarted"/>
            </div>
            <span v-if="success" class="green-text right">{{success}}</span>
            <span v-if="networkError" class="red-text">{{networkError}}</span>
        </form>
       </div>
    </div>
</template>
<script>
/* eslint-disable no-unused-vars */
import { mapActions, mapGetters } from 'vuex';
import {required} from 'vuelidate';
import Loader from '../layout/Spinner'
export default {
    data(){
        return {
            username: '',
            email: '',
            password: '',
            emailError: '',
            usernameError: '',
            userPasswordError: ''
        }
    },
    components:{
        Loader,
    },
    validations:{
       username: {required},
       email: {required},
       password: {required}
    },
    methods:{
        ...mapActions(['registerUser']),
        handleSignup(){
            const userData = {
                    user:{
                        username:this.username,
                        password: this.password,
                        email: this.email
                    }
                }
            JSON.stringify(userData)
            this.$store.commit('SET_SIGNUP_START', true)
            this.registerUser(userData)
        }
    },
   computed: {
       ...mapGetters(['GET_ERRORS', 
                     'GET_SIGNUP_STARTED', 
                     'GET_SIGNUP_FINISHED', 
                     'GET_SUCCESS_MESSAGE',
                     'GET_SIGNUP_NETWORK_ERROR']), 
       errors(){
           return this.GET_ERRORS
       },
       signingUpStarted () {
           return this.GET_SIGNUP_STARTED
       },signupFinished() {
           return this.GET_SIGNUP_FINISHED
       },
       success (){
           return this.GET_SUCCESS_MESSAGE
       },
       networkError() {
           return this.GET_SIGNUP_NETWORK_ERROR
       }
   },watch:{
       GET_ERRORS(newVal, oldVal) {
           if(newVal.username) this.usernameError = newVal.username[0]
           if(newVal.email) this.emailError = newVal.email[0]
           if(newVal.password) this.userPasswordError = newVal.password[0]
           setTimeout(()=> {
               this.usernameError = '',
               this.emailError = ''
               this.userPasswordError = ''

           }, 5000)
       },
       GET_SIGNUP_STARTED(newVal, oldVal){
           console.log('signing up', newVal)
       },
       GET_SIGNUP_FINISHED(newVal, oldVal){
           console.log(' finished signing up', newVal)
       },
       GET_SUCCESS_MESSAGE (newVal, oldVal){
           this.username = ''
           this.password = ''
           this.email = ''
           setTimeout(()=> {
               this.$store.commit('SET_SUCCESS_MESSAGE', null)

           }, 5000)
       },
       GET_SIGNUP_NETWORK_ERROR(newVal, oldVal) {
           setTimeout(()=> {
               this.$store.commit('SET_NETWORK_CONNECTION_ERROR', null)

           }, 4000)
       }
   }
}
</script>