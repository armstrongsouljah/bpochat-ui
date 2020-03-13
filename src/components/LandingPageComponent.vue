<template>
    <div>
        <Nav/>
        <div class="container">
           <div class="row">
               <div class="col m6 l6 hide-on-small-only">
                   <h3 class="page-header">Bposeats Chat</h3>
                   <p class="flow-text">
                     An intutive chat room for Bposeats employees. Join in and chat away.
                   </p>
               </div>
               <div class="col s12 m6 l6">
                   <div class="col s12">
                        <ul class="tabs">
                            <li class="tab col s6"><a class="active" href="#signupform">Signup</a></li>
                            <li class="tab col s6"><a  href="#loginform">Login</a></li>
                        </ul>
                    </div>
                    <div id="forms">
                        <SignupForm/>
                        <LoginForm/>
                    </div>
               </div>
           </div>
        </div>
    </div>
</template>
<script>
import Nav from '../layout/NavBar'
import SignupForm from './SignupComponent'
import LoginForm from './LoginComponent'
export default {
    name:'LandingPage',
    components: {
        Nav,
        SignupForm,
        LoginForm
    }
}
</script>

<style  scoped>
   .tabs{
       margin-top:22px;
   }
</style>
