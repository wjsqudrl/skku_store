<template>

    <v-col cols="12" align="center" justify="center" style="margin-top:200px">
        <appbar :appBarHeight="appBarHeight" class="black" :arrow="false">사장님 전용</appbar>          
        <v-btn :disabled="disabled" style="margin-bottom:40px; background-color:#626262; width:100%; padding:0px; height:48px;" large to="/login">
            <v-row align="center" justify="center" style="margin:0px;">
                <v-col align="center" justify="center" cols="3" style="padding:0px; max-width:18%">
                    <v-icon style="color:#CBCBCB; width:25px; height:25px;" class="material-icons">mail</v-icon>
                </v-col>
                <v-col align="center" justify="center" cols="" style="color:#B9B9B9; font-weight:500; font-size:15px; padding:0px; max-width:68%">
                    이메일로 로그인
                </v-col>
                <v-col align="center" justify="center" cols="" style="padding:0px; max-width:14%"></v-col>
            </v-row>
        </v-btn>  
        <v-row align="center" justify="center" style="margin:0px; height:40px">
            <v-col cols="12"></v-col>
            <v-col cols="5"><v-divider style="border-color:#707070; color:#707070;"></v-divider></v-col>
            <v-col align="center" justify="center" cols="2" style="padding:0px; color:white;" >또는</v-col>
            <v-col cols="5"><v-divider style="border-color:#707070; color:#707070;"></v-divider></v-col>
            <v-btn x-large :disabled="disabled" text to="/signup" style="padding:20px 0px 0px 0px; color:black;"><p style="color:#9A9A9A;">이메일로 회원가입</p></v-btn>
        </v-row>
        <snack-bar :type="type" v-if="snackbar"></snack-bar>
    </v-col>
</template>

<script>
import appbar from '../../components/appbar'
import snackBar from '../../components/snackBar'
import { mapActions } from 'vuex'
import bus from '../../utils/bus'
//fb
import { registerWebPlugin } from "@capacitor/core"
import { FacebookLogin } from "@rdlabo/capacitor-facebook-login"
import { Capacitor, Plugins } from '@capacitor/core';
//firebase
import firebase from 'firebase/app'
import { dbQuery} from '../../firebase';
//google
// import "@codetrix-studio/capacitor-google-auth";

window.fbAsyncInit = function() {
  FB.init({
    appId: '1596331880542723',
    cookie: true, // enable cookies to allow the server to access the session
    xfbml: true, // parse social plugins on this page
    version: 'v5.0' // use graph api version 2.8
  });
};

