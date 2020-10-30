<template>
    <v-col cols="12">
        <appbar :arrow_backspace="true"></appbar>
            
            <v-col cols="12" class="signup4" style="padding:5px; padding-top:10px;">
                <v-col cols="12" style="color:#B9B9B9; padding-bottom:20px; padding-top:0px; padding-left:0px; font-size:17px;">성별 선택</v-col>
                <br>
                <v-row align="center" justify="center" style="margin:0px;">
                    <v-col cols="6" style="padding:0px;" align="start" justify="center">
                        <template v-if="!femaleClicked" >
                            <v-btn :disabled="disabled" @click="clickFemaleBtn" outlined height="120px" style="width:100%; border-top-left-radius:15px; border-bottom-left-radius:15px; border-color:#707070">
                                <v-row>
                                    <v-col cols="12">
                                        <v-btn icon disabled>
                                        <v-img width="45px" :src="femaleImg">
                                        </v-img>
                                        </v-btn>
                                    </v-col>
                                    <v-col cols="12" style="white">
                                        여성
                                    </v-col>
                                </v-row>
                            </v-btn>
                        </template>
                        <template v-else>
                            <v-btn height="120px" outlined style="border-width:1.5px; width:100%; border-radius:15px; border-color:#2196f3;">
                                <v-row>
                                    <v-col cols="12">
                                        <v-btn icon disabled>
                                        <v-img width="45px" :src="femaleImg">
                                        </v-img>
                                        </v-btn>
                                    </v-col>
                                    <v-col cols="12" style="color:#2196f3;">
                                        여성
                                    </v-col>
                                </v-row>
                            </v-btn>
                        </template>
                    </v-col>
                    <v-col cols="6" style="padding:0px;" align="start" justify="center">
                        <template v-if="!maleClicked" >
                            <v-btn :disabled="disabled" @click="clickMaleBtn" outlined height="120px" style="width:100%; border-top-right-radius:15px; border-bottom-right-radius:15px; border-color:#707070">
                                <v-row>
                                    <v-col cols="12" style="white">
                                        <v-btn icon disabled>
                                        <v-img width="45px" :src="maleImg">
                                        </v-img>
                                        </v-btn>
                                    </v-col>
                                    <v-col cols="12" style="white">
                                        남성
                                    </v-col>
                                </v-row>
                            </v-btn>
                        </template>
                        <template v-else>
                            <v-btn height="120px" outlined style="border-width:1.5px; width:100%; border-radius:15px; border-color:#2196f3;">
                                <v-row>
                                    <v-col cols="12" style="color:#2196f3;">
                                        <v-btn disabled icon>
                                        <v-img width="45px" :src="maleImg">
                                        </v-img>
                                        </v-btn>
                                    </v-col>
                                    <v-col cols="12" style="color:#2196f3;">
                                        남성
                                    </v-col>
                                </v-row>
                            </v-btn>
                        </template>
                    </v-col>
                </v-row>     
                    <v-col cols="12" style="padding:34px 0px 0px 0px;">
                        <v-btn class="next" outlined disabled v-if="(valid)" style="background-color: black !important; font-size:17px;" x-large block>다음</v-btn>
                        <v-btn v-else :disabled="disabled" style="font-size:17px;" x-large :color="$vuetify.theme.isDark === true ? '#009DFF' : 'info'" block @click="next">다음</v-btn>
                        <!-- <div>Icons made by <a href=“https://www.flaticon.com/authors/freepik” title=“Freepik”>Freepik</a>
                        from <a href=“https://www.flaticon.com/“ title=“Flaticon”>www.flaticon.com</a></div> -->
                    </v-col>              
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
            gender: '',
            disabled: false,
            female:'false',
            male:'false',
            femaleImg:'https://firebasestorage.googleapis.com/v0/b/skku-graduation-project-9dd6a.appspot.com/o/img%2Ffemale.png?alt=media&token=241350c9-04eb-4ac7-b47e-02c63604129e',
            maleImg:'https://firebasestorage.googleapis.com/v0/b/skku-graduation-project-9dd6a.appspot.com/o/img%2Fman.png?alt=media&token=2a067511-ee48-4b59-b256-6c3ce8ad992e'
        }
    },
    computed:{
        valid() {
            return this.gender === '' ? true : false
        },
        femaleClicked(){
            return this.female === true ? true : false
        },
        maleClicked(){
            return this.male === true ? true : false
        }
    },

    beforeDestroy(){
         
    },
    methods:{

        ...mapActions({
            fetchUserProfile: 'fetchUserProfile', // commons.js
        }),
        clickFemaleBtn(){
            this.gender = 'female';
            this.female=true;
            this.male=false;
            // console.log("userOn")
        },
        clickMaleBtn(){
            this.gender = 'male';
            this.male=true;
            this.female=false;
            // console.log("artistOn")
        },
        async next(){
            this.disabled = true
            var user = firebase.auth().currentUser
            await dbUpdate('userProfiles', user.uid, {gender:this.gender})
            await this.fetchUserProfile(this)
            this.$router.push('/signup5')
        }
    }

}
</script>

<style>
/* 로그인 검은버튼 테두리 */
.signup4 .theme--dark.v-btn.v-btn--disabled {
    color: #707070 !important;
}
/* 로그인 검은버튼 글자*/
.signup4 .next .v-btn__content{
    color: rgb(255, 255, 255);
}
/* 로그인 파랑버튼 */
.signup4 .theme--dark.v-btn {
    color: white;
}
</style>