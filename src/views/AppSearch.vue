<template>
<div>
        <appbar></appbar>

        <!-- 서치 부분 시작 -->
        <search-header class="black">
          <template v-slot:text-field>
            <v-text-field
              class="text-field"
              :style="searchStyle"
              background-color="#424242"
              v-model="search"
              append-icon="mdi-close-circle"
              @click:append="clearClickedList"
              flat
              hide-details
              solo
              prepend-inner-icon="search"
              label="검색"
              >
            </v-text-field>
          </template>
          <template v-slot:filter-button>
            <v-btn :style="searchStyle" icon>
              <v-icon v-if="!showFilter" @click.stop="showFilter=!showFilter" style="font-size:26px; color:#424242;">
              mdi-filter-outline
              </v-icon>
              <v-icon v-else @click.stop="showFilter=!showFilter" style="color:#424242;">
              mdi-filter-remove
              </v-icon>
            </v-btn>
            <v-btn style="color:#424242;" :style="searchStyle" icon v-if="afterFilter" @click="clearClickedList">
              <v-icon style="color:#424242;">refresh</v-icon>
            </v-btn>

          </template>
          <template v-slot:filter>
          </template>
        </search-header>

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
          <template v-if="circleShow" slot="bottom-block">
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
          <v-container>

            <v-data-iterator
              :sort-by="sortBy.toLowerCase()"
              :sort-desc="sortDesc"
              class="black"
              style="margin-top:-20px"
              :items="filteredArray"
              :items-per-page.sync="footer.itemsPerPage"
              :page="footer.page"
              :search="search"
              hide-default-footer
              >

              <!-- no-data 내용부분 시작 -->
              <template v-slot:no-data>
                <v-card elevation="12" height="100%">
                  <v-card-text>
                    데이터가 없습니다.
                  </v-card-text>
                </v-card>
              </template>
              <!-- no-data 내용부분 끝 -->

              <!-- 디폴트 내용부분 시작 -->
              <template v-slot:default="props">
                <v-row>
                  <!-- <v-col v-if="!isIos" cols="12"></v-col> -->
                  <!-- <v-col v-if="!isIos" cols="12"></v-col> -->

                  <v-col cols="6" align="left">
                    <sort-dialog @sortByChange="sortByChange"></sort-dialog>
                  </v-col>

                  <v-col style="margin-bottom:0px;margin-top:0px;padding-bottom:0px" cols="6" align="right">
                    <v-btn icon @click="changeGridNum">
                      <v-icon>
                          {{ gridSix ? 'list' : 'border_all' }}
                      </v-icon>
                    </v-btn>
                  </v-col>

                </v-row>
                <!-- 카드시작 -->
                  <card-list v-if="gridSix" :arts="props.items"></card-list>
                  <card-list-small v-else :arts="props.items"></card-list-small>
                <!-- 카드 끝 -->
              </template>
              <!-- 디폴트 내용 끝 -->

              <!-- no-results 내용부분 시작 -->
              <template v-slot:no-results>
                <v-card class="black" elevation="12" height="100%">
                  <v-card-text>
                    결과가 없습니다.
                  </v-card-text>
                </v-card>
              </template>
              <!-- no-results 내용부분 끝 -->

              <!-- 푸터 시작 -->
              <!-- <template v-slot:footer>
                <pagination @nextPage="nextPage" @formerPage="formerPage" :footer="footer" :filteredArray="filteredArray"></pagination>
              </template> -->
              <!-- 풋터 끝 -->

            </v-data-iterator>

            </v-container>
        </pull-to>

        <!-- 필터 부분 시작 -->
        <v-bottom-sheet v-model="showFilter" max-width="calc(100% - 0px)" scrollable inset>
          <template v-slot:activator="{ on }">
          
          </template>

          <v-card style="background-color:#1a1c1f">
            <v-card-title>
                검색 필터
                <v-spacer></v-spacer>
                <v-btn outlined v-if="filterCloseBtn" @click="showFilter=!showFilter">
                  닫기
                </v-btn>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
              <search-filter
                :filter="filter"
                >
              </search-filter>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-row>
              <v-col cols="4">
              <v-btn outlined block @click="clearClickedList" v-if="!filterCloseBtn" >
                <v-icon>refresh</v-icon>초기화
              </v-btn>
              </v-col>
              <v-col cols="8">
              <v-btn outlined block @click="showFilter=!showFilter" v-if="!filterCloseBtn" >
                검색된 타투 보기
              </v-btn>
              </v-col >
              </v-row>
            </v-card-actions>
          </v-card>

        <!-- 필터 부분 끝 -->
        </v-bottom-sheet>

          
  </div>
