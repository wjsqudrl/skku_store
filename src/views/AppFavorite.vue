<template>
  <div>
    <appbar :noshow="true"></appbar>
    <v-row>

      <v-col cols="12" style="padding:0px 0px 0px 0px;" class="black">
        <v-col :height="winHeight / 7 * 3" class="black">
          <topItemsHome v-if="show"></topItemsHome>
        </v-col>
      </v-col>

      <v-col cols="12" v-show="this.userProfile ? this.userProfile.data().latLng ? true : false :false">
        <card-list-small :arts="favoritesDocsToArray"></card-list-small>
      </v-col>
      
    </v-row>
  </div>
</template>

<script>
import appbar from '../components/appbar'
import topItemsHome from '../components/topItemsHome'
import { dbRead, dbQuery, appContents, dbUpdate} from '../firebase'
import { mapMutations, mapActions, mapGetters } from 'vuex'
import bus from '../utils/bus'
import cardListSmall from '../components/cardListSmall'

export default {
  name:'home',
  components: {
    appbar,
    topItemsHome,
    cardListSmall,
  },
  computed: {
    ...mapGetters({
      currentUser: 'getCurrentUser',
      userProfile: 'getUserProfile',
      favoritesDocsToArray: 'getFavoritesDocsToArray', //favorite.js
    }),
  },
  data() {
    return {
      show:true,
      winHeight:'',
    }
  },
  watch:{

  },
  async created(){
    this.$store.commit('changeNavBtnDisabled')
    await bus.$emit('start:spinner')
    this.winHeight =  window.innerHeight || document.body.clientHeight

    // if(!this.userProfile){
    //   alert('userProfile no')
    //   this.fetchUserProfile()
    // }

  },
  async activated(){
    let a = this.userProfile.data().latLng
    let b = this.userProfile.data().phoneNum
    console.log(a)
    console.log(typeof(a)==="undefined")
    // this.fetchUserProfile()
    if(typeof(a)==="undefined"||typeof(b)==="undefined"||b===""){//위치설정 안함
      await alert("업체의 위치와 번호를 설정해주세요")
    }else{//위치설정함
      if(this.currentUser){//로그인
        if(this.favoritesDocsToArray.length === 0){//업을시
          await this.fetchFavoritesDocsToArray(this.currentUser.uid)
        }
      }
    }
    
  },
  async mounted(){
    await bus.$emit('end:spinner')
    this.$store.commit('changeNavBtnDisabled')

  },
  methods:{
    ...mapActions({
        fetchUserProfile: 'fetchUserProfile',
        fetchFavoritesDocsToArray: 'fetchFavoritesDocsToArray', //favorite.js
      }),
  },
  
}
</script>

<style scoped>



</style>
