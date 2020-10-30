<template>
    <v-col cols="12">
        <appbar></appbar>

            <v-col cols="12" class="signup4" style="padding:5px; padding-top:10px;">
                <v-col cols="12" style="color:#B9B9B9; padding-bottom:20px; padding-top:0px; padding-left:0px; font-size:17px;">가입하기</v-col>
                <br>


                <v-bottom-sheet v-model="sheet" max-width="calc(100% - 0px)" scrollable inset>
                    <template v-slot:activator="{ on }">
                        <v-row style="padding:0px; margin:0px;">
                            <v-col style="font-size:20px; padding:0px;" cols="12"  align="center">
                                <v-btn class="next" v-if="!(checkbox)" outlined disabled style="background-color: black !important; font-size:17px;" x-large block>가입하기</v-btn>
                                <v-btn v-else :disabled="disabled" style="font-size:17px;" x-large color="info" block @click="next">가입하기</v-btn>
                            </v-col>
                            <v-col v-show="checkbox" cols="12" style="padding:15px 0px 0px 0px;">
                                위 사항을 체크 하신 후 가입하면 약관, 데이터 정책 및 쿠키 정책에 동의하게 됩니다.
                            </v-col>
                        </v-row>
                        <v-row justify="center" align="center" style="padding:0px; margin:0px;">
                            <v-col cols="1" style="padding:0px;">
                                <v-checkbox v-model="checkbox" style="font-size:20px;">
                                </v-checkbox>
                            </v-col>
                            <v-col @click="checkbox = true" style="padding:0px; font-size:9px" align="left" justify="center" cols="11">
                                (필수)<v-btn @click="clickService" small style="padding-bottom:1px; height:20px; margin-left:-10px; font-size:10px" text>서비스 이용약관,</v-btn>
                                <v-btn @click="clickData" small style="padding-bottom:1px; height:20px; margin-left:-22px;margin-right:-11px; font-size:10px" text>개인정보 처리방침</v-btn>
                                에 동의하며 만 14세 이상 고객입니다.
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col style="font-size:18px; padding:20px 0px 45px 0px;" cols="12"  align="center">
                                자전거 수리 앱에 오신 것을 환영합니다.
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col style="font-size:20px; padding:0px;" cols="12"  align="center">
                                {{ userProfile.data().displayName ? userProfile.data().displayName : '번호 가입자' }} 님! 
                            </v-col>
                        </v-row>
                    </template>


                    <v-card style="border-top-left-radius:30px; border-top-right-radius:30px; background-color:#1a1c1f;">
                        <v-card-title>
                            {{ title }}
                            <v-spacer></v-spacer>
                            <v-btn class="mt-6" text @click="sheet = !sheet">
                                닫기
                            </v-btn>
                        </v-card-title>
                        <v-divider style="border-color:#707070; color:#707070;"></v-divider>
                        <v-card-text>
                            {{ content }}
                        </v-card-text>
                        <v-divider style="border-color:#707070; color:#707070;"></v-divider>
                        
                    </v-card>


                </v-bottom-sheet>
            </v-col>
    </v-col>
</template>
<script>
import appbar from '../../components/appbar'
import { dbUpdate } from '../../firebase';
import { mapGetters, mapMutations, mapActions } from 'vuex'
import firebase from 'firebase/app'

export default {
    components:{
        appbar,
    },
    data(){
        return{
            disabled: false,
            sheet: false,
            checkbox: false,
            title: '',
            content: '',
        }
    },
    beforeDestroy(){
         
    },
    computed:{
        valid() {
            return this.isDark === '' ? true : false
        },
        ...mapGetters({
            userProfile: 'getUserProfile',
            dataRule: 'getData',
            serviceRule: 'getService',
        }),
    },
    methods:{

        ...mapActions({
            fetchUserProfile: 'fetchUserProfile', // commons.js
        }),

        async next(){
            this.$router.push('/home')
            //this.$router.go(0)
        },
        clickData(){
            this.title = '개인정보처리방침'
            this.sheet = true
            this.content = this.dataRule
        },
        clickService(){
            this.title = '이용약관'
            this.sheet = true
            this.content = this.serviceRule
        },
    }

}
</script>

<style>
/* 로그인 검은버튼 테두리 */
.signup6 .theme--dark.v-btn.v-btn--disabled {
    color: #707070 !important;
}
/* 로그인 검은버튼 글자*/
.signup6 .next .v-btn__content{
    color: rgb(255, 255, 255);
}
/* 로그인 파랑버튼 */
.signup6 .theme--dark.v-btn {
    color: white;
}
</style>