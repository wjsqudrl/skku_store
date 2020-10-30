<template>
    <v-app-bar class="black" :height="appBarHeight" fixed flat app >
      <v-row align="center" justify="center" >
        <v-col v-if="isIos" cols="12"></v-col>
        <v-col v-if="isIos" cols="12"></v-col>
        <v-col align="left" justify="center" cols="4">
            <v-btn :disabled="navBtnDisabled" text v-if="arrow" fab x-small @click="click" >
                <v-icon>keyboard_arrow_left</v-icon>
            </v-btn>
            <v-btn :disabled="navBtnDisabled" text v-if="arrow_backspace" fab x-small @click="click" >
                <v-icon>keyboard_backspace</v-icon>
            </v-btn>
            <span @click="clickCancel" v-if="cancel">
              취소
            </span>
        </v-col>
        
        <v-col class="font-weight-bold" cols="4" align="center" justify="center">
          <slot></slot>
        </v-col>

        <v-col cols="4" align="right" justify="center">
          <slot name="right"></slot>
          <v-scale-transition>
            <span v-if="next" @click="$emit('clickNext')" class="info--text">
                다음
            </span>
            <span v-if="writeModify" @click="clickComplete">
              <v-btn :ripple="false" style="font-size:15px;margin-right:-18px" color="info" :disabled="navBtnDisabled || disabled" text>
                완료
              </v-btn>
            </span>
          </v-scale-transition>
        </v-col>         
      </v-row>
      
    </v-app-bar>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import { Capacitor, Plugins } from '@capacitor/core';
import bus from '../utils/bus'
const { Device } = Plugins;

export default {
  data(){
    return {
      count: 0,
      backEvent : {},
      type: 'exitApp',
      appBarHeight:'',
      info:'',
    }
  },
  props:['arrow', 'cancel', 'next', 'writeModify', 'arrow_backspace', 'noshow', 'disabled'],
  created(){
    
  },
  methods: {
    clickTest(){
      console.log('adsf')
    },
    clickComplete(){
      if(this.navBtnDisabled === true){

      }else{
        this.$emit('clickWriteModify')
      }
      
    },
    async click(){
      this.$store.commit('changeNavBtnDisabled')
      this.count = this.count + 1
      if(this.history[this.history.length-1]==='/artwrite/new'){
        if(this.count === 2){
          this.setWriteModifyCancel()
          this.clickBack(this)
        }else{
          this.$emit('clickCancel')
          return
        }
        this.count = 0
      }else{
        if(this.count === 2){
          console.log('exit')
          Plugins.App.exitApp()
        }else{
          if(this.history.length === 1){
            await bus.$emit('start:exitAppAlarm')
            await console.log('한번 더 누르면 앱이 꺼집니다')
            return 
          }else if(this.history.length !== 1){
            console.log('뒤로가기')
            this.clickBack(this)
          }
        }
        this.count = 0
      }
      this.$store.commit('changeNavBtnDisabled')
    },
    async clickCancel(){
      // this.$store.commit('changeNavBtnDisabled')
      this.count = this.count + 1
        if(this.count === 2){
          this.setWriteModifyCancel()
           
          this.clickBack(this)
        }else{
          this.$emit('clickCancel')
          return
        }
        this.count = 0
        // this.$store.commit('changeNavBtnDisabled')
    },
    ...mapMutations({
      setRouterHistory: 'setRouterHistory',
      clickBack: 'clickBack',
      setWriteModifyCancel: 'setWriteModifyCancel'
    }),
  },
  computed: {
    isIos(){
      return this.info.operatingSystem === 'ios' ? true : false
    },
    ...mapGetters({
      history: 'getRouterHistory',
      navBtnDisabled: 'getNavBtnDisabled'
    })
  },
  async mounted(){
    this.info = await Device.getInfo()
    this.appBarHeight = this.info.operatingSystem === 'ios' ? '90px' : '50px'
    if(this.noshow === true){
      this.appBarHeight = '0px'
    }

    if(Capacitor.platform === 'android'){
      this.backEvent = Plugins.App.addListener('backButton', () => {
      if(this.navBtnDisabled === true){
        console.log("백버튼 사용불가")
        // console.log(this.navBtnDisabled)
      }else{
        this.click()
        console.log("백버튼 사용가능")
        // console.log(this.navBtnDisabled)
      }
    });
    }
  },
  beforeDestroy() {
    if (this.backEvent.remove) {
      this.backEvent.remove()
    }
  },
}
</script>

<style>

</style>