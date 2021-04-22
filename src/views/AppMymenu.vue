<template>
  <div>
    <appbar>
      마이메뉴
      <template v-slot:right>
        <v-icon @click="$router.push('/accountsettings/'+ userProfile.data().uid)">settings</v-icon>
      </template>
    </appbar>
      <v-row class="black">
        <v-col cols="4" justify="center" align="center">
        </v-col>
        <v-col cols="4" justify="center" align="center" style="padding-top:20px;">
          <avatar :userProfile="userProfile" :size="60"></avatar>
          <div style="font-size:14px; padding-top:5px;">
              {{ nickName }}
              <font-awesome-icon v-if="isArtist" :icon="{ prefix: 'fas', iconName: icon }" :style="{ color: color }" style="font-size:12px;vertical-align:-0.12em;"/>
          </div>
        </v-col>
        <v-col cols="4" justify="center" align="center">
        </v-col>

        <v-col cols="12" v-if="userProfile" style="padding-top:0px;">  
          <!-- 메뉴 시작 부분 -->
          <!-- <list v-for="item in items" :key="item.key" :item="item"></list> -->
          <!-- 메뉴 끝 부분 -->
          <myMenuList :items="items1"></myMenuList>
          <myMenuList :items="items2"></myMenuList>
          <myMenuList :items="items3"></myMenuList>

        </v-col>
      </v-row>
  </div>
</template>

<script>
import { dbRead, dbQuery, appContents, dbUpdate} from '../firebase'
import appbar from '../components/appbar'
import list from './../components/list'
import myMenuList from '../components/myMenuList'
import avatar from '../components/avatar'
import avatarList from '../components/avatarList'
import { mapGetters } from 'vuex'
import bus from '../utils/bus.js';
import { Capacitor, Plugins } from '@capacitor/core';
const { Device } = Plugins;
import axios from 'axios';

export default {
  name:'mymenu',
  data() {
    return {
      info:'',
      forUser: true,
      type: 'art',
      version_store:'',
    }
  },
  components: {
    appbar,
    avatar,
    myMenuList
  },
  computed: {
    isArtist(){
      return this.userProfile ? this.userProfile.data().isArtist ? this.userProfile.data().isArtist === true ? true : false : null : null
    },
    icon(){
        return this.userProfile ? this.userProfile.data().gender ? this.userProfile.data().gender === 'female' ? 'venus' : 'mars' : "" : ""
    },
    color(){
        return this.userProfile ? this.userProfile.data().gender ? this.userProfile.data().gender === 'female' ? 'pink' : '#00AAFF' : "" : ""
    },
    isIos(){
      return this.info.operatingSystem === 'ios' ? true : false
    },
    nickName(){
      return this.userProfile ? this.userProfile.data().displayName ? this.userProfile.data().displayName : "" : ""
    },
    ...mapGetters({
    userProfile: 'getUserProfile',
    text: 'getText',
    token: 'getToken',
    }),
    items1() {      
      return [
        { header: '나의 아티스트 활동', 
          show:!this.isArtist
        },
        {
          title: '마이 페이지',
          url:'/artist/' + this.userProfile.data().uid,
          show:!this.isArtist
        },
      ]
    },
    items2() {      
      return [
        { header: '나의 앱 활동',
          show:true
        },
        {
          title: '마이 페이지',
          url:'/artist/' + this.userProfile.data().uid,
          show:this.isArtist
        },
        {
          title: '내가 받은 리뷰',
          url:'/reviewtome/' + this.userProfile.data().uid,
          show:this.isArtist
        },
        {
          title: '앱 설정',
          url:'/appsettings/',
          show:true
        },
      ]
    },
    items3() {      
      return [
        { header: '고객센터',
          show:true
        },
        {
          title: '공지사항',
          url:'/notice/',
          show:true
        },
        {
          title: '자주 묻는 질문',
          url:'/faq/',
          show:true
        },
        {
          title: '1:1 문의하기',
          href:'https://pf.kakao.com/_BRpxjK',
          show:true
        },
      ]
    },
  },
  async created(){
    await bus.$emit('start:spinner')
    this.info = await Device.getInfo()
    console.log(this.token)
    
  },
  async mounted(){
    await bus.$emit('end:spinner')
   
    if(!this.userProfile.data().platform){
      let a = this.isIos ? 'ios' : 'android'
      await dbUpdate('userProfiles', this.userProfile.id, {platform:a})
    }
  },
}
</script>
    

<style scoped>

</style>
