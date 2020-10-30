
<template>
  <v-col class="passwordReset" cols="12" style="padding:7px;" >
    <appbar :appBarHeight="appBarHeight" style="" class="black" :arrow="false">
    </appbar>
    
      <v-col cols="12" style="color:#B9B9B9; padding:43px 0px 100px 2px; font-size:15px;">비밀번호 재설정</v-col>

      <v-row align="center" justify="center">
        <v-col cols="12" style="align:center; justify:center;">
          <p style="text-align:center; color:#B9B9B9; font-size:20px;">로그인에 문제가 있나요?</p>
          <p style="text-align:center; color:#B9B9B9; font-size:16px; margin-bottom:0px;">사용자 이메일을 입력하면 다시 계정에 로그인을</p>
          <p style="text-align:center; color:#B9B9B9; font-size:16px; margin-bottom:25px;">할 수 있는 링크를 보내드립니다.</p>
        </v-col>
      </v-row>
      <v-form v-model="valid">
        <v-text-field
          background-color="#626262"
          :disabled="disabled"
            solo
            height="51px"
            v-model="email"
            label="email"
            @keydown.prevent.enter="clickBtn"
            :rules="[emailPasswordRules.required, emailPasswordRules.email]"
        ></v-text-field>
      </v-form>
      <v-btn class="loginLink" outlined disabled v-if="!(valid)" style="background-color: black !important; font-size:17px; height:48px;" x-large block>
        <v-row align="center" justify="center" style="width:100%; height:100%;">
          <v-col align="center" justify="center" cols="12" style="padding:0px; width:100%; height:100%; color:white; font-weight:500; font-size:15px;">
              로그인 링크 보내기
          </v-col>
        </v-row>
      </v-btn>
      <v-btn  :disabled="disabled" v-else style="font-size:15px; height:48px;" x-large color="#009DFF" block @click="clickBtn">
        로그인 링크 보내기
      </v-btn>             

      <br>
      
      <v-row align="center" justify="center">
          <!-- <v-col cols="12"></v-col> -->
          <v-col cols="5"><v-divider style="color:#707070;"></v-divider></v-col>
          <v-col align="center" justify="center" cols="2" style="padding:0px; color:white;" >또는</v-col>
          <v-col cols="5"><v-divider style="color:#707070;"></v-divider></v-col>
          <v-btn style="padding:20px 0px 0px 0px; color:black" x-large :disabled="disabled" text to="/beforelogin"><p style="font-size:15px; color:#B9B9B9;">로그인으로 돌아가기</p></v-btn>
      </v-row>
    <snack-bar :type="type" v-if="snackbar"></snack-bar>
  </v-col>
</template>
<script>
import appbar from '../../components/appbar'
import snackBar from '../../components/snackBar'
import { mapGetters, mapMutations, mapActions } from 'vuex'
import firebase from 'firebase/app'
import bus from '../../utils/bus';

export default {
  components: {
    appbar,
    snackBar,
  },
  mounted(){
     
  },
    data() {
        return{
          disabled: false,
          type: 'reset',
          email: '',
          password: '',
					snackbar: false,
          valid:'',
          appBarHeight:'0px',
        }
    },
    computed: {
        ...mapGetters({
            emailPasswordRules: 'getEmailPasswordRules',
        }),
    },
    methods: {
      clickBtn(){
				if(this.valid){//email form이 valid or not
					this.disabled = true
					this.sendResetLink()
				}
				else{
          alert('잘못된 이메일 입니다. 이메일 입력을 다시 확인해주세요.')
					console.log("invalid email form!")
				}
      },
      ...mapActions({
          fetchUserProfile: 'fetchUserProfile', // commons.js
      }),
      async sendResetLink() {
        this.$store.commit('changeNavBtnDisabled')
        await bus.$emit('start:spinner')
        try{
					var auth = firebase.auth();
					var emailAddress = this.email;
					await auth.sendPasswordResetEmail(emailAddress)
          await bus.$emit('end:spinner')
           
          this.snackbar = true
        }catch{
          this.disabled = false
          await bus.$emit('end:spinner')
           
        }
        this.$store.commit('changeNavBtnDisabled')
      },
    }
}
</script>

<style>
.passwordReset .theme--dark.v-divider {
    border-color: #707070;
}
/* v-text-field안에 label */
.passwordReset label.v-label.theme--dark {
    color: #B9B9B9;
}
/* 로그인 검은버튼 테두리 */
.passwordReset .theme--dark.v-btn.v-btn--disabled {
    color: #707070 !important;
}
/* 로그인 검은버튼 글자*/
.passwordReset .loginLink .v-btn__content{
    color: rgb(255, 255, 255);
}
/* 로그인 파랑버튼 */
.passwordReset .theme--dark.v-btn {
    color: white;
}
</style>