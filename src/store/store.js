import Vue from 'vue'
import Vuex from 'vuex'

// main
import commons from './modules/commons'
import search from './modules/search' // AppSearch.vue
import favorite from './modules/favorite'
import data from './modules/data'
import etc from './modules/etc'
import writeModify from './modules/writeModify'


// account
import login from './modules/account/login' // Login.vue
import signup from './modules/account/signup' // SignUp.vue

// mymenu
import follow from './modules/mymenu/follow' // AppFollow.vue
import myreviews from './modules/mymenu/myreviews' //AppMyReviews.vue

//art
import reviewwrite from './modules/art/reviewwrite' // AppArtWrite.vue

Vue.use(Vuex);

//필요한 모듈:
// 1. 앱이 시작할 때 초기화 시켜야 할 모든 변수
// 2. artList에 관련된 것
// 3. search 에서 필요한 것

export const store = new Vuex.Store({
         modules: {
           commons,
           search,
           login,
           signup,
           follow,
           reviewwrite,
           myreviews,
           favorite,
           data,
           etc,
           writeModify
           
         }
       });

