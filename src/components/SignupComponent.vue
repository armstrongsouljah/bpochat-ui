<template>
    <div class="row">
        <div class="col s12">
            <ul class="tabs">
                <li class="tab col s6"><a class="active" href="#signupform">Signup</a></li>
                <li class="tab col s6"><a  href="#loginform">Login</a></li>
            </ul>
        </div>
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
               <input  type="submit" value="Signup" class="btn btn-waves btn-small"> <span v-if="signingUpStarted &&! signupFinished" class="fa-1x"><i class="fas fa-spinner fa-spin"></i></span>
            </div>
            <span v-if="success" class="green-text right">{{success}}</span>
        </form>
       </div>
       <div class="col s12" id="loginform">
           Login to be implemented here.
       </div>
    </div>
</template>
<script>
/* eslint-disable no-unused-vars */
import { mapActions, mapGetters } from 'vuex';
import {required} from 'vuelidate';
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
                     'GET_SUCCESS_MESSAGE']), 
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

           }, 2000)
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

           }, 2000)
       }
   }
}
</script>