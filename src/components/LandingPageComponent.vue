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
                   <SignupForm/>
               </div>
           </div>
        </div>
    </div>
</template>
<script>
import Nav from '../layout/NavBar'
import SignupForm from './SignupComponent'
export default {
    name:'LandingPage',
    components: {
        Nav,
        SignupForm,
    }
}
</script>
