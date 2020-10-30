<template>
    <v-col cols="12">
        <appbar></appbar>
        <v-col cols="12" class="signup2" style="padding:5px; padding-top:0px;">
        <v-col cols="12" style="color:#B9B9B9; padding-bottom:20px; padding-top:0px; padding-left:0px; font-size:17px;">확인코드 입력</v-col>
        <br>
        <v-form ref="form" v-model="valid">
            <v-text-field
                :disabled="disabled"
                background-color="#626262"
                solo
                height="56px"
                v-model="code"
                label="확인코드"
                @keydown.prevent.enter="next"
                :rules="[emailPasswordRules.required, emailPasswordRules.min, codeRules]"
            ></v-text-field>
            <v-btn class="next" outlined disabled v-if="!(valid)" style="background-color: black !important; font-size:17px;" x-large block>다음</v-btn>
            <v-btn v-else :disabled="disabled" style="font-size:17px;" x-large color="info" block @click="next">다음</v-btn>
        </v-form>
        </v-col>
        <v-col cols="12"  align="center">
            <p style="color:#bbbbbb;font-size:15px">
                입력하신 이메일 {{ userProfile.data().email }}로<br>
                확인 코드를 보내 드렸습니다.</p>
        </v-col>
        <v-col cols="12" @click="showHelp = !showHelp" align="right">
            <v-btn small text>
            <div style="color:#bbbbbb;font-size:10px">
                이메일이 오질 않습니다
                    <v-icon small>
                        help
                    </v-icon>
            </div>
            </v-btn>
        </v-col>
        <v-col v-if="showHelp"  cols="12"  align="left">
            <div style="color:#bbbbbb;font-size:13px">
                1. 스팸메일함을 확인해 주세요.<br>
                2. 정확한 이메일을 입력했는지 확인해 주세요.
            </div>
            <br>
            <div style="color:#bbbbbb;font-size:11px">
                - 이메일을 잘못 입력 하셨나요?
                <v-btn @click="reSignUp" small text>
                    <div style="color:#bbbbbb;font-size:10px">
                        다시 가입하기
                    </div>
                </v-btn>
            </div>
            <!-- <div style="color:#bbbbbb;font-size:11px">
                - 문의 사항이 있으신가요?
                <v-btn @click="goHelp" small text>
                <div style="color:#bbbbbb;font-size:10px">
                    문의하기
                </div>
                </v-btn>
            </div> -->
        </v-col>
    </v-col>
</template>
<script>
import appbar from '../../components/appbar'
import { mapGetters, mapMutations, mapActions } from 'vuex'
import { dbUpdate } from '../../firebase';
import firebase from 'firebase/app'

export default {
    components:{
        appbar,
    },
    data() {
        return {
            showHelp:false,
            disabled:false,
            valid:true,
            code: '',
        }
        
    },

    beforeDestroy(){
         
    },
    computed: {

        codeRules() {
            let result = this.userProfile ? this.userProfile.data().emailVerificationCode : 'nothing'
            return () => (result === this.code) || '이메일에서 받으신 코드와 일치해야 합니다'
        },
        ...mapGetters({
            emailPasswordRules: 'getEmailPasswordRules',
            userProfile: 'getUserProfile',
        }),
    },
    methods:{
        ...mapActions({
            fetchUserProfile: 'fetchUserProfile', // commons.js
        }),

        async reSignUp(){
            this.$store.commit('changeNavBtnDisabled')
            await firebase.auth().signOut()
            this.$store.commit('changeNavBtnDisabled')
            this.$router.push('/beforelogin')


        },
        async next(){
            
            if(this.valid){
                this.disabled = true
                var user = firebase.auth().currentUser
                await dbUpdate('userProfiles', user.uid, {emailVerified:true})
                await this.fetchUserProfile(this)
                this.$router.push('/signup4')
            }
            else{
                alert('잘못된 코드 입니다. 코드 입력을 다시 확인해주세요.')
            }
        },
    }

}
</script>

<style>
/* v-text-field안에 label */
.signup2 label.v-label.theme--dark {
    color: #B9B9B9;
}
/* 로그인 검은버튼 테두리 */
.signup2 .theme--dark.v-btn.v-btn--disabled {
    color: #707070 !important;
}
/* 로그인 검은버튼 글자*/
.signup2 .next .v-btn__content{
    color: rgb(255, 255, 255);
}
/* 로그인 파랑버튼 */
.signup2 .theme--dark.v-btn {
    color: white;
}
</style>