<template>
  <v-col cols="12">
    <appbar :appBarHeight="appBarHeight" :arrow_backspace="true">
    </appbar>
    <v-row class="loginVtextFiled" style="padding:7px 7px 0px 7px;">
      <v-col align="start" cols="12" style="color:#B9B9B9; padding-bottom:40px; padding-top:0px; padding-left:5px; font-size:16px;">이메일로 로그인</v-col>
      <v-form style="width:100%" v-model.lazy="valid1">
        <v-text-field
          color="primary"
          solo
          height="51px"
          :disabled="disabled"
          background-color="#626262"
          v-model.lazy="email"
          label="email"
          @keydown.prevent.enter="clickBtn"
          :rules="[emailPasswordRules.required, emailPasswordRules.email]"
        ></v-text-field>
      </v-form>
    </v-row>
    <v-row class="loginVtextFiled" style="padding:0px 7px 7px 7px;">
      <v-form style="width:100%" v-model.lazy="valid2">
        <v-text-field
          class="iconInVtext"
          solo
          height="51px"
          :disabled="disabled"
          background-color="#626262"
          v-model.lazy="password"
          :append-icon="show ? 'visibility' : 'visibility_off'"
          :type="show ? 'text' : 'password'"
          :rules="[emailPasswordRules.required, emailPasswordRules.min]"
          label="password"
          hint="At least 6 characters"
          @click:append="show = !show"
          @keydown.prevent.enter="clickBtn"
        ></v-text-field>
      </v-form>
    </v-row>
    <v-row class="loginVtextFiled" style="padding:14px 7px 7px 7px;">
      <v-col cols="12" align="end" style="padding:0px;">
        <v-btn class="resetpass" color="black" right style="margin-top:-65px; padding-right:10px;  font-size:14.5px;" x-large :disabled="disabled" text to="/passwordReset">비밀번호를 잊으셨나요?</v-btn>
      </v-col>
        
      <v-btn v-if="!(valid2&&valid1)" class="loginBtn" outlined disabled style="font-size:15px; height:48px;" x-large block>로그인</v-btn>
      <v-btn v-else :disabled="disabled" style="font-size:15px; height:48px;" x-large color="#009DFF" block @click="clickBtn">로그인</v-btn>
      <!-- <v-btn x-large :disabled="disabled" text block to="/signup">새 계정 만들기</v-btn> -->
      <!-- <kakaoLogin></kakaoLogin> -->

    </v-row>
    <snack-bar :type="type" v-if="snackbar"></snack-bar>
  </v-col>
</template>

<script>
import appbar from '../../components/appbar'
import socialLogin from '../../components/socialLogin'
import snackBar from '../../components/snackBar'
import { mapGetters, mapMutations, mapActions } from 'vuex'
import firebase from 'firebase/app'
import bus from '../../utils/bus';
import kakaoLogin from '../../components/kakaoLogin'
import { dbRead, dbQuery, appContents, dbUpdate} from '../../firebase'

export default {
  components: {
    appbar,
    socialLogin,
    snackBar,
    kakaoLogin
  },
  async mounted(){

     
  },
    data() {
        return{
          src:'',
          disabled: false,
          type: 'login',
          email: '',
          password: '',
          show: false,
          snackbar: false,
          valid1:false,
          valid2:false,
          appBarHeight:'30px',
        }
    },
    computed: {
        ...mapGetters({
            emailPasswordRules: 'getEmailPasswordRules',
            currentUser: 'getCurrentUser',
        }),
    },
    methods: {
      clickBtn(){
        if(!(this.valid2&&this.valid1)){
          alert('아이디 혹은 비밀번호 입력이 잘못 되었습니다.')

        }else{
          this.disabled = true
          this.signIn()
        }
      },
      ...mapActions({
          fetchUserProfile: 'fetchUserProfile', // commons.js
          fetchArts: 'fetchArts',
      }),
      async signIn() {
        this.$store.commit('changeNavBtnDisabled')
        await bus.$emit('start:spinner')
        try{
          var res = await firebase.auth().signInWithEmailAndPassword(this.email, this.password)
          var user = await firebase.auth().currentUser
          
          var userInfo = await dbRead("userProfiles",user.uid)
          if(!userInfo.data().isArtist){
            this.disabled = false
            await bus.$emit('end:spinner')
            alert("해당 계정은 손님용 계정이오니 새로 가입해주세요")
            await firebase.auth().signOut()
            await this.$store.commit('changeNavBtnDisabled')
            return
            // throw new Error("이미 손님용 계정으로 가입되어 있으니 새로 가입해주세요")
          }
          console.log(userInfo.data().isArtist)
          await this.fetchUserProfile(this) // this.userProfile 값을 초기화  // commons.js
          await this.fetchArts() // commons.js 
          await bus.$emit('end:spinner')
           
          this.snackbar = true
        }catch{
          this.disabled = false
          await bus.$emit('end:spinner')
          alert("아이디 또는 비밀번호가 잘못되었습니다")
           
        }
        this.$store.commit('changeNavBtnDisabled')
      },
    }
}
</script>

<style>

.loginVtextFiled label.v-label.theme--dark {
    color: #B9B9B9;
}
.loginVtextFiled .theme--dark.v-icon {
    color: #B9B9B9;
}
.resetpass .v-btn__content{
    color: #B9B9B9;
}
.loginVtextFiled .theme--dark.v-btn.v-btn--disabled {
    color: #707070 !important;
}
/* 로그인 파랑버튼 */
.loginVtextFiled .theme--dark.v-btn {
    color: white;
}
/* 로그인 검은버튼 */
.loginVtextFiled .loginBtn .v-btn__content{
    color: rgb(255, 255, 255);
}
</style>
