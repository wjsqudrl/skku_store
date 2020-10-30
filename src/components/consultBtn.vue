<template>
  <v-card>
    <v-row class="black">
      <v-col cols="12" style="padding-bottom:0px">
        <v-btn
        class="info"
        block
        @click="click"
        >
          상담 및 예약하기
        </v-btn>
      </v-col>
      <v-col cols="12">
        <v-btn
        class="grey"
        block
         @click="click1"
        >
          전화하기
        </v-btn>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import bus from '../utils/bus';

export default {
    props:['userProfile','authorProfile', 'artUid'],
    created(){
    },  
    methods:{
      async click(){

        this.$store.commit('changeNavBtnDisabled')
        await bus.$emit('start:spinner')
        this.disabled = true

        let input = {
            authorUid: this.authorProfile.data().uid,
            userUid: this.userProfile.data().uid,
            artUid: this.artUid,
            createdAt: new Date(),
            }

        await this.$db.collection('userProfiles').doc(this.authorProfile.data().uid).collection('consult').add(input)

        if(this.authorProfile.data().consultAddr){
           
          window.location = this.authorProfile.data().consultAddr
        }else{
          alert('업체의 상담 주소가 아직 입력 되지 않았습니다.')
        }

        this.disabled = false
        await bus.$emit('end:spinner')
        this.$store.commit('changeNavBtnDisabled')


      },
      async click1(){

      this.$store.commit('changeNavBtnDisabled')
      await bus.$emit('start:spinner')
      this.disabled = true

      if(this.authorProfile.data().phoneNum){
          
        window.location.href = "tel:"+this.authorProfile.data().phoneNum
      }else{
        alert('업체의 상담번호가 아직 입력 되지 않았습니다.')
      }

      this.disabled = false
      await bus.$emit('end:spinner')
      this.$store.commit('changeNavBtnDisabled')


    }
    }
}
</script>

<style>

</style>