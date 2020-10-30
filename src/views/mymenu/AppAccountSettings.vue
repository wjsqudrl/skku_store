<template>
<v-app>
  <appbar style="z-index:9998" :arrow="true">계정설정</appbar>
  <v-row class="black">
    <v-col cols="12" align="center">

      <v-card flat>
        
        <v-card-title v-if="userProfile.data().signInMethod !== 'email'">
          아바타
        </v-card-title>
        <v-card-title v-else>
          아바타 및 비밀번호
        </v-card-title>

        <v-divider></v-divider>
        
        <v-card-text>
          <!-- 이미지 업로드 시작 -->
          <avatar-view :authorProfile="authorProfile" :isAuthor="isAuthor" @renewAuthorProfile="renewAuthorProfile"></avatar-view>
          <!-- 이미지 업로드 끝 -->

          <!-- 이메일 시작 -->
          <v-list height="100">
            <v-list-item>
              <v-list-item-content>
                <v-text-field outlined v-model="email" label="이메일" disabled></v-text-field>
              </v-list-item-content>

            </v-list-item>
          </v-list>
          <!-- 이메일 끝 -->
        <template v-if="userProfile.data().signInMethod === 'email'">
          <!-- 비밀번호 시작 -->
          <v-list height="100" ref="savePasswordErrMsg">
            <v-list-item>
              <v-list-item-content>
                <v-text-field
                :disabled="disabled"
                outlined
                :append-icon="show ? 'visibility' : 'visibility_off'"
                :type="show ? 'text' : 'password'"
                v-model="password"
                :rules="[emailPasswordRules.min]"
                label="비밀번호"
                @click:append="show = !show">
                </v-text-field>
              </v-list-item-content>

            </v-list-item>
          </v-list>
          <!-- 비밀번호 끝 -->

          <!-- 비밀번호 재입력 시작 -->
          <v-list height="100">
            <v-list-item>
              <v-list-item-content>
                <v-text-field
                  :disabled="disabled"
                  outlined
                  :append-icon="show ? 'visibility' : 'visibility_off'"
                  :type="show ? 'text' : 'password'"
                  v-model="passwordRe"
                  :rules="[emailPasswordRules.min, passwordReRules]"
                  label="비밀번호 재입력"
                  hint="At least 6 characters"
                  @click:append="show = !show"
                ></v-text-field>
              </v-list-item-content>
            </v-list-item>
          </v-list>
          <!-- 비밀번호 재입력 끝 -->
        </template>
          <!-- 세이브 비밀번호 상태 시작 -->
          <v-list height="100" v-if="savePasswordErrMsg">
            <v-list-item>
              <v-list-item-content>
                    <v-col cols="12">
                    <v-icon v-show="savePasswordErrMsg !== ''" color="red">
                        warning
                    </v-icon>
                    {{ savePasswordErrMsg === '' ? '' : savePasswordErrMsg }}
                </v-col>
              </v-list-item-content>
            </v-list-item>
          </v-list>
          <!--세이브 비밀번호 상태 끝 -->


        </v-card-text>
      </v-card>
    </v-col>


    <v-col cols="12" align="center">

      <v-card flat>

        <v-card-title>
          닉네임
        </v-card-title>

        <v-divider></v-divider>

        <v-card-text>
          <!-- 세이브 상태 시작 -->
          <v-list height="100" v-if="saveErrMsg">
            <v-list-item>
              <v-list-item-content>
                    <v-col cols="12">
                    <v-icon v-show="saveErrMsg !== ''" :color="saveErrMsg === '중복 체크를 완료해 주세요.' ? 'red' : ''">
                        {{ saveErrMsg === '중복 체크를 완료해 주세요.' ? 'warning' : '' }}
                    </v-icon>
                    {{ saveErrMsg === '' ? '' : saveErrMsg }}
                </v-col>
              </v-list-item-content>
            </v-list-item>
          </v-list>
          <!--세이브 상태 끝 -->

          <!-- 상태 시작 -->
          <v-list height="100" v-if="errMsg">
            <v-list-item>
              <v-list-item-content>
                    <v-col cols="12">
                    <v-icon v-show="errMsg !== ''" :color="errMsg === '사용할 수 있는 닉네임 입니다.' ? 'green' : 'red'">
                        {{ errMsg === '사용할 수 있는 닉네임 입니다.' ? 'check' : 'warning' }}
                    </v-icon>
                    {{ errMsg === '' ? '' : errMsg }}
                </v-col>
              </v-list-item-content>
            </v-list-item>
          </v-list>
          <!-- 상태 끝 -->
          
          <!-- 원래 닉네임 시작 -->
          <v-list height="100" ref="saveErrMsg">
            <v-list-item>
              <v-list-item-content>

                <v-text-field :disabled="true" outlined v-model="originalDisplayName" label="원래 닉네임"></v-text-field>
                  
              </v-list-item-content>
            </v-list-item>
          </v-list>
          <!-- 원래 닉네임 끝 -->
          
          <!-- 바꿀 닉네임 시작 -->
          <v-list height="100">
            <v-list-item>
              <v-list-item-content>
                <v-text-field
                :disabled="disabled || checkBtnClicked"
                outlined
                v-model="newDisplayName"
                label="바꿀 닉네임"                
                :rules="[displayNameRules.required, displayNameRules.max]" 
                ></v-text-field>
              </v-list-item-content>
            </v-list-item>
          </v-list>
          <!-- 바꿀 닉네임 끝 -->

          <!-- 중복검사 시작 -->
          <v-list style="margin-top:-20px" height="90">
            <v-list-item>
              <v-list-item-content>

                <v-col cols="12" v-if="!checkBtnClicked">
                    <v-scroll-x-transition>
                        <v-btn :disabled="newDisplayName === '' || disabled || newDisplayName.length > 15" block elevation="2" @click="checkUserDisplayName" outlined>
                            중복검사
                        </v-btn>

                    </v-scroll-x-transition>
                </v-col>
                <v-col cols="12" v-else>
                  <v-scroll-x-transition>
                      <v-btn :disabled="disabled" @click="reCheckUserDisplayName" outlined block elevation="2">
                          <v-icon>refresh</v-icon>
                          중복검사 다시 하기
                      </v-btn>
                  </v-scroll-x-transition>
                </v-col>
              </v-list-item-content>

            </v-list-item>
          </v-list>
          <!-- 중복검사 끝 -->

        </v-card-text>
      </v-card>
    </v-col>

    <v-col cols="12" align="center">
      <v-card flat v-if="userProfile.data().isArtist">
        <v-card-title>
          상담 카카오 주소
        </v-card-title>

        <v-divider></v-divider>

        <v-card-text>
          <!-- 상담주소 시작 -->
          <v-list height="100">
            <v-list-item>
              <v-list-item-content>
                <v-text-field :disabled="disabled" outlined v-model="consultAddr" label="상담용 카카오 주소"></v-text-field>
              </v-list-item-content>

            </v-list-item>
          </v-list>
          <!-- 상담주소 끝 -->
        </v-card-text>
      </v-card>
    </v-col>

    <v-col cols="12" align="center">
      <v-card flat v-if="userProfile.data().isArtist">
        <v-card-title>
          상담 번호
        </v-card-title>

        <v-divider></v-divider>

        <v-card-text>
          <!-- 상담번호 시작 -->
          <v-list height="100">
            <v-list-item>
              <v-list-item-content>
                <v-text-field :disabled="disabled" outlined v-model="phoneNum" label="상담번호 (010-xxx-xxxx 형식으로 입력)"></v-text-field>
              </v-list-item-content>

            </v-list-item>
          </v-list>
          <!-- 상담번호 끝 -->
        </v-card-text>
      </v-card>
    </v-col>

    <v-col cols="12" align="center" v-if="userProfile.data().isArtist">
      <map-component :authorProfile="userProfile" @updateLatLng="updateLatLng" :disabled="disabled" :isBtn="true"></map-component>
    </v-col>
    <v-col>
      <v-card flat>

        <v-card-title>
          마케팅 정보 수신 동의
        </v-card-title>

        <v-divider></v-divider>

        <v-card-text>
          <!-- 마케팅 시작 -->
          <v-list height="100">
            <v-list-item>
              <v-list-item-content>
                이벤트 및 혜택에 대한 다양한 정보를 받으실 수 있어요.
              </v-list-item-content>
            </v-list-item>
          </v-list>
          <!-- 마케팅 끝 -->
        </v-card-text>
        
        <toggle-list v-for="item in toggleItems" :key='item.key' :item="item" @isToggledChild="isToggledChild"></toggle-list>

      </v-card>
    </v-col>

    <v-col cols="12" align="center">

      <v-card flat>
          <v-row>
            <v-col cols="1"></v-col>
            <v-col cols="10" align="center">
                  <v-btn :disabled="disabled" elevation="2" block outlined @click="clickBtn" height="50px">
                      <v-scroll-x-transition>
                        <v-icon color="green" v-show="checkSaveDone" large>
                            check
                        </v-icon>
                      </v-scroll-x-transition>
                      저장
                  </v-btn>
            </v-col>
            <v-col cols="1"></v-col>
          </v-row>
      </v-card>
    </v-col>

    <v-col>
      <snackBar :type="type" v-if="snackbar"></snackBar>
    </v-col>
    
  </v-row>
  </v-app>
