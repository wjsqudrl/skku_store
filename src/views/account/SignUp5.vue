<template>
    <v-col cols="12">
        <appbar></appbar>
        <v-col cols="12" class="signup5" style="padding:5px; padding-top:0px;">
            <v-col cols="12" style="color:#B9B9B9; padding-bottom:20px; padding-top:0px; padding-left:0px; font-size:17px;">닉네임 입력</v-col>
            <br>
            <v-form ref="form" v-model="valid">
                <v-text-field
                    :disabled="disabled"
                    background-color="#626262"
                    solo
                    height="56px"
                    v-model="newDisplayName"
                    label="닉네임"
                    @keydown.prevent.enter="next"
                    :rules="[displayNameRules.required, displayNameRules.max]" 
                ></v-text-field>

                <!-- <v-btn class="next" outlined disabled v-if="!(newDisplayName)" style="background-color: black !important; font-size:17px; margin-bottom:23px;" x-large block>중복검사</v-btn>
                <v-btn v-else :disabled="disabled" style="font-size:17px; margin-bottom:23px;" x-large color="info" block @click="next">중복검사</v-btn>  -->
                
                <v-col cols="12" v-if="!checkBtnClicked" style="padding:0px;">
                    <v-scroll-x-transition>
                        <!-- <v-btn :disabled="newDisplayName === '' || disabled" block elevation="2" @click="checkUserDisplayName" outlined>
                            중복검사
                        </v-btn> -->
                        <v-btn class="next" outlined disabled v-if="!(newDisplayName) || !valid" style="background-color: black !important; font-size:17px; margin-bottom:23px;" x-large block>중복검사</v-btn>
                        <v-btn v-else :disabled="disabled" style="font-size:17px; margin-bottom:23px;" x-large color="info" block @click="checkUserDisplayName">중복검사</v-btn> 

                    </v-scroll-x-transition>
                </v-col>
                <v-col cols="12" v-else style="padding:0px;">
                  <v-scroll-x-transition>
                      <v-btn :disabled="disabled" @click="reCheckUserDisplayName" x-large block outlined style="background-color: black !important; font-size:17px; margin-bottom:23px; border-color:#707070;">
                          <v-icon>refresh</v-icon>
                          중복검사 다시 하기
                      </v-btn>
                  </v-scroll-x-transition>
                </v-col>

                <v-btn class="next" outlined disabled v-if="(!(checkBtnClicked)||!(checkUserDisplayDone))" style="background-color: black !important; font-size:17px;" x-large block>다음</v-btn>
                <v-btn v-else :disabled="disabled" style="font-size:17px;" x-large color="info" block @click="next">다음</v-btn>
                
                <v-col cols="12" align="center" style="margin-top:45px; color:#9A9A9A;">
                    <v-icon v-show="errMsg !== ''" :color="errMsg === '사용할 수 있는 닉네임 입니다.' ? 'green' : 'red'">
                        {{ errMsg === '사용할 수 있는 닉네임 입니다.' ? 'check' : 'warning' }}
                    </v-icon>
                    {{ errMsg === '' ? '' : errMsg }}
                </v-col>

            </v-form>
        </v-col>
    </v-col>
</template>

<script>
import appbar from '../../components/appbar'
import { dbUpdate } from '../../firebase';
import { mapGetters, mapMutations, mapActions } from 'vuex'
import firebase from 'firebase/app'
import displayNameCheck from '../../mixins/displayNameCheck.js'

export default {
     mixins : [displayNameCheck],
    components:{
        appbar,
    },
    data(){
        return{
            valid:false,
            // newDisplayName: '',
            disabled: false,
        }
    },
    beforeDestroy(){
         
    },
    computed: {
        ...mapGetters({
            displayNameRules: 'getDisplayNameRules',
            userProfile: 'getUserProfile',
        }),
    },
    watch:{
        newDisplayName(){
            if(this.checkBtnClicked){
                this.newDisplayName = ''
                this.reCheckUserDisplayName()
            }
        }
    },
    methods:{
        ...mapActions({
            fetchUserProfile: 'fetchUserProfile', // commons.js
        }),

        
        async next(){
            if(this.checkUserDisplayDone){
                if(this.valid){//email form이 valid or not		
                    this.disabled = true
                    var user = firebase.auth().currentUser
                    await dbUpdate('userProfiles', user.uid, {displayName:this.newDisplayName})
                    await this.fetchUserProfile(this)
                    this.$router.push('/signup6')
                    }
                else{
                    alert('잘못된 닉네임입니다. 이메일 입력을 다시 확인해주세요.')
                    console.log("invalid email form!")
                }

            }else{
                alert('닉네임 중복 체크를 완료해 주세요!')
            }
        },
    }
}
</script>

<style>
/* v-text-field안에 label */
.signup5 label.v-label.theme--dark {
    color: #B9B9B9;
}
/* 로그인 검은버튼 테두리 */
.signup5 .theme--dark.v-btn.v-btn--disabled {
    color: #707070 !important;
}
/* 로그인 검은버튼 글자*/
.signup5 .next .v-btn__content{
    color: rgb(255, 255, 255);
}
/* 로그인 파랑버튼 */
.signup5 .theme--dark.v-btn {
    color: white;
}
</style>