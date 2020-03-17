<template>
    <div class="row">
       <div class="col s3">
           <ul class="collection" v-for="user in users" :key="user.username">
               <li @click.prevent="selectUser(user)" class="collection-item">
                   <a @click.prevent="selectUser(user)" href="#">{{user.username}}</a>
               </li>
           </ul>
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
import {mapActions, mapGetters} from 'vuex'
import ChatForm from './SendChatCompoment'
import helpers from '../utils/helperFunctions'
export default {
    name: 'InboxPage',
    data(){
        return {
          selectedUser: null
        }
    },
    components: {
       ChatForm,
    },
    computed:{
      ...mapGetters(['GET_USERS']),
      users(){
        return this.GET_USERS
      }
    },
    methods:{
        ...mapActions(['setSelectedUser',]),
      selectUser(user){
          this.selectedUser = user.username
          this.setSelectedUser(user.username)
      }
    },
    created(){
      const token = localStorage.getItem('token');
      if(!token|| !helpers.validateToken()) this.$router.push('/')
      
    }
}
</script>