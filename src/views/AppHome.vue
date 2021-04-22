<template>
  <div>
    <appbar :noshow="true"></appbar>
    <v-row>

      <v-col cols="12" style="padding:0px 0px 0px 0px;" class="black">
        <v-col :height="winHeight / 7 * 3" class="black">
          <topItemsHome v-if="show"></topItemsHome>
        </v-col>
      </v-col>

      <v-col cols="12" v-show="this.userProfile ? this.userProfile.data().latLng ? true : false :false">
        <card-list-small :arts="favoritesDocsToArray"></card-list-small>
      </v-col>
      
    </v-row>
  </div>
</template>

<script>
import appbar from '../components/appbar'
import topItemsHome from '../components/topItemsHome'
import { dbRead, dbQuery, appContents, dbUpdate } from '../firebase'
import firebase from 'firebase/app'
import { mapMutations, mapActions, mapGetters } from 'vuex'
import bus from '../utils/bus'
import cardListSmall from '../components/cardListSmall'
// import '../store/modules/messaging.js'
import 'firebase/messaging'

export default {
  name:'home',
  components: {
    appbar,
    topItemsHome,
    cardListSmall,
  },
  computed: {
    ...mapGetters({
      currentUser: 'getCurrentUser',
      userProfile: 'getUserProfile',
      favoritesDocsToArray: 'getFavoritesDocsToArray', //favorite.js
    }),
  },
  data() {
    return {
      show:true,
      winHeight:'',
    }
  },
  watch:{

  },
  async created(){
    this.$store.commit('changeNavBtnDisabled')
    await bus.$emit('start:spinner')
    this.winHeight =  window.innerHeight || document.body.clientHeight

    

  },
  async activated(){
    let a = this.userProfile.data().latLng
    let b = this.userProfile.data().phoneNum
    console.log(a)
    // console.log(b)
    console.log(typeof(a)==="undefined")
    // this.fetchUserProfile()
    if(typeof(a)==="undefined"||typeof(b)==="undefined"||b===""){//위치설정 안함
      await alert("업체의 위치와 번호를 설정해주세요")
    }else{//위치설정함
      if(this.currentUser){//로그인
        if(this.favoritesDocsToArray.length === 0){//업을시
          await this.fetchFavoritesDocsToArray(this.currentUser.uid)
        }
      }
    }
    
  },
  async mounted(){
    let messaging = firebase.messaging.isSupported() ? firebase.messaging() : null
    // alert("로그인")
    if (firebase.messaging.isSupported()){
        messaging.usePublicVapidKey(process.env.VUE_APP_FIREBASE_PUSH_KEY)
    }
    if (firebase.messaging.isSupported()) {
        // // TODO: Send token to server for send notification
        // Get Instance ID token. Initially this makes a network call, once retrieved
        // subsequent calls to getToken will return from cache.
        messaging.getToken().then((currentToken) => {
            if (currentToken) {
                console.log(currentToken)
                // context.commit('setToken')
                this.$store.commit('setToken', currentToken)
                this.$store.commit('mainJSstart')
                var uid = firebase.auth().currentUser.uid
                console.log(uid)
                console.log("token Update")
                var input = {
                    token: firebase.firestore.FieldValue.arrayUnion(currentToken),
                }
                dbUpdate('userProfiles', uid, input)

            } else {
                // Show permission request.
                console.log('No Instance ID token available. Request permission to generate one.');
                Notification.requestPermission()
                    .then((permission) => {
                        console.log('permission ', permission)
                        if (permission !== 'granted') {
                            alert('브라우저의 알림을 허용해주세요')

                        }
                    })
            }
        }).catch((err) => {
            console.log('An error occurred while retrieving token. ', err);
            Notification.requestPermission()
                .then((permission) => {
                    console.log('permission ', permission)
                    if (permission !== 'granted') {
                        alert('브라우저의 알림을 허용해주세요')

                    }
                })

        });
        // // // Handle received push notification at foreground
        messaging.onMessage(payload => {
            console.log("asdasdasd");
            // alert("foreground")
            const title = payload.notification.title;
            const options = {
                body: payload.notification.body,
                icon: '/firebase-logo.png',
            };
            const notification = new Notification(title, options);
            return notification;
        })
    }
    await bus.$emit('end:spinner')
    this.$store.commit('changeNavBtnDisabled')

  },
  methods:{
    ...mapActions({
        fetchUserProfile: 'fetchUserProfile',
        fetchFavoritesDocsToArray: 'fetchFavoritesDocsToArray', //favorite.js
      }),
  },
  
}
</script>

<style scoped>



</style>