</template>
<script>
import appbar from '../../components/appbar'
import mapComponent from '../../components/mapComponent'
import avatarView from '../../components/avatarView'
import toggleList from '../../components/toggleList'
import snackBar from '../../components/snackBar'
import firebase from 'firebase/app'
import { mapGetters, mapMutations, mapActions } from 'vuex'
import { userProfiles } from '../../firebase.js';
import { dbUpdate, dbQuery } from '../../firebase.js';
import IsAuthor from '../../mixins/IsAuthor.js'
import displayNameCheck from '../../mixins/displayNameCheck.js'
import bus from '../../utils/bus.js';



export default {
  mixins : [IsAuthor, displayNameCheck],
  components: {
    appbar,
    avatarView,
    toggleList,
    snackBar,
    mapComponent,
  },
  data(){
    return {
      disabled: false,
      authorDocType: 'accountsettings',
      // 계정 관련 변수들  
      
      email: '',// db 저장 변수 
      emailAlarm: '',// db 저장 변수
      pushAlarm: '', // db 저장 변수,
      
      
      password: '', // 컨텐츠 불러오지 말기
      passwordRe: '',
      savePasswordErrMsg: '',

      consultAddr: '',
      phoneNum:'',
      snackbar: false,
      // 기타
      show: false,
      
      // img upload 관련
      files: [],
      type: 'accountSettings',
      checkSaveDone: false,
      saveErrMsg: '',
      
      
    }
  },
  watch: {
    password(){
      this.savePasswordErrMsg = ''
    },
    passwordRe(){
      this.savePasswordErrMsg = ''
    }
  },
  computed: {
    passwordReRules() {
      return () => (this.password === this.passwordRe) || '앞서 입력하신 비밀번호와 같아야 합니다'
    },
    ...mapGetters({
      displayNameRules: 'getDisplayNameRules',
      userProfile: 'getUserProfile',
      emailPasswordRules: 'getEmailPasswordRules',
    }),
    toggleItems() {
      return [{
        key:'emailAlarm',
        icon:`email`,
        content: 'email 알람',
      },
      {
        key:'pushAlarm',
        icon:`mobile_friendly`,
        content: 'push 알람',
      }]
    },
    // isAuthor() {
    //   return this.authorProfile? this.userProfile.data().uid === this.authorProfile.data().uid? true : false : false
    // },
  },
  methods: {
    async updateLatLng(center){
      await dbUpdate('userProfiles', this.userProfile.id, {latLng: center})
      await this.fetchUserProfile(this)
    },
    clickBtn(){
      this.disabled = true
      this.saveChange()
    },
    renewAuthorProfile(){
      console.log('accountsetting')
      this.getAuthorProfile(this.authorDocType)
    },
    async isToggledChild(payload) {
      console.log('isToggledChild')
      if(payload.key === 'emailAlarm'){
        let input = {emailAlarm: payload.value}
        await dbUpdate('userProfiles', this.userProfile.id, input)
      }else{
        let input = {pushAlarm: payload.value}
        await dbUpdate('userProfiles', this.userProfile.id, input)
      }
      this.fetchUserProfile(this)
    },
    ...mapActions({
      fetchUserProfile: 'fetchUserProfile', // commons.js
    }),
    async saveChange() { // 이 함수를 통해 새롭게 업데이트 되는건 닉네임, 상담카카오주소, 비밀번호임
       
      await bus.$emit('start:spinner')
      this.$store.commit('changeNavBtnDisabled')
      // 먼저 닉네임과 상담 카카오 주소는 userProfiles 내에서 업데이트 해줘야함
      if(this.newDisplayName === ''){ // 만약 this.newDisplayName = '' 이면 닉네임을 바꿀 생각이 없다.
        let a = await userProfiles.doc(this.userProfile.id).update({
          consultAddr: this.consultAddr,
          phoneNum: this.phoneNum,
        })
        console.log('profile has been changed')
        this.checkSaveDone = !this.checkSaveDone
      }else if(this.newDisplayName !== ''){ // 이러면 닉네임을 바꿀 의도가 있다.
        if(this.checkUserDisplayDone === false){ // 중복 체크가 안되어 있으면
          this.saveErrMsg = '중복 체크를 완료해 주세요.'
          this.$vuetify.goTo(this.$refs.saveErrMsg)
          this.disabled = false
          await bus.$emit('end:spinner')
           
          return 
        }else{ // 중복 체크가 되어 있으면
          let a = await userProfiles.doc(this.userProfile.id).update({
            displayName: this.newDisplayName,
            consultAddr: this.consultAddr,
            phoneNum: this.phoneNum,
          })
          console.log('profile has been changed')
          this.checkSaveDone = !this.checkSaveDone
        }
      }

      // 그 후 비밀번호는 auth 내에서 업데이트 해줘야함
      if(this.password !== '' || this.passwordRe !== ''){ // 비밀번호가 차 있으면 업데이트 할 의도가 있는 것임
        if(this.password.length < 6 || this.passwordRe.length < 6){ //만약에 길이가 6자리보다 짧으면,
          this.savePasswordErrMsg = '비밀번호 길이는 6자리 이상이어야 합니다.'
          this.$vuetify.goTo(this.$refs.savePasswordErrMsg)
          this.disabled = false
          await bus.$emit('end:spinner')
           
          return 
        }else{ // 길이가 6자리보다 길면
          if(this.password !== this.passwordRe){ // 두개가 같지 않으면
            this.savePasswordErrMsg = '두 비밀번호는 같아야 합니다.'
            this.$vuetify.goTo(this.$refs.savePasswordErrMsg)
            this.disabled = false
            await bus.$emit('end:spinner')
             
            return 
          }else{ // 두개가 같으면
            var user = await firebase.auth().currentUser
            let a = await user.updatePassword(this.password)
            console.log('password has been changed')
            // console.log(a)
          }
        }
      }
      await bus.$emit('end:spinner')
       
      // this.disabled = false
      this.fetchUserProfile(this)
      this.snackbar = true
      this.$store.commit('changeNavBtnDisabled')
    },
    setProfile(){
      this.originalDisplayName = this.userProfile.data().displayName
      this.email = this.userProfile.data().email
      this.emailAlarm = this.userProfile.data().emailAlarm
      this.pushAlarm = this.userProfile.data().pushAlarm
      if(this.userProfile.data().consultAddr){
        this.consultAddr = this.userProfile.data().consultAddr
        this.phoneNum = this.userProfile.data().phoneNum
      }
    },
    
  },
  async created() {
    await bus.$emit('start:spinner')
    await this.setProfile()
    // this.displayName = this.userProfile.data().displayName
    // this.email = this.userProfile.data().email
    // this.emailAlarm = this.userProfile.data().emailAlarm
    // this.pushAlarm = this.userProfile.data().pushAlarm
    // await bus.$emit('end:spinner')
  },
  async mounted(){
    await bus.$emit('end:spinner')
    //  
  }
}
</script>

<style scoped>
</style>