<template>
  <div>
    <appbar :noshow="true"></appbar>
    <pull-to
    style="padding:0px;margin:0px"
    :is-touch-sensitive="isTouchSensitive"
    :top-load-method="refresh"
    :bottom-load-method="bottomLoad"
    @top-state-change="stateChange"
    :topConfig="{ pullText:'', triggerText:'', loadingText:'', doneText:'' }">
      <template v-if="circleShow" slot="top-block">
        <v-row align="center" justify="center">
          <v-col align="center" justify="center">
            <v-progress-circular
                style="z-index:9999"
                :indeterminate="true"
                :rotate="4"
                :size="28"
                :value="0"
                :width="4"
                dark
                >
            </v-progress-circular>
          </v-col>
        </v-row>
      </template>
      <v-container style="padding:0px;margin:0px;">
        <v-row>
          
          <v-col cols="12" style="padding:0px 0px 0px 0px;" class="black">
            <v-col :height="winHeight / 7 * 3" class="black">
              <topItemsHome v-if="show"></topItemsHome>
            </v-col>
          </v-col>

          <!-- 카테고리 -->
          <!-- <v-col cols="12" style="padding:0px 0px 0px 0px;" class="black">
            <artSwipeCategory :num="0.5">
            </artSwipeCategory>
          </v-col> -->

          <!-- <v-col cols="12" class="black">
            <v-sheet height="40px" class="black"></v-sheet>
          </v-col> -->

          <!-- 최신작품 -->
          <v-col cols="12" style="padding:0px 0px 0px 0px;" class="black">
            <artSwipeNew v-if="show" :num="2.6">
            </artSwipeNew>
          </v-col>

          <v-col cols="12" class="black">
            <v-sheet height="30px" class="black"></v-sheet>
          </v-col>

          <!-- 트렌디 타투 -->
          <!-- <v-col cols="12" style="padding:0px 0px 0px 0px;" class="black">
            <artSwipeNewArtist v-if="show" :num="2.6">
            </artSwipeNewArtist>
          </v-col> -->

          <!-- <v-col cols="12" class="black">
            <v-sheet height="10px" class="black"></v-sheet>
          </v-col> -->

          <!-- <v-col cols="12" style="padding:0px 0px 0px 0px;" class="black">
            <artSwipeSearch :num="0.8">
            </artSwipeSearch>
          </v-col> -->
        
          <!-- <div v-if="eventArtistShow">
            <event-artist :eventImg="eventImg" :eventArtistShow="eventArtistShow"></event-artist>
          </div> -->

        </v-row>
      </v-container>
    </pull-to>
  </div>
</template>

<script>
import PullTo from 'vue-pull-to'
import appbar from '../components/appbar'
import topItemsHome from '../components/topItemsHome'
import artSwipeNew from '../components/artSwipeNew'
import eventArtist from '../components/eventArtist'
import { dbRead, dbQuery, appContents, dbUpdate} from '../firebase'
import { mapMutations, mapActions, mapGetters } from 'vuex'
import bus from '../utils/bus'


export default {
  name:'home',
  components: {
    appbar,
    topItemsHome,
    artSwipeNew,
    eventArtist,
    PullTo
  },
  computed: {
    ...mapGetters({
      top: 'getTop',
      prevTop: 'getPrevTop',
      currentUser: 'getCurrentUser',
      userProfile: 'getUserProfile',
      arts: 'getArts', // commons.js
      img: 'getImg',
      css: 'getCss',
      // 좋아요 관련 변수
      favoritesDocsToArray: 'getFavoritesDocsToArray', //favorite.js
      eventImg: 'getEventImg',
      showEvent: 'getShowEvent',
      artsItems: 'getArtsItems'
    }),
    eventArtistShow(){
      let a = this.userProfile ? this.userProfile.data().isArtist && (this.userProfile.data().eventPopupOn || this.userProfile.data().eventPopupOn === undefined) : false
      return a

    }
  },
  data() {
    return {
      circleShow:false,
      isTouchSensitive:false,
      timeout:'',
      show:true,
      firstLoad2:true,
      winHeight:'',
      allLoaded: false,
      swiperOptionTop: {
        slidesPerView: '1',
        spaceBetween: 2,
        effect: 'fade',
        speed: 1000,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
          dynamicBullets: true
        },
      },
      swiperOption: {
        slidesPerView: '1',
        centeredSlides: false,
        effect: 'fade',
        spaceBetween: 2,
        speed: 1000,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            dynamicBullets: true
        }
      },
      swiperOptionItem: {
        slidesPerView: '5',
        spaceBetween: 2,
        effect: 'fade',
        speed: 1000,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
          dynamicBullets: true
        },
      },


    }
  },
  watch:{
    top(){
      if(this.$route.name === 'home'){
      if(this.top === 0){
        this.isTouchSensitive = true
      }
      else{
        this.isTouchSensitive = false
      }

      }
    }

  },
  async created(){
    this.$store.commit('changeNavBtnDisabled')
    await bus.$emit('start:spinner')
    this.winHeight =  window.innerHeight || document.body.clientHeight

    if(!this.userProfile){
      alert('userProfile no')
      this.fetchUserProfile()
    }


    if(!this.artsItems){
      alert('artsItems no')
      this.fetchArts()
    }

  },
  async mounted(){
    // alert('start')
    if(this.currentUser){
      if(this.favoritesDocsToArray.length === 0){
        await this.fetchFavoritesDocsToArray(this.currentUser.uid)
      }
    }
    
    // event popup 관련 로직
    if(this.eventImg === ''){
      await this.$store.dispatch('fetchEventImg')
    }

    // if(this.eventImg.data().home.eventImg.customer !== ''){
    //   this.eventArtistSheet = true
    // }
    

    await bus.$emit('end:spinner')
    this.$store.commit('changeNavBtnDisabled')
    // 
    // alert('end')
    // console.log(this.arts[0].data())
    // displayName: a.data().displayName, thumbAvatar:a.data().thumbAvatar
  },
  methods:{

      stateChange(state) {
        if (state === 'trigger') {
          this.circleShow = true
        } else if (state === 'pull') {
          this.circleShow = true
        } else if (state === 'loading') {
          this.circleShow = true
        } else if (state === 'loaded-done') {
          this.circleShow = false
        }
      },
    bottomLoad(loaded){
      this.circleShow = false
      this.isTouchSensitive = false
      loaded('done')
    },
    refresh(loaded) {
       this.forceUpdate()
       loaded('done')
       this.isTouchSensitive = false
      },
    ...mapMutations({
      changeShowTopSheet: 'changeShowTopSheet',
    }),
    async forceUpdate(){
        console.log('forceupdate')
        this.$store.commit('changeNavBtnDisabled')
        
        this.timeout = setTimeout(() => this.doForceUpdate(), 800);
        this.$store.commit('changeNavBtnDisabled')
    },
    async doForceUpdate(){
        await bus.$emit('start:spinner')
        
        if(this.$route.name === 'home'){
          await this.fetchArts()
          this.show = false
           
        }
        // await this.fetchFavoritesDocsToArray()
        await this.$forceUpdate();
        this.changeShowTopSheet(false)
        this.show = true
        await bus.$emit('end:spinner')
    },
    ...mapActions({
        fetchUserProfile: 'fetchUserProfile',
        fetchArts: 'fetchArts', // commons.js
        fetchImg: 'fetchImg',
        fetchCss: 'fetchCss',
        fetchText: 'fetchText',
        fetchFavoritesDocsToArray: 'fetchFavoritesDocsToArray', //favorite.js
      }),

  },
  

}
</script>

<style scoped>



</style>
