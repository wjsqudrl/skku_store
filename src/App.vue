<template>
  <v-app>
    <v-content class="black">
      <v-container class="black">
          <keep-alive :include="keepList">
          <router-view :key="$route.fullPath"></router-view>
          </keep-alive>
        </v-container>
    </v-content>
    
    <v-bottom-navigation v-if="!beforelogin" app grow height="80px" class="black">
      <v-row align="center" class="bottomIcon">
        <v-col @click="homeDisabled ? '' : $router.push({ name: 'home'})" align="center">
            <v-icon v-if="homeDisabled">home</v-icon>
            <v-icon v-else style="color:#969696;">home</v-icon>
            <div :style="homeDisabled ? 'font-size:12px; color:white' : 'font-size:12px; color:#969696;'">
              전체
            </div>
        </v-col>
        <v-col @click="searchDisabled ? '' : $router.push('/search/all')" align="center">
          <v-icon v-if="searchDisabled">search</v-icon>
          <v-icon v-else style="color:#969696;">search</v-icon>
          <div :style="searchDisabled ? 'font-size:12px; color:white' : 'font-size:12px; color:#969696;'">
            미처리
          </div>
        </v-col>
        <v-col @click="favoriteDisabled || $route.path === '/beforelogin' ? '' : $router.push({ name: 'favorite'})" align="center">
          <v-icon v-if="favoriteDisabled">favorite</v-icon>
          <v-icon v-else style="color:#969696;">favorite</v-icon>
          <div :style="favoriteDisabled ? 'font-size:12px; color:white' : 'font-size:12px; color:#969696;'">
            진행중
          </div>
        </v-col>
        <v-col @click="myMenuDisabled || $route.path === '/beforelogin' ? '' : $router.push('/mymenu')" align="center">
          <v-icon v-if="myMenuDisabled">person</v-icon>
          <v-icon v-else style="color:#969696;">person</v-icon>
          <div :style="myMenuDisabled ? 'font-size:12px; color:white' : 'font-size:12px; color:#969696;'">
            마이메뉴
          </div>
        </v-col>
      </v-row>
    </v-bottom-navigation> 
    <spinner :loading = "loadingStatus"></spinner>
    <snack-bar :type="type" v-if="snackbar"></snack-bar>
      
  </v-app>



</template>

<script>
import PullTo from 'vue-pull-to'
// import Vue from 'vue'
// import router from './router/index'
// Vue.$vueScrollBehavior(router)
import { mapMutations, mapActions, mapGetters } from 'vuex'
import spinner from './components/spinner.vue'
import bus from './utils/bus.js'
import firebase from 'firebase/app'
import snackBar from './components/snackBar'
import { dbRead } from './firebase';

export default {
  name:'app',
  components:{
    spinner,
    snackBar,
    PullTo
  },
  data() {
    return {
      keepList: ['home', 'search', 'favorite', 'mymenu', 'latest'],
      top: 0,
      loadingStatus : false,
      isLogin: false,
      type:'exitApp',
      snackbar:false,
    }
  },
  computed: {
    ...mapGetters({
      userProfile: 'getUserProfile',
      currentUser: 'getCurrentUser',
      navBtnDisabled: 'getNavBtnDisabled',
      arts: 'getArts',
    }),
    beforelogin(){
      return this.$route.path === "/beforelogin" || this.$route.path ==='/login'|| this.$route.path ==='/passwordReset'|| this.$route.path ==='/signup' || this.$route.path ==='/signup1' || this.$route.path ==='/signup2' || this.$route.path ==='/signup3' || this.$route.path ==='/signup4' || this.$route.path ==='/signup5' || this.$route.path ==='/signup6' ? true : false
    },
    homeDisabled(){
      return this.$route.path === '/home' || this.navBtnDisabled || this.$route.path.split('/')[1].includes('artwrite') || this.$route.path.split('/')[1].includes('reviewwrite')
    },
    searchDisabled(){
      return this.$route.path.split('/')[1] === 'search' || this.navBtnDisabled || this.$route.path.split('/')[1].includes('artwrite') || this.$route.path.split('/')[1].includes('reviewwrite')
    },
    writeDisabled(){
      return this.$route.path.split('/')[1].includes('artwrite') || this.navBtnDisabled || this.$route.path.split('/')[1].includes('reviewwrite')
    },
    favoriteDisabled(){
      return this.$route.path === '/favorite' || this.navBtnDisabled || this.$route.path.split('/')[1].includes('artwrite') || this.$route.path.split('/')[1].includes('reviewwrite')
    },
    myMenuDisabled(){
      return this.$route.path === '/mymenu' || this.navBtnDisabled || this.$route.path.split('/')[1].includes('artwrite') || this.$route.path.split('/')[1].includes('reviewwrite')
    }
  },
  methods: {
    
    onScroll () {
    this.top = window.pageYOffset || document.documentElement.scrollTop
    || document.body.scrollTop
    
    this.$store.commit('setTop', this.top)
    
    },
    ...mapMutations({
        setCurrentUser: 'setCurrentUser', // commons.js
      }),
    ...mapActions({
        fetchArts: 'fetchArts', // commons.js
        fetchUserProfile: 'fetchUserProfile',
        fetchImg: 'fetchImg',
        fetchCss: 'fetchCss',
        fetchText: 'fetchText',
        fetchFavoritesDocsToArray: 'fetchFavoritesDocsToArray', //favorite.js
      }),
    startSpinner() {
      this.loadingStatus = true;
    },
    endSpinner() {
      this.loadingStatus = false;
    },
    startExitAppAlarm(){
      this.snackbar = true
      var t = setTimeout(() => {
        this.snackbar = false
      }, 800)
    },
  },
  async created() { // 자주 쓰이는 변수들은 여기서 먼저 초기화 하고, 다른 vue파일에서 getters를 이용해서 사용
    this.$store.commit('changeNavBtnDisabled')
    await bus.$on('start:spinner', this.startSpinner)
    await bus.$on('start:exitAppAlarm', this.startExitAppAlarm)
    
    var user = await firebase.auth().currentUser;
    
    await this.setCurrentUser(user)
    await this.fetchImg()
    await this.fetchCss()
    await this.fetchText()
  },
  async mounted(){
    
    await bus.$on('end:spinner', this.endSpinner)
    window.addEventListener('scroll', this.onScroll)
    this.$store.commit('changeNavBtnDisabled')
  },
  watch:{

    
    arts(){
       
    },

  },
  beforeDestroy(){
    bus.$off('start:spinner')
    bus.$off('end:spinner')  
    bus.$off('start:exitAppAlarm')
  },
}
</script>

<style scoped>
/* .theme--dark.v-icon {
    color: #969696;
}
.theme--dark.v-bottom-navigation {

    color: #424242;
} */
/* .v-icon--disabled {
    color: #424242;
} */
/* .bottomIcon .theme--dark.v-icon.v-icon.v-icon--disabled {
  color:#FFFFFF;
} */
/* .bottomIcon .theme--dark.v-icon{
    color: #969696;
} */

  /* margin:0px; */
.position {
  position: fixed;
  top: 0;
  left: 0;
  width: 80px;
  height: 80px;
  line-height: 80px;
  font-weight: 700;
  background-color: red;
  z-index: 9;
}
</style>