// Load the SDK asynchronously
(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "https://connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

export default {
    components: {
        snackBar,
        appbar
    },
    data() {
        return{
            disabled: false,
            type: 'login',
            snackbar: false,
            appBarHeight:'0px',
        }
    },
    async created(){
        console.log('beforelogin')
        // register cap plugins
        await registerWebPlugin(FacebookLogin);
    },
    async mounted(){
        console.log('mounted')
         
    },
    methods: {
        clickBtn(){
            this.disabled = true
            this.FbSignIn()
        },
        clickBtn1(){
            this.disabled = true
            this.GgsignIn()
        },
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
         genNickNameColor(){
            console.log("genNickNameColor")
            let colorOptions = ["#9E9E9E", "#607D8B", "#795548", "#FF5722", "#FF9800", "#FFC107",
            "#8BC34A", "#CDDC39", "#009688", "#4CAF50", "#03A9F4", "#00BCD4", "#2196F3", "#3F51B5",
            "#673AB7", "#9C27B0", "#F44336", "#E91E63"];//18개
            let randomColor = colorOptions[Math.floor(Math.random() * 18)];
            return randomColor
        },
        // genNickNameColor(){
        //     let colorOptions = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", 
        //                     "A", "B", "C", "D", "E", "F"]; 
        //     let randomColor = "#";
        //     for (let i = 0; i < 6; i++) {
        //         randomColor += colorOptions[Math.floor(Math.random() * 16)];
        //     }
        //     return randomColor
        // },
        // async GgsignIn(){
        //     //navigationBar unabled
        //     //spinner-on
        //     await bus.$emit('start:spinner')
        //     try{
        //         let googleUser = await Plugins.GoogleAuth.signIn();
        //         //로그아웃 후 다른계정
        //         // var provider = await firebase.auth.GoogleAuthProvider();
        //         // await provider.setCustomParameters({
        //         //     prompt: 'select_account'
        //         // });
        //         // const credential
        //         var credential = await firebase.auth.GoogleAuthProvider.credential(
        //             googleUser.authentication.idToken
        //         );
        //         var doc = await firebase.auth().signInWithCredential(credential).catch(function(error) {
        //             // Handle Errors here.
        //             var errorCode = error.code;
        //             var errorMessage = error.message;
        //             // The email of the user's account used.
        //             var email = error.email;
        //             // The firebase.auth.AuthCredential type that was used.
        //             var credential = error.credential;
        //             if (errorCode === 'auth/account-exists-with-different-credential') {
        //                 alert('다른계정에서 이미 사용되고 있는 이메일입니다');
        //                 // Handle account linking here, if using.
        //             } else {
        //                 console.error(error);
        //             }
        //         });
        //         let querySnapshot = await dbQuery('userProfiles', 'uid', '==', doc.user.uid)
        //         let item = []
        //         await querySnapshot.forEach(doc => {item.push(doc)})
        //         //회원정보가 없다면
        //         if(item.length === 0){
        //             console.log("회원정보가 없습니다")
        //             // console.log(querySnapshot)
        //             let input = {
        //                 email: doc.user.email,
        //                 name: null,
        //                 gender: null,
        //                 isArtist: '',
        //                 uid: doc.user.uid,
        //                 displayName: doc.user.email,//this.email.split('@', 1)[0],
        //                 emailAlarm: false,
        //                 pushAlarm: false,
        //                 createdAt: new Date(),
        //                 isDark: false,
        //                 emailVerificationCode:this.generateNumber(),
        //                 emailVerified:true,
        //                 platform : Capacitor.platform,
        //                 // GgSignUp : true,
        //                 nickNameColor:this.genNickNameColor(),
        //                 signInMethod:"google",
        //             }
        //             //firebase에 userprofile 생성
        //             let a = await this.$db.collection('userProfiles').doc(doc.user.uid).set(input)
        //             console.log("set userprofile")
        //             // this.userProfile 값을 초기화  // commons.js
        //             await this.fetchUserProfile(this)
        //             await this.fetchArts()
        //             await bus.$emit('end:spinner')
        //             //  
        //             //고객, 아티스트 고르기로 이동
        //             await this.$router.replace('/signup3')
        //         }else{//이미 userprofiles이 있다면 => 로그인
        //             // this.userProfile 값을 초기화  // commons.js
        //             await this.fetchUserProfile(this) 
        //             await bus.$emit('end:spinner')
                     
        //             this.snackbar = true
        //         }            
        //     }catch{
        //         console.log("catch")
        //         this.disabled = false
        //         await bus.$emit('end:spinner')
                 
        //     }
        //     // this.$store.commit('changeNavBtnDisabled')
        // },
        // async FbSignIn() {
        //     //navigationBar unabled
        //     //spinner-on
        //     await bus.$emit('start:spinner')
        //     //fb email permissions
        //     const FACEBOOK_PERMISSIONS = [
        //         "email",
        //     ];

        //     try{
        //         //token 생성
        //         const result = await Plugins.FacebookLogin.login({
        //             permissions: FACEBOOK_PERMISSIONS
        //         });
        //         //fb signIn
        //         var credential = await firebase.auth.FacebookAuthProvider.credential(
        //             result.accessToken.token
        //         );
                
        //         var doc = await firebase.auth().signInWithCredential(credential).catch(function(error) {
        //             // Handle Errors here.
        //             var errorCode = error.code;
        //             var errorMessage = error.message;
        //             // The email of the user's account used.
        //             var email = error.email;
        //             // The firebase.auth.AuthCredential type that was used.
        //             var credential = error.credential;
        //             if (errorCode === 'auth/account-exists-with-different-credential') {
        //                 alert('다른계정에서 이미 사용되고 있는 이메일입니다');
        //                 // Handle account linking here, if using.
        //             } else {
        //                 console.error(error);
        //             }
        //         });
                
        //         let querySnapshot = await dbQuery('userProfiles', 'uid', '==', doc.user.uid)
        //         let item = []
        //         await querySnapshot.forEach(doc => {item.push(doc)})
        //         //회원정보가 없다면
        //         if(item.length === 0){
        //             console.log("회원정보가 없습니다")
        //             // console.log(querySnapshot)
        //             let input = {
        //                 email: doc.user.email,
        //                 name: null,
        //                 gender: null,
        //                 isArtist: '',
        //                 uid: doc.user.uid,
        //                 displayName: doc.user.email,//this.email.split('@', 1)[0],
        //                 emailAlarm: false,
        //                 pushAlarm: false,
        //                 createdAt: new Date(),
        //                 isDark: false,
        //                 emailVerificationCode:this.generateNumber(),
        //                 emailVerified:true,
        //                 platform : Capacitor.platform,
        //                 // fbSignUp : true,
        //                 nickNameColor:this.genNickNameColor(),
        //                 signInMethod:"facebook",
        //             }
        //             //firebase에 userprofile 생성
        //             let a = await this.$db.collection('userProfiles').doc(doc.user.uid).set(input)
        //             console.log("set userprofile")
        //             // this.userProfile 값을 초기화  // commons.js
        //             await this.fetchUserProfile(this)
        //             await this.fetchArts()
        //             await bus.$emit('end:spinner')
        //             //  
        //             //고객, 아티스트 고르기로 이동
        //             await this.$router.push('/signup3')
        //         //이미 userprofiles이 있다면 => 로그인
        //         }else{
        //             // this.userProfile 값을 초기화  // commons.js
        //             await this.fetchUserProfile(this) 
        //             await bus.$emit('end:spinner')
                     
        //             this.snackbar = true
        //         }            
        //     }catch{
        //         console.log("catch")
        //         this.disabled = false
        //         await bus.$emit('end:spinner')
                 
        //     }
        //     // this.$store.commit('changeNavBtnDisabled')
        // },
        ...mapActions({
          fetchUserProfile: 'fetchUserProfile', // commons.js
          fetchArts: 'fetchArts',
        }),
    }
}
</script>

<style>
.fa-google {
  background: #000000 !important;
  border-color: #9B9B9B !important;
}
</style>