<template>
  <div v-if="userProfile">
  <!-- 애초에 authorProfile이 불러와 져야 이 컴포넌트가 생성됨. -->
      <v-card :width="size" height="200px" v-if="!userProfile.data().userBackgroundUrl" :color="backgroudColor">

      </v-card>
      <v-card  v-else>
        <!-- 만약 저장된 아바타가 있다면 보여준다 --> 
        <v-img :width="size" height="200px" class="grey darken-4" :src="userProfile.data().thumbBackground ? userProfile.data().thumbBackground : userProfile.data().userBackgroundUrl"></v-img>
      </v-card>
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
      return "rgb(255, 255, 255, 0.2)"
    },
        
  },
  methods:{
    ...mapActions({
      fetchUserProfile: 'fetchUserProfile',
    }),
  },
  async created(){
 
  },
  async mounted(){


  }
}

</script>

<style>

</style>