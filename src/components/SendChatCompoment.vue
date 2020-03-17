<template>
    <div class="row">
        <form class="chat-form" @submit.prevent="handleSendMessage">
            <div class="input-field inline col s12">
                <textarea class="materialize-textarea col s9" v-model="message"></textarea>
                <input class="btn btn-small col s3" type="submit" value="send" />
            </div>
            
        </form>
    </div>
</template>
<script>
import {mapActions} from 'vuex'
export default {
    name:'ChatForm',
    data(){
        return {
            message: null
        }
    },
    methods: {
        ...mapActions(['sendMessage', ]),
        handleSendMessage() {
            this.sendMessage({
                message: this.message
            })
        }
    }

}
</script>

<style scoped>
  .disabled{
      background: red;
  }
  .chat-form{
    bottom: 3rem;  
  }
</style>