</template>

<script>
import PullTo from 'vue-pull-to'
import appbar from '../components/appbar'
import { mapGetters, mapMutations, mapActions } from 'vuex'
import searchHeader from './../components/searchHeader'
import searchFilter from './../components/searchFilter'
import cardList from './../components/cardList'
import cardListSmall from './../components/cardListSmall'
import pagination from './../components/pagination'
import bus from '../utils/bus.js';
import { Capacitor, Plugins } from '@capacitor/core';
const { Device } = Plugins;
import { dbRead, dbQuery } from '../firebase'
import sortDialog from './search/sortDialog'

export default {
  name:'search',
  components: {
    PullTo,
    sortDialog,
    appbar,
    searchHeader,
    searchFilter,
    cardList,
    pagination,
    cardListSmall,
  },
  data () {
    return {
      circleShow:false,
      isTouchSensitive: false,
      //검색창 변수
      search: '',
      sortDesc: false,
      
      // filter 선택 창 온 오프
      showFilter: false,
      searchStyle:'margin-top:0px',
      info:'',
      // 푸터 관련 변수


    }
  },
  computed: {
    isIos(){
      return this.info.operatingSystem === 'ios' ? true : false
    },
    gridBtnStyle(){
      return  this.info.operatingSystem === 'ios' ? 'top: 105px; right: 15px;' : 'top: 90px; right: 15px;'
    },
    afterFilter(){
      return this.search !== '' || this.search === [] || this.filter.locationSelected.length !== 0 || this.filter.genreClickedList.length !== 0 || this.filter.conceptClickedList.length !== 0 ||  this.filter.partClickedList.length !== 0
    },
    filterCloseBtn(){
      return this.clickedList.locationSelected.length === 0 && this.clickedList.tag.length ===0
    },
    // 결과 어레이 업데이트 하는 로직
    filteredArray(){
      let locationSelected = this.clickedList.locationSelected
      let tag = this.clickedList.tag
      let arts = this.arts
      
      //1. 장소 필터링
      let arr = []
      
      if(locationSelected !== ''){ // 어떤 장소가 선택됐다면,  
        arr.push(...arts.filter(item => {
        return item.data().location === locationSelected
      })) // arr에 특정 장소의 item들만 담기게 됨
      }else{
        arr = arts
      }
      // location === '모든장소' 면 arr에는 모든 아이템이 다 담김
      
      //2. hashtag 필터링
      let arr2 = []        
      arr2.push(...arr.filter(item =>{// 장소 조건에 만족하는 item이 담긴 arr중
        let cnt = 0
        for(var i in item.data().tag){ // 각각의 아이템별로, 태그 별로
          if(tag.includes(item.data().tag[i])){
            cnt += 1
          }
        }
        if(cnt === 0) { // 해당하는게 하나도 없으므로
          return false
        }
        return true
      }))

      let result1 = arr.map(item => {
        return {
            ...item.data(),
            id:item.id,
          }
      })
      let result2 = arr2.map(item => {
        return {
            ...item.data(),
            id:item.id,
          }
      })

      return tag.length === 0 ? result1 : result2
    },
    clickedList(){
      let result = {
        locationSelected:this.filter.locationSelected,
        tag:[
          ...this.filter.genreClickedList,
          ...this.filter.conceptClickedList,
          ...this.filter.partClickedList
          ]
        }
      return result
    },

    ...mapGetters({
      bottomOfWindow: 'getBottomOfWindow',
      top: 'getTop',
      prevTop: 'getPrevTop',
      gridSix: 'getGridSix',
      // commons 변수들 초기화
      arts: 'getArts', // commons.js
      // 정해진 메뉴들
      locations: 'getLocations', // search.js
      
      genres: 'getGenres',
      concepts: 'getConcepts',
      parts: 'getParts',
      sortBy:'getSortBy',

      currentUser: 'getCurrentUser',
      footer: 'getFooter',
      filter: 'getFilter',
      globalSearch: 'getGlobalSearch',

      
    }),
  },
  watch:{
    top(){
      if(this.$route.name === 'search'){
        if(this.top === 0){
          this.isTouchSensitive = true
        }
        else{
          this.isTouchSensitive = false
        }
      }
    },
    bottomOfWindow(){
      if(this.bottomOfWindow){
        this.isTouchSensitive = true
      }
    },
    search(){
      // console.log(this.search)
      this.$store.commit('setGlobalSearch', this.search)
    },
  },
  methods: {

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
      this.circleShow = true
      this.setFooteritemsPerPage()
      this.isTouchSensitive = false
      loaded('done')
    },
    refresh(loaded) {

      this.circleShow = true
      this.forceUpdate()
      this.isTouchSensitive = false
      loaded('done')
    },
    async forceUpdate(){
        console.log('forceupdate')
        this.$store.commit('changeNavBtnDisabled')
        
        this.timeout = setTimeout(() => this.doForceUpdate(), 800);
        this.$store.commit('changeNavBtnDisabled')
    },
    async doForceUpdate(){
        await bus.$emit('start:spinner')
        
        if(this.$route.name === 'search'){
          await this.fetchArts()
        }
        // await this.fetchFavoritesDocsToArray()
        await this.$forceUpdate();

        this.circleShow = false
        this.show = true
        await bus.$emit('end:spinner')
    },

    checkScrollToBottom () {
      window.onscroll = () => {
        let bottomOfWindow = Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop) + window.innerHeight === document.documentElement.offsetHeight
        this.setBottomOfWindow(bottomOfWindow)
        
      }
    },
    forceUpdateSearch(){
      this.setFooteritemsPerPage()
      //this.$forceUpdate()
    },
    ...mapActions({
        fetchArts: 'fetchArts', // commons.js
        fetchFavoritesDocsToArray: 'fetchFavoritesDocsToArray',
      }),
    nextPage(){
      this.$store.commit('setUpFooter')
      window.scroll(0, 1)
    },
    formerPage(){
      this.$store.commit('setDownFooter')
    },
    sortByChange(sortBy){
      // console.log(sortBy)
      this.$store.commit('setSortBy', sortBy)
      if(sortBy === 'createdAt'){
        this.sortDesc = false
      }else if(sortBy === 'hits'){
        this.sortDesc = true
      }else if(sortBy === 'price'){
        this.sortDesc = false
      }
      
    },
    ...mapMutations({
      changeGridNum: 'changeGridNum',
      setGlobalSearch: 'setGlobalSearch',
      setFooteritemsPerPage: 'setFooteritemsPerPage',
      setBottomOfWindow: 'setBottomOfWindow',
      
    }),
    // 전부 지우기 버튼
    clearClickedList() {
      this.search = ''
      this.filter.locationSelected = ''
      this.filter.genreClickedList = []
      this.filter.conceptClickedList = []
      this.filter.partClickedList = []    
    },
  },
  async created(){
    await bus.$emit('start:spinner')
    this.$store.commit('prevTopZero')
  },
  async mounted(){
    this.checkScrollToBottom()
    this.info = await Device.getInfo()
    this.searchStyle = this.info.operatingSystem === 'ios' ? 'margin-top:40px' : 'margin-top:0px'
    
    if(this.$route.params.keyword !== 'all'){
      this.$store.commit('setGlobalSearch', this.$route.params.keyword)
    }
    this.search = this.globalSearch

    await bus.$emit('end:spinner')
    // 
  },
}
</script>

<style scoped>
.gridBtn.v-btn.v-btn--contained.v-btn--fixed.theme--dark.v-size--default {
    top: 50px;
    background-color:red;
}
/* 검색창 안에 글씨 */
.theme--dark.v-label {
    color: #757575;
    font-weight: 600;
}

/* 검색창안에 검색 초기화 아이콘 색 */
.text-field .v-icon{
    color:#757575;
}
/* 검색창 */
.v-text-field--rounded > .v-input__control > .v-input__slot {
    border-color: #968787;
    /* border-color: #851b1b; */
    padding-top: 0px !important;
    padding-right: 10px !important;
    padding-bottom: 0px !important;
    padding-left: 10px !important;
}
/* 필터버튼  */
.v-input__slot{
    /* width:19.5rem; */
}
.position {
  position: fixed;
  top: 0;
  left: 0;
  width: 80px;
  height: 80px;
  line-height: 80px;
  font-weight: 700;
  background-color: red;
  z-index: 9;
}

</style>