import Vue from 'vue'
import Router from 'vue-router'
import SignUp from './views/SignUp.vue'
import LogIn from './views/LogIn.vue'
import UserApps from './views/userApps.vue'
import SignOut from './views/SignOut.vue'
import EditActivity from './views/EditActivity.vue'
import CreateActivity from './views/CreateActivity.vue'
import UserProfile from './views/userProfile.vue'
import EditProfile from './views/EditUserProfile.vue'




Vue.use(Router)

export default new Router({
    routes: [{
            path: '/signUp',
            name: 'signUp',
            component: SignUp
        },
        {
            path: '/logIn',
            name: 'logIn',
            component: LogIn
        },
        {
            path: '/userApps',
            name: 'userApps',
            component: UserApps
        },
        {
            path: '/signOut',
            name: 'signOut',
            component: SignOut
        },
        {
            path: '/edit/:id',
            name: 'edit',
            component: EditActivity
        }, {
            path: '/createActivity',
            name: 'createActivity',
            component: CreateActivity
        }, {
            path: '/profile',
            name: 'profile',
            component: UserProfile
        },{
            path: '/editProfile',
            name: 'editProfile',
            component: EditProfile
        }
        
    ]
})