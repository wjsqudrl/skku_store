<template>
<v-app>
    <appbar :arrow="true">인스타그램</appbar>
        <v-row>

            <v-col cols="12" align="center" justify="center">
                <v-card flat>
                    <v-card-title>
                        나의 인스타그램 계정에서 가져오기
                    </v-card-title>
                    <v-divider></v-divider>
                    <v-card-text>
                        <v-row v-show="userProfile.data().instaNickNameCompleted === true ? false : userProfile.data().instaNickName || userProfile.data().instaNickName !== '' ? true : false">
                            <v-col cols="8">
                                본인의 인스타그램 닉네임을 적어주세요.
                            </v-col>
                            <v-col cols="4">
                                <v-btn :disabled="sendDisabled || nickName === ''" color="#B9090B" @click="sendInstaNickName">
                                    제출
                                </v-btn>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field :disabled="sendDisabled" prepend-icon="cloud" label="닉네임" outlined v-model="nickName" :rules="nickNameRules">
                                    
                                </v-text-field>
                            </v-col>
                            <v-col cols="12">
                                인스타 접근을 위한 권한 요청 안내를 곧 드리겠습니다.
                            </v-col>
                        </v-row>
                        <v-row v-show="userProfile.data().instaNickNameCompleted === true ? true : false">
                            <v-col cols="8">
                                아래에 코드을 붙여 넣어 주세요.
                            </v-col>
                            <v-col cols="4">
                                <v-btn :disabled="btnDisabled" color="#B9090B" @click="getInstaCode">
                                    코드 받기
                                </v-btn>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field :disabled="btnDisabled" @click:append="show = !show" :type="show ? 'text' : 'password'" :append-icon="show ? 'visibility' : 'visibility_off'" prepend-icon="title" label="코드" outlined v-model="code" :rules="codeRules">
                                    
                                </v-text-field>
                            </v-col>
                            <v-col cols="6">
                                <v-btn :disabled="!completed || !disabled" elevation="12" @click="getInstaInfo" x-large fab class='fa-instagram'>
                                    다운
                                </v-btn>
                            </v-col>
                            <v-col cols="6">
                                <v-btn ref="save" v-if="showSaveBtn" :disabled="completed2" elevation="12" @click="downloadUrl" x-large fab class='success'>
                                    저장
                                </v-btn>
                            </v-col>
                            <v-col cols="12">
                                인스타그램 계정에 저장된 사진을 나의 사진 보관함에 가져올 수 있어요
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col cols="12">   
            </v-col>
            <v-col cols="12">
            </v-col>
            <v-col cols="12">
            </v-col>
            <v-col cols="12">
            </v-col>
            <v-col cols="12">
            </v-col>
            <v-col cols="12">
            </v-col>
            <v-col cols="12">
            </v-col>
            <v-col cols="12">
            </v-col>
        </v-row>



</v-app>
  
</template>


<script>
import { mapGetters, mapActions } from 'vuex'
import appbar from '../components/appbar'
import axios from 'axios'
import { dbUpdate } from '../firebase.js'
import bus from '../utils/bus';
import firebase from 'firebase/app'

export default {
    components: {
        appbar,
    },
    mounted(){
        this.nickName = this.userProfile.data().instaNickName ? this.userProfile.data().instaNickName : ''
        this.sendDisabled = this.userProfile.data().instaNickName ? true : false
        
         
    },
    watch:{
        code(){
            console.log('code watch')
            
            if(this.code.length === 238){
                this.completed = true
            }else{
                this.completed = false
            }
        },
        async urls(){
            
            if(this.urls.length === this.nameInsta.length){
                console.log('urlwatch')
                let b = await dbUpdate('userProfiles', this.userProfile.id,{
                    instaUrl: this.urls,//firebase.firestore.FieldValue.arrayUnion(this.urls),
                    photoLibrary: firebase.firestore.FieldValue.delete(),
                })
                await this.fetchUserProfile(this)
                await bus.$emit('end:spinner')
                 
                this.$router.push('/photoLibrary')
            }
        }
    },
  data(){
      return {
        sendDisabled:false,
        nickName:'',
        btnDisabled: false,
        code: '',
        nameInsta: '',
        blob:'',
        showSaveBtn: false,
        show: false,
        completed: false,
        codeRules: [
            v => !!v || '코드를 입력해 주세요.',
            v => (v && v.length === 238) || '코드를 정확히 입력해 주세요.',
        ],
        nickNameRules: [
            v => !!v || '닉네임을 입력해 주세요.',
        ],
        urls: [],
        completed2:false,
        disabled:true,
      }
  },
  computed: {

    ...mapGetters({
      //init
      userProfile: 'getUserProfile',
      currentUser: 'getCurrentUser', // commons.js
    })
  },
  methods: {
    async sendInstaNickName(){
        this.sendDisabled = true
        let a = await dbUpdate('userProfiles', this.userProfile.id, {instaNickName:this.nickName, instaNickNameCompleted:false})
        await this.fetchUserProfile(this)
    },
    ...mapActions({
        fetchUserProfile: 'fetchUserProfile',
      }),
      getInstaCode(){
        window.location.href = 'https://tattooup.github.io/'
      },
      async downloadUrl(){
            console.log('downloadUrl')
             
            await bus.$emit('start:spinner')
            this.$store.commit('changeNavBtnDisabled')
            console.log('this.nameInsta')
            // console.log(this.nameInsta)
            for(var i in this.nameInsta){
                while(true){
                    try{
                        let refs = await this.$storage.child('userProfiles').child(this.currentUser.uid).child('photoLibrary').child('insta')
                        let file = await refs.child(this.nameInsta[i])
                        // console.log(file)
                        let url = await file.getDownloadURL()
                        // console.log(url)
                        this.urls.push({url:url, createdAt:new Date(), fileName:this.nameInsta[i], blob:null}) //this.blob[i]

                        break
                    }catch{
                        continue
                    }
                }

            }

        this.$store.commit('changeNavBtnDisabled')    
      },
      async getInstaInfo(){
            this.$store.commit('changeNavBtnDisabled')
            this.btnDisabled = true
            await bus.$emit('start:spinner')
            this.disabled = false
            if(this.code === ''){
                console.log('code is empty')
            }else {
                console.log('update!!')
                let a = await dbUpdate('userProfiles', this.userProfile.id, {instaCode:this.code})
                // console.log(a)
            }
            this.code = ''

            while(true){
                await new Promise(r => setTimeout(r, 1000));
                await this.fetchUserProfile(this)
                let instaFileName = this.userProfile.data().photoLibrary
                if(instaFileName){
                    this.showSaveBtn = true
                    this.nameInsta = instaFileName.insta.publicUrl
                    //this.blob = instaFileName.insta.blob
                    await bus.$emit('end:spinner')
                     
                    this.btnDisabled = true
                    this.completed2 = true
                    await new Promise(r => setTimeout(r, 500));
                    this.$refs.save.click()
                    
                    break
                }else{
                    console.log('else')
                    continue
                }
                
            }
            this.$store.commit('changeNavBtnDisabled')
      }
      
  }
}
</script>

<style>
.fa-instagram {
  background: #125688 !important;
  color: white !important;
}
</style>