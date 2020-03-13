<template>
    <div class="row">
       <!-- tab content -->
       <div  id="loginform" class="col s12">
            <form method="POST" @submit.prevent="handleloginUser">
            <div class="col s12 input-field">
                <label for="loginEmail">Email</label>
               <input id="loginEmail" type="email" class="validate" v-model="email"/>
               <span v-if="emailError" class="red-text">{{emailError}}</span>
            </div>
            <div class="col s12 input-field">
                <label for="loginPassword">Password</label>
                <input id="loginPassword" type="password" v-model="password">
                <span v-if="passwordError" class="red-text">{{passwordError}}</span>
            </div>
            <div class="col s12 input-field">
               <input  type="submit" value="Login" class="btn btn-waves green darken-2 btn-small"><Loader :isLoading="isLoggingIn"/>
               <span v-if="successMessage" class="green-text ">{{successMessage}}</span>
               <span v-if="invalidLoginMessage" class="red-text ">{{invalidLoginMessage}}</span>
            </div>
        </form>
       </div>
    </div>
</template>
<script>
/* eslint-disable no-unused-vars */
import { mapActions, mapGetters } from 'vuex';
import {required} from 'vuelidate';
import Loader from '../layout/Spinner';

export default {
    data(){
        return {
            email: '',
            password:'',
            emailError: '',
            passwordError:'',
            invalidLoginMessage: ''
        }
    },
    components:{
       Loader
    },
    methods:{
        ...mapActions(['loginUser',  ]),
        handleloginUser(){
           const userData ={
               user: {
                   email:this.email,
                   password: this.password
               }
           }
           this.loginUser(userData)
        }
    },
   computed: {
       ...mapGetters(['GET_LOGIN_ERRORS', 
                      'GET_LOGIN_STARTED',
                      'GET_LOGIN_NETWORK_ERROR',
                      'GET_LOGIN_SUCCESS_MESSAGE',
                      'GET_INVALID_MESSAGE']),
        isLoggingIn(){
            return this.GET_LOGIN_STARTED
        },
        successMessage() {
            return this.GET_LOGIN_SUCCESS_MESSAGE
        },
   },
   watch:{
       GET_LOGIN_STARTED(newVal, oldVal){
           console.log('logging in', newVal)
       },
       GET_LOGIN_SUCCESS_MESSAGE(newVal, oldVal){
           this.email = ''
           this.password = ''
           setTimeout(() => {
               this.$store.commit('SET_LOGIN_SUCCESS_MESSAGE', null)
               this.$router.push('/inbox')
           }, 5000)
       },
       GET_LOGIN_ERRORS(newVal, oldVal){
          if(newVal.email) this.emailError = newVal.email[0]
          if(newVal.password) this.passwordError = newVal.password[0]
          if(newVal.non_field_errors) {
              this.invalidLoginMessage = newVal.non_field_errors[0]
              setTimeout(()=> {
                  this.invalidLoginMessage = ''
              },5000)
              }
       }
   }
}
</script>