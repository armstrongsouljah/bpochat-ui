import Vue from 'vue'
import VueRouter from 'vue-router'
import InboxPage from './components/InboxComponent.vue'
import LandingPage from './components/LandingPageComponent.vue'

Vue.use(VueRouter)


export default new VueRouter({
    mode:'history',
    routes: [
        {path:'/', component: LandingPage},
        {path:'/inbox', component: InboxPage}
    ]
})