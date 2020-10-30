<template>
    <v-col cols="12">
        <appbar :arrow_backspace="true"></appbar>
        <v-col class="signup1" cols="12" style="padding:5px; padding-top:0px;">
        <v-col cols="12" style="color:#B9B9B9; padding-bottom:20px; padding-top:0px; padding-left:0px; font-size:17px;">비밀번호 입력</v-col>
        <br>
        <v-form ref="form" v-model="valid">
            <v-text-field
                :disabled="disabled"
                background-color="#626262"
                solo
                height="56px"
                v-model="password"
                :append-icon="show ? 'visibility' : 'visibility_off'"
                :type="show ? 'text' : 'password'"
                hint="At least 6 characters"
                @click:append="show = !show"
                label="password"
                @keydown.prevent.enter="next"
                :rules="[emailPasswordRules.required, emailPasswordRules.min]"
            ></v-text-field>
            <v-btn class="next" outlined disabled v-if="!(valid)" style="background-color: black !important; font-size:17px;" x-large block>다음</v-btn>
            <v-btn v-else :disabled="disabled" style="font-size:17px;" x-large color="info" block @click="next">다음</v-btn>
        </v-form>
        </v-col>
    </v-col>    
</template>
<script>
import appbar from '../../components/appbar'
import { mapGetters, mapMutations, mapActions } from 'vuex'
import { dbWrite } from '../../firebase';
import firebase from 'firebase/app'
import { Capacitor, Plugins } from '@capacitor/core';

export default {
    components:{
        appbar,
    },
    created(){
        this.password = this.signUpPassword
        //  
    },

    mounted(){
        
    },
    data() {
        return{
            disabled:false,
            valid:true,
            password: '',
            errMsg: '',
            show:false,
        }
    },
    watch:{
        password(){
            this.errMsg = ''
        }
    },
    computed: {
        ...mapGetters({
            emailPasswordRules: 'getEmailPasswordRules',
            signUpPassword: 'getSignUpPassword',
            signUpEmail: 'getSignUpEmail'
        }),
    },
    methods:{
        ...mapActions({
            fetchUserProfile: 'fetchUserProfile', // commons.js
        }),
        ...mapMutations({
            setSignUpPassword: 'setSignUpPassword'
        }),
        async next(){
                this.$store.commit('changeNavBtnDisabled')
				if(this.valid){//email form이 valid or not
					
                     
                    this.disabled = true
                    this.setSignUpPassword(this.password)
                    await this.signUp()
                    await this.fetchUserProfile(this)
                     

                    this.$router.push('/signup2')
				}
				else{
                    alert('잘못된 비밀번호 입니다. 비밀번호 입력을 다시 확인해주세요.')
					console.log("invalid email form!")
                }
                this.$store.commit('changeNavBtnDisabled')
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
        async signUp() {
            this.$store.commit('changeNavBtnDisabled')
            let doc = await firebase.auth().createUserWithEmailAndPassword(this.signUpEmail, this.password)
            let input = {
                    email: this.signUpEmail,
                    name: null,
                    gender: null,
                    isArtist: true,
                    uid: doc.user.uid,
                    displayName: null,//this.email.split('@', 1)[0],
                    emailAlarm: false,
                    pushAlarm: false,
                    createdAt: new Date(),
                    isDark: true,
                    emailVerificationCode:this.generateNumber(),
                    emailVerified:false,
                    platform : Capacitor.platform,
                    signInMethod: "email",
                    nickNameColor:this.genNickNameColor(),
                }
            let a = await this.$db.collection('userProfiles').doc(doc.user.uid).set(input)
            this.$store.commit('changeNavBtnDisabled')
        }
    }
}

</script>
<style>
/* v-text-field안에 label */
.signup1 label.v-label.theme--dark {
    color: #B9B9B9;
}
/* 로그인 검은버튼 테두리 */
.signup1 .theme--dark.v-btn.v-btn--disabled {
    color: #707070 !important;
}
/* 로그인 검은버튼 글자*/
.signup1 .next .v-btn__content{
    color: rgb(255, 255, 255);
}
/* 로그인 파랑버튼 */
.signup1 .theme--dark.v-btn {
    color: white;
}
</style>