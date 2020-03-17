
<template>
    <div class="row">
       <div class="col s3">
           <Loader v-show="isPageLoading"/>
           <div  v-if="!isPageLoading">
                <ul class="collection" v-for="user in users" :key="user.username">
                    <li @click.prevent="selectUser(user)" class="collection-item">
                        <a @click.prevent="selectUser(user)" href="#">{{user.username}}</a>
                    </li>
                </ul>
           </div>
       </div>
       <div class="col s9">
           <div class="center" slot="selectedUser">
                <nav v-if="selectedUser" class="light-blue">{{selectedUser}}</nav>
           </div>
           <div v-if="selectedUser">
               <p>Messages to be displayed here</p>
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
      ...mapGetters(['GET_USERS', 'GET_IS_LOADING']),
      users(){
        return this.GET_USERS
      },
      isPageLoading(){
          return this.GET_IS_LOADING
      }
    },
    methods:{
        ...mapActions(['setSelectedUser',
                       'fetchUsers']),
      selectUser(user){
          this.selectedUser = user.username
          this.setSelectedUser(user.username)
      }
    },
    created(){
      const token = localStorage.getItem('token');
      if(!token|| !helpers.validateToken()) this.$router.push('/')
      this.fetchUsers()
      
    },
    watch: {
        GET_IS_LOADING(newVal, oldVal){
            console.log('is loading', newVal)
        }
    }
}
</script>