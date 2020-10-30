<template>
    <v-col cols="12">
        <appbar :arrow_backspace="true"></appbar>
        <v-col cols="12" class="signup" style="padding:5px; padding-top:0px;">
        <v-col cols="12" style="color:#B9B9B9; padding-bottom:20px; padding-top:0px; padding-left:0px; font-size:17px;">이메일 입력</v-col>
        <br>
        <v-form ref="form" v-model="valid">
            <v-text-field
                :disabled="disabled"
                background-color="#626262"
                solo
                height="56px"
                v-model="email"
                label="email"
                @keydown.prevent.enter="next"
                :rules="[emailPasswordRules.required, emailPasswordRules.email]"
            ></v-text-field>
            <v-btn class="next" outlined disabled v-if="!(valid)" style="background-color: black !important; font-size:17px;" x-large block>다음</v-btn>
            <v-btn v-else :disabled="disabled" style="font-size:17px;" x-large color="info" block @click="next">다음</v-btn>
        </v-form>
        </v-col>
        <v-row align="center" justify="center">
            <v-col style="" cols="" align="center" justify="center">
                <p style="color:red;">{{ errMsg === '' ? '' : errMsg }}</p>
            </v-col>
        </v-row>
          <!-- <snack-bar :type="type" v-if="snackbar"></snack-bar> -->
    </v-col>
</template>
<script>
import appbar from '../../components/appbar'
import { mapGetters, mapActions, mapMutations } from 'vuex'
import { dbQuery } from '../../firebase';

export default {
    components:{
        appbar,
    },
    created(){
        this.email = this.signUpEmail
    },
    data() {
        return{
            valid:true,
            email: '',
            errMsg: '',
            disabled: false,
        }
    },
    watch:{
        email(){
            this.errMsg = ''
        }
    },
    computed: {
        ...mapGetters({
            emailPasswordRules: 'getEmailPasswordRules',
            signUpEmail: 'getSignUpEmail'
        }),
    },
    mounted(){
         
    },
    methods:{
        ...mapMutations({
            setSignUpEmail: 'setSignUpEmail'
        }),
        async next(){

				if(this.valid){//email form이 valid or not
                     
                    this.disabled = true
                    let querySnapshot = await dbQuery('userProfiles', 'email', '==', this.email)
                    // console.log(querySnapshot)
                    let item = []
                    querySnapshot.forEach(doc => {item.push(doc)})
                    if(item.length === 0){
                        
                        this.setSignUpEmail(this.email)
                        this.$router.push('/signup1')
                        
                    }else{
                        this.disabled = false
                        this.errMsg = '이미 사용된 메일 입니다.'
                    }
                    //  
				}
				else{
                    alert('잘못된 이메일 입니다. 이메일 입력을 다시 확인해주세요.')
					console.log("invalid email form!")
                }
                



        }
    }
}
</script>

<style>
/* v-text-field안에 label */
.signup label.v-label.theme--dark {
    color: #B9B9B9;
}
/* 로그인 검은버튼 테두리 */
.signup .theme--dark.v-btn.v-btn--disabled {
    color: #707070 !important;
}
/* 로그인 검은버튼 글자*/
.signup .next .v-btn__content{
    color: rgb(255, 255, 255);
}
/* 로그인 파랑버튼 */
.signup .theme--dark.v-btn {
    color: white;
}
</style>