import './firebase.js'

import Vue from 'vue'
import App from './App.vue'
import './error'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

import { router } from './router/index.js'
import { store } from './store/store.js'

// import Vuetify from 'vuetify/lib'

// Vue.use(Vuetify)


import vuetify from './plugins/vuetify';
import './plugins/vue-toasted'

import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'




import naver from 'vue-naver-maps';
Vue.use(naver, {
  clientID: 'nok695th92',
  useGovAPI: false, //공공 클라우드 API 사용 (선택)
  subModules:'' // 서브모듈 (선택)
});

//fa
import { library } from '@fortawesome/fontawesome-svg-core'
import { faFacebook } from '@fortawesome/free-brands-svg-icons'
import { faVenus, faMars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faFacebookF } from '@fortawesome/fontawesome-free-brands';



library.add(faFacebookF, faFacebook, faVenus, faMars)
Vue.component('font-awesome-icon', FontAwesomeIcon)

import VueUploadComponent from 'vue-upload-component'
Vue.component('file-upload', VueUploadComponent)


Vue.use(VueAwesomeSwiper, /* { default global options } */)
Vue.config.productionTip = false

import firebase from 'firebase/app'

let app = false
firebase.auth().onAuthStateChanged(async user => {
store.commit('changeNavBtnDisabled')
if (!app) {
    //wait to get user
    var user = await firebase.auth().currentUser;
    
    //start app
    app = new Vue({
      render: h => h(App),
      vuetify,
      router,
      store,
      async created(){
        
        await this.$store.commit('setCurrentUser', user)
        // await this.$store.dispatch('fetchArts')
      },
      mounted(){
        
      }
    }).$mount('#app')
  }
  store.commit('changeNavBtnDisabled')
});

