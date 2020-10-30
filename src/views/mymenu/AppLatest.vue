<template>
  <div>
    <appbar :arrow="true">최근 본 작품</appbar>
      <pull-to
        :is-touch-sensitive="isTouchSensitive"
        :top-load-method="refresh"
        :bottom-load-method="bottomLoad"
        @top-state-change="stateChange"
        :topConfig="{ pullText:'', triggerText:'', loadingText:'', doneText:'' }"
        :bottom-config="{ pullText:'', triggerText:'', loadingText:'', doneText:'' }" 
        :is-bottom-keep-scroll="true"
      >
        <template v-if="circleShow" slot="top-block">
          <v-row align="center" justify="center">
            <v-col align="center" justify="center">
              <v-progress-circular
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
        <v-container>
          <v-row class="black">

            <v-col style="margin-bottom:0px;margin-top:0px;padding-top:0px;padding-bottom:0px" cols="12" align="right">
              <v-btn icon @click="changeGridNum">
                <v-icon>
                    {{ gridSix ? 'list' : 'border_all' }}
                </v-icon>
              </v-btn>
            </v-col> 
        
          </v-row>

          <!-- 카드시작 -->
          <div v-if="latestFilteredArray.length === 0">
            <v-card text >
              <v-card-text>
                <!-- 최근 본 타투가 없습니다. -->
              </v-card-text>
            </v-card>
          </div>
          <div v-else>
            <card-list v-if="gridSix" :arts="latestFilteredArraySorted"></card-list>
            <card-list-small v-else :arts="latestFilteredArraySorted"></card-list-small>  
          </div>
          <!-- 카드 끝 -->

        </v-container>
      </pull-to>
  </div>

</template>

<script>
import PullTo from 'vue-pull-to'
import appbar from '../../components/appbar'
import { mapGetters, mapMutations, mapActions } from 'vuex';
import { dbRead, dbQuery } from "../../firebase.js";
import cardList from '../../components/cardList'
import cardListSmall from '../../components/cardListSmall'
import bus from '../../utils/bus.js';
import { Capacitor, Plugins } from '@capacitor/core';
const { Device } = Plugins;

export default {
  name:'latest',
  components: {
    PullTo,
    appbar,
    cardList,
    cardListSmall,
  },
  data(){
    return {
      circleShow:false,
      isTouchSensitive:false,
      timeout:'',
      info:'',
      latestsDocsToArray: '',
      latestFilteredArray: [],
      createdAtLatest: [],
    }
  },
  computed: {
    latestFilteredArraySorted(){
      return this.latestFilteredArray.sort((t1,t2) => t1.createdAtLatest > t2.createdAtLatest ? -1 : 1).slice(0,20)
    },
    gridBtnStyle(){
      return  this.info.operatingSystem === 'ios' ? 'top: 105px; right: 15px;' : 'top: 90px; right: 15px;'
    },
    contentsShow(){
      return this.latestFilteredArray.length === '' ? false : true
    },
    ...mapGetters({
      top: 'getTop',
      prevTop: 'getPrevTop',
      gridSix: 'getGridSix',
      currentUser: 'getCurrentUser',
      arts: 'getArts',
    })
  },
  watch:{

    top(){
      if(this.$route.name === 'latest'){
      if(this.top === 0){
        this.isTouchSensitive = true
      }
      else{
        this.isTouchSensitive = false
      }

      }
    }

  },
  methods: {
      stateChange(state) {
        if (state === 'pull' || state === 'trigger') {
          this.circleShow = true
        } else if (state === 'loading') {
          this.circleShow = true
        } else if (state === 'loaded-done') {
          this.circleShow = false
        }
      },
    ...mapActions({
    // 좋아요 관련 로직

        fetchArts: 'fetchArts', // commons.js
        fetchFavoritesDocsToArray: 'fetchFavoritesDocsToArray', //favorite.js
    }),



    bottomLoad(loaded){

      this.circleShow = false
      this.isTouchSensitive = false
      loaded('done')
    },
    refresh(loaded) {
      this.circleShow = true
      this.forceUpdate()
      loaded('done')
      this.isTouchSensitive = false
    },

    async forceUpdate(){
    console.log('forceupdate')
    this.timeout = setTimeout(() => this.doForceUpdate(), 500);

    },
    async doForceUpdate(){
        await bus.$emit('start:spinner')
        this.$store.commit('changeNavBtnDisabled')
        if(this.$route.name === 'latest'){
          this.latestFilteredArray=[]
          await this.fetchArts()
          //내가본 latest
          this.latestsDocsToArray = await dbQuery('latests', 'userUid', '==', this.currentUser.uid)
          let artIdArrayWhichHaveUserLatests = await this.latestsDocsToArray
          .map(item => {
            return {id:item.data().artId, createdAt:item.data().createdAt}
          })
          // // arts에서 latest랑 겹치는 것만
          artIdArrayWhichHaveUserLatests.forEach(doc=>{
            this.arts.forEach(art=>{
              if(art.id===doc.id){
                this.latestFilteredArray.push({...art.data(), id:art.id, createdAtLatest:doc.createdAt })
              }
            })
          })

          }
        // await this.fetchFavoritesDocsToArray()
        await this.$forceUpdate();
        this.circleShow = false
        this.$store.commit('changeNavBtnDisabled')
        await bus.$emit('end:spinner')
    },
    ...mapMutations({
      changeShowTopSheet: 'changeShowTopSheet',
      changeGridNum: 'changeGridNum',
    }),
    toTop () {
      this.$vuetify.goTo(0)
    },
  },
  async created() {
    await bus.$emit('start:spinner')
    this.latestsDocsToArray = await dbQuery('latests', 'userUid', '==', this.currentUser.uid)
    let artIdArrayWhichHaveUserLatests = await this.latestsDocsToArray
    .map(item => {
      return {id:item.data().artId, createdAt:item.data().createdAt}
    })
    // arts에서 latest랑 겹치는 것만
    artIdArrayWhichHaveUserLatests.forEach(doc=>{
      this.arts.forEach(art=>{
        if(art.id === doc.id){
          this.latestFilteredArray.push({...art.data(), id:art.id, createdAtLatest:doc.createdAt })
        }
      })
    })
  },
  async mounted(){
    this.info = await Device.getInfo()
    await bus.$emit('end:spinner')
    //  
  },
}
</script>

<style scoped>

</style>
