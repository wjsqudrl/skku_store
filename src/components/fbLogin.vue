<template>
  <v-col cols="12">
    <!-- <appbar :arrow="true">로그인 하기</appbar> -->
    <v-row align="center" justify="center">
        <!-- <v-icon x-large>fa-facebook</v-icon> -->
      <v-btn padding ="10" color="primary" light large @click="clickBtn"><b>Facebook으로 계속하기</b></v-btn>
      <!-- <v-btn :disabled="disabled" padding ="10" color="primary" light large @click="clickBtn"><b>signInWithPopup</b></v-btn> -->
      <!-- <v-btn :disabled="disabled" padding ="10" color="primary" light large @click="signInWithRedirect"><b>signInWithRedirect</b></v-btn> -->
    </v-row>
    <!-- 스낵바 -->
    <snack-bar :type="type" v-if="snackbar"></snack-bar>
    <!-- 스낵바 끝 -->  
  </v-col>
</template>

<script>
import appbar from './appbar'
import snackBar from './snackBar'
import { mapGetters, mapMutations, mapActions } from 'vuex'
import firebase from 'firebase/app'
import { dbQuery, dbWrite} from '../firebase.js';
import bus from '../../src/utils/bus';
//fb
import { registerWebPlugin } from "@capacitor/core";
import { FacebookLogin } from "@rdlabo/capacitor-facebook-login";
import { Plugins } from "@capacitor/core";
// import fkSdk from "../store/modules/account/fb"; // eslint-disable-line
const { Network } = Plugins;

export default {
  props: ['disabled'],
  components: {
    snackBar,
    // appbar
  },
  async created() {
    // register cap plugins
    this.$store.commit('changeNavBtnDisabled')
    await registerWebPlugin(FacebookLogin);
    // await registerWebPlugin(cfaSignIn);
    // monitor network status
    let handler = await Network.addListener("networkStatusChange", status => {
      // eslint-disable-next-line
      console.log("Network status changed", status);
    });
    // Get the current network status
    await this.getNetworkStatus();
    this.$store.commit('changeNavBtnDisabled')
    //
  },
  mounted(){
    //  
  },
  data() {
      return{
        type: 'login',
        email: '',
        password: '',
        show: false,
        snackbar: false,
        networkStatus: null,
        fbState: null
      }
  },
    computed: {
        ...mapGetters({
            emailPasswordRules: 'getEmailPasswordRules',
            signUpEmail: 'getSignUpEmail'
        }),
    },
    methods: {
      ...mapMutations({
          setSignUpEmail: 'setSignUpEmail'
      }),
      generateNumber() {
          let max = 9
          let min = 0
          let num1 = Math.floor(Math.random()*(max-min+1)+min).toString()
          let num2 = Math.floor(Math.random()*(max-min+1)+min).toString()
          let num3 = Math.floor(Math.random()*(max-min+1)+min).toString()
          let num4 = Math.floor(Math.random()*(max-min+1)+min).toString()
          let num5 = Math.floor(Math.random()*(max-min+1)+min).toString()
          let num6 = Math.floor(Math.random()*(max-min+1)+min).toString()
          let result = num1 + num2 + num3 + num4 + num5 + num6
          // console.log(result)
          return result
      },
      async FbSignIn() {
         
        await bus.$emit('start:spinner')

        const FACEBOOK_PERMISSIONS = [
          "email",
          // "user_birthday",
          // "user_photos",
          // "user_gender"
        ];
        try{
          alert('try')
            const result = await Plugins.FacebookLogin.login({
              permissions: FACEBOOK_PERMISSIONS
            });
            await bus.$emit('end:spinner')
            //유저 생성 & signIn
            var credential = await firebase.auth.FacebookAuthProvider.credential(
              result.accessToken.token
              );
            var doc = await firebase.auth().signInWithCredential(credential).catch(function(error) {
              // Handle Errors here.
              var errorCode = error.code;
              var errorMessage = error.message;
              // The email of the user's account used.
              var email = error.email;
              // The firebase.auth.AuthCredential type that was used.
              var credential = error.credential;
              if (errorCode === 'auth/account-exists-with-different-credential') {
                alert('다른계정에서 이미 사용되고 있는 이메일입니다');
                // Handle account linking here, if using.
              } else {
                console.error(error);
              }
            });
            // console.log(doc.user.email);
            alert(doc.user.email)
            // console.log(doc.user);
            // console.log(doc.user.uid);
            alert(doc.user.uid)
            //회원정보 여부 검사
            // var doc.user.email = result.accessToken.email
            // console.log("result.accessToken = ",result.accessToken)
            // console.log("doc.user.email = ",doc.user.email);
            let querySnapshot = await dbQuery('userProfiles', 'email', '==', doc.user.email)
            let item = []
            await querySnapshot.forEach(doc => {item.push(doc)})
            // console.log(item.length)
            if(item.length === 0){//회원정보가 없다면
                // this.setSignUpEmail(email)
                // this.$router.push('/signup1')
              console.log("회원정보가 없습니다")
              // console.log(querySnapshot)
              let input = {
                email: doc.user.email,
                name: null,
                gender: null,
                isArtist: '',
                uid: doc.user.uid,
                displayName: doc.user.email,//this.email.split('@', 1)[0],
                emailAlarm: false,
                pushAlarm: false,
                createdAt: new Date(),
                isDark: false,
                emailVerificationCode:this.generateNumber(),
                emailVerified:true,
              }
              let a = await this.$db.collection('userProfiles').doc(doc.user.uid).set(input)
              console.log("set userprofile")
              await this.fetchUserProfile(this)
               
              await this.$router.push('/signup3')

            }else{//이미 userprofiles이 있다면 => 로그인
              console.log("item.length !== 0")
              // console.log(item.length)
              await this.fetchUserProfile(this) // this.userProfile 값을 초기화  // commons.js
              await bus.$emit('end:spinner')
               
              this.snackbar = true
            }            
          }catch{
            console.log("catch")
            this.disabled = false
            this.$emit("disabledFromChild",this.disabled)
            await bus.$emit('end:spinner')
             
          }
      },

      async getNetworkStatus() {
        this.networkStatus = await Network.getStatus();
        // console.log(this.networkStatus)

      },
      
      clickBtn(){
        alert('clickBtn')
        // this.disabled = true//fblogin.vue 내에 disabled=true
        // this.$emit("disabledFromChild",this.disabled)
        this.FbSignIn()
      },
      ...mapActions({
          fetchUserProfile: 'fetchUserProfile', // commons.js
      }),
      
    }
}
</script>

<style scoped>
*{ text-transform: none !important;
   font-size: 17px;
   padding-right: 10;
   padding-left: 10;}
</style>