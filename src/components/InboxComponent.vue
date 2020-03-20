
<template>
    <div class="row">
       <div class="col s3">
           <Loader v-show="isPageLoading"/>
           <div  v-if="!isPageLoading">
                <ul class="collection" v-for="user in users" :key="user.username">
                    <li class="collection-item">
                        <a @click.prevent="selectUser(user)" href="#">{{user.username}}</a>
                    </li>
                </ul>
           </div>
       </div>
       <div class="col s9">
           <div class="center" slot="selectedUser">
                <nav v-if="selectedUser" class="light-blue">{{selectedUser}}
                    <button @click="logoutUser()" class="btn btn-small right">Logout</button>
                </nav>
           </div>
           <div v-if="selectedUser">
             <div class="col s12 card-panel" v-for="message in messages" :key="message.username">
                 <div class="card-content">
                 <p class="flow-text">{{message.message}}</p>
                 </div>
             </div>
               <ChatForm />
           </div>
       </div>
    </div>
</template>
<script>
/* eslint-disable no-unused-vars */
import {mapActions, mapGetters} from 'vuex'
import ChatForm from './SendChatCompoment'
import helpers from '../utils/helperFunctions'
import Loader from '../layout/Spinner'
export default {
    name: 'InboxPage',
    data(){
        return {
          selectedUser: null
        }
    },
    components: {
       ChatForm,
       Loader,
    },
    computed:{
      ...mapGetters(['GET_USERS', 'GET_IS_LOADING', 'GET_SELECTED_USER', 'GET_MESSAGE_THREAD']),
      users(){
        return this.GET_USERS
      },
      isPageLoading(){
          return this.GET_IS_LOADING
      },
      messages(){
          return this.GET_MESSAGE_THREAD
      }
    },
    methods:{
        ...mapActions(['setSelectedUser',
                       'fetchUsers',
                       'fetchSelectedUserMessages']),
      selectUser(user){
          this.selectedUser = user.username
          this.setSelectedUser(user.username)
      },
      logoutUser(){
          localStorage.clear()
          this.$router.push('/')
      }
    },
    created(){
      const token = localStorage.getItem('token');
      if(token ==null ) this.$router.push('/')
      this.fetchUsers()
      
    },
    watch: {
        GET_IS_LOADING(newVal, oldVal){
            console.log('is loading', newVal)
        },
        GET_SELECTED_USER(newVal, oldVal){
            this.fetchSelectedUserMessages()
        },
        GET_MESSAGE_THREAD(newVal, oldVal){
            
        }
    }
}
</script>