<template>
  <div v-if="userProfile">
  <!-- 애초에 authorProfile이 불러와 져야 이 컴포넌트가 생성됨. -->
      <v-avatar :size="size" v-if="!userProfile.data().userAvatarUrl" :color="backgroudColor">
        <!-- 만약 저장된 아바타가 없다면 그냥 아이콘 -->
        <!-- {{backgroudColor}} -->
        <span class="white--text headline">{{nickName}}</span>
        <!-- <v-icon v-if="userProfile.data().userAvatarUrl === null" x-large>account_circle</v-icon> -->
      </v-avatar>
      <v-avatar :size="size" v-else>
        <!-- 만약 저장된 아바타가 있다면 보여준다 --> 
        <v-img class="grey darken-4" :src="userProfile.data().thumbAvatar ? userProfile.data().thumbAvatar : userProfile.data().userAvatarUrl"></v-img>
      </v-avatar>
  </div>
</template>

<script>
import { dbRead, dbQuery,dbUpdate } from '../firebase'
import { mapGetters, mapActions } from 'vuex'
import bus from '../utils/bus.js';
export default {
  props: ['size','userProfile'],
  data() {
    return {
      profile:[]
    }
  },
  computed: { 
    backgroudColor(){
      return this.userProfile.data().nickNameColor ? this.userProfile.data().nickNameColor : null
    },
    nickName(){
      return this.userProfile.data().displayName ? this.userProfile.data().displayName.substring(0,1) : "TU"
    },
        
  },
  methods:{
    ...mapActions({
      fetchUserProfile: 'fetchUserProfile',
    }),
    async genNickNameColor(uid){
      console.log("genNickNameColor")
      let colorOptions = ["#9E9E9E", "#607D8B", "#795548", "#FF5722", "#FF9800", "#FFC107",
      "#8BC34A", "#CDDC39", "#009688", "#4CAF50", "#03A9F4", "#00BCD4", "#2196F3", "#3F51B5",
      "#673AB7", "#9C27B0", "#F44336", "#E91E63"];//18
      let randomColor = colorOptions[Math.floor(Math.random() * 18)];
      let input = {nickNameColor:randomColor}
      await dbUpdate("userProfiles", uid, input)
    }
  },
  async created(){
    // let doc = await dbRead("userProfiles", )
    //signInMethod
    // await doc.forEach(db=>{
      
    //   if(db.data().fbSignUp){//페북가입
    //     console.log(db.data().fbSignUp)
    //     dbUpdate("userProfiles", db.id, {signInMethod:"facebook"})
    //   }
      
    // })
    // await doc.forEach(db=>{
    //   if(db.data().GgSignUp){//구글
    //     console.log(db.data().GgSignUp)
    //     dbUpdate("userProfiles", db.id, {signInMethod:"google"})
    //   }
    // })
    // await doc.forEach(db=>{
    //   if(!db.data().fbSignUp&&!db.data().GgSignUp){//구글
    //     console.log("email or null")
    //     dbUpdate("userProfiles", db.id, {signInMethod:"email"})
    //   }
    // })
    //nickNameColor
    // await doc.forEach(db=>{
    //   this.genNickNameColor(db.id)
    // })

  },
  async mounted(){

    // console.log(this.backgroudColor())
  }
}

</script>

<style>

</style>