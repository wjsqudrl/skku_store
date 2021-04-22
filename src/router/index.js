import Vue from 'vue';
import VueRouter from 'vue-router'; 

// ../views/
import AppHome from '../views/AppHome.vue';
import AppSearch from '../views/AppSearch.vue'
import AppFavorite from '../views/AppFavorite.vue'
import AppMymenu from '../views/AppMymenu.vue'
import test from '../views/test.vue'

// ../views/account/
import BeforeLogin from '../views/account/beforeLogin.vue';
import Login from '../views/account/Login.vue';
import Logout from '../views/account/Logout.vue';
import SignUp from '../views/account/SignUp.vue';
import passwordReset from '../views/account/passwordReset'

import SignUp1 from '../views/account/SignUp1.vue';
import SignUp2 from '../views/account/SignUp2.vue';
import SignUp4 from '../views/account/SignUp4.vue';
import SignUp5 from '../views/account/SignUp5.vue';
import SignUp6 from '../views/account/SignUp6.vue';

// ../views/art/
import AppReviewWrite0 from '../views/art/AppReviewWrite0.vue'
import AppReview from '../views/art/AppReview.vue'

// ../views/mymenu/

import AppAccountSettings from '../views/mymenu/AppAccountSettings.vue'
import AppArtist from '../views/mymenu/AppArtist.vue'
import AppCustomerService from '../views/mymenu/AppCustomerService'
import AppFaq from '../views/mymenu/AppFaq'
import AppNotice from '../views/mymenu/AppNotice'
import AppMyReviews from '../views/mymenu/AppMyReviews.vue'
import AppReviewToMe from '../views/mymenu/AppReviewToMe.vue'
import AppSettings from '../views/mymenu/AppSettings.vue'
import AppFollow from '../views/mymenu/AppFollow.vue'

import { store }  from '../store/store'
import firebase from 'firebase/app'
import { dbRead } from '../firebase';

Vue.use(VueRouter);

let loginCheck = (to, from, next) => {
    let user = store.getters.getCurrentUser
    // 로그인 상태면 next()로
    if (user){
        next()
    }
    // 로그인 상태가 아니면 로그인 하라고 경고창 띄우고 next(false) 
    else {
        router.push('/beforelogin')
    }
}

let loginEmailCheck = async (to, from, next) => {
    let user = store.getters.getCurrentUser
    // 로그인 상태면 next()로
    if (user){
        let userProfile = store.getters.getUserProfile
        if(userProfile.data().emailVerified == false){
            router.push('/signup2') 
        }
        next()
    }
    // 로그인 상태가 아니면 로그인 하라고 경고창 띄우고 next(false) 
    else {
        router.push('/beforelogin')
    }
}

let loginEmailInfoCheck = async (to, from, next) => {
    console.log('loginEmailInfoCheck')
    store.commit('changeNavBtnDisabled')
    var user = store.getters.getCurrentUser
    var userProfile = store.getters.getUserProfile
    console.log('what is user?')
    
    if(!user || !userProfile){
        // 원래는 user는 값이 있거나, null이거나 둘중 하나임
        // 그런데 app이 처음 딱 실행 되면 Undefined라서 로그인 상태든 아니든 무조건 로그인하라고 뜨는 거임
        console.log('user is undefined or null or userProfile is undefined')
        // alert('1')
        await store.dispatch('fetchUserProfile')
        await store.dispatch('fetchArts') // commons.js
        var user = await firebase.auth().currentUser
        store.commit('setCurrentUser', user)
        // 로그인 된 상태에서 이 과정을 거치면, 앱을 딱 켰을때 undefined 인 것이 user값이 받아와짐
        // 로그아웃 된 상태에서 이 과정을 거치면 앱을 딱 켰을때 undefined 인 것이 null이 됨
        // 로그아웃 된 상태에서 이 과정을 거치면 null이 였던게 여전히 null이 됨
        if(user){
            var userProfile = await dbRead('userProfiles', user.uid)
            if(window.location.pathname === '/home'){
                // alert('this is home')
                // await store.dispatch('fetchUserProfile')
                // await store.dispatch('fetchArts') // commons.js
                
            }
        }
        
    }

    // 로그인 상태면 next()로
    
    if (user){ //회원이면 다음으로 메일 인증여부 묻기
        if(userProfile.data().emailVerified == true){ //메일인증 되어있으면,
            var gender = userProfile.data().gender
            var isArtist = userProfile.data().isArtist
            var displayName = userProfile.data().displayName
            if(isArtist === ''){ // isArtist 선택이 안 되어 있으면
            }else{ // 아티스트거나 고객이면
                if(gender === null){ // isGender 선택이 안됐으면
                    router.push('signup4') // 성별
                }else{ // 아티스트거나 고객인데 성별 선택이 되어 있으면
                    if(displayName === null){ // 닉네임 설정 안되어있으면
                        router.push('signup5') // 닉네임 설정 페이지로
                    }else{ // 닉네임 설정 되어있으면
                        store.commit('setRouterHistory', to.fullPath)
                        next()
                    }
                    
                }
            }
            
        }else{// 메일인증 안되어있으면
            router.push('/signup2')
        }
    }
    // 로그인 상태가 아니면 로그인 하라고 경고창 띄우고 next(false) 
    else {
        console.log('not login')
        router.push("/beforelogin")
    }
    store.commit('changeNavBtnDisabled')
}

let changeNav = async (to, from, next) => {
    console.log('changeNav')
    store.commit('setRouterHistory', to.fullPath)
    next()
}

export const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '*',
            redirect: '/home',
            beforeEnter: loginEmailInfoCheck
        },
        {
            path: '/',
            redirect: '/home',
            beforeEnter: loginEmailInfoCheck
        },
        {
            path: '/home',
            name: 'home',
            component: AppHome,
            beforeEnter: loginEmailInfoCheck
        },
        {
            path: '/search/:keyword',
            name: 'search',
            component: AppSearch,
            beforeEnter: loginEmailInfoCheck,
        },
        {
            path: '/favorite',
            name: 'favorite',
            component: AppFavorite,
            beforeEnter: loginEmailInfoCheck
        },
        {
            path: '/mymenu',
            name: 'mymenu',
            component: AppMymenu,
            beforeEnter: loginEmailInfoCheck
        },
        {
            path: '/beforelogin',
            name: 'beforelogin',
            component: BeforeLogin,
            beforeEnter: changeNav
        },
        {
            path: '/login',
            component: Login,
            beforeEnter: changeNav
        },
        {
            path: '/logout',
            component: Logout,
            beforeEnter: loginEmailInfoCheck
        },
        {
            path: '/signup',
            component: SignUp,
            beforeEnter: changeNav
        },
        {
            path: '/signup1',
            component: SignUp1,
            beforeEnter: changeNav
        },
        {
            path: '/signup2',
            component: SignUp2,
            beforeEnter: changeNav
        },
        {
            path: '/signup4',
            component: SignUp4,
            beforeEnter: changeNav
        },
        {
            path: '/signup5',
            component: SignUp5,
            beforeEnter: changeNav
        },
        {
            path: '/signup6',
            component: SignUp6,
            beforeEnter: changeNav
        },
        {
            path: '/artist/:id',
            component: AppArtist,
            name: 'artist',
            beforeEnter: loginEmailInfoCheck
        },
        {
            path: '/accountsettings/:id',
            component: AppAccountSettings,
            beforeEnter: loginEmailInfoCheck
        },
        {
            path: '/customerservice',
            component: AppCustomerService,
            beforeEnter: loginEmailInfoCheck,
        },
        {
            path: '/appsettings',
            component: AppSettings,
            beforeEnter: loginEmailInfoCheck
        },
        {
            path: '/faq/',
            component: AppFaq,
            beforeEnter: loginEmailInfoCheck
        },
        {
            path: '/notice/',
            component: AppNotice,
            beforeEnter: loginEmailInfoCheck
        },
        {
            path: '/myreviews/:id',
            component: AppMyReviews,
            beforeEnter: loginEmailInfoCheck
        },
        {
            path: '/reviewtome/:id',
            component: AppReviewToMe,
            beforeEnter: loginEmailInfoCheck
        },
        {
            path: '/follow/:id',
            component: AppFollow,
            beforeEnter: loginEmailInfoCheck
        },
        {
            path: '/reviewwrite/:id',
            component: AppReviewWrite0,
            beforeEnter: loginEmailInfoCheck
        },
        {
            path: '/review/:reviewId',
            component: AppReview,
            beforeEnter: loginEmailInfoCheck
        },
        {
            path: '/test',
            component: test,
            beforeEnter: changeNav
        },
        {
            path: '/passwordReset',
            component: passwordReset,
        }, 

    ],
    scrollBehavior(to, from, savedPosition) {
        store.commit('setHistoryTop', {path:from.path, top:store.getters.getTop})
        // console.log(store.getters.getHistoryTop)
        // console.log(to.path)
        // console.log(store.getters.getHistoryTop[to.path])
        window.scroll(0, store.getters.getHistoryTop[to.path])

        // return { x: 0, y: 0 };
      }

});

