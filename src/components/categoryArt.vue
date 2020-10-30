<template>
    <div>
    <appbar :arrow="true">{{$route.params.category}}</appbar>
    <v-data-iterator
          :sort-by="sortBy.toLowerCase()"
          :sort-desc="sortDesc"
          class="black"
          style="margin-top:-20px"
          :items="filteredArray"
          :items-per-page.sync="footer.itemsPerPage"
          :page="footer.page"
          :search="$route.params.category"
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
          <!-- 풋터 끝 -->

        </v-data-iterator>
  </div>
</template>

<script>
import appbar from './appbar'
import { mapGetters, mapMutations} from 'vuex'
import cardList from './cardList'
import cardListSmall from './cardListSmall'
import bus from '../utils/bus.js';
import sortDialog from '../views/search/sortDialog'

export default {
  name:'categoryart',
  components: {
    sortDialog,
    appbar,
    cardList,
    cardListSmall,
  },
  data () {
    return {

      //검색창 변수
      sortDesc: false,
      
      // filter 선택 창 온 오프
      showFilter: false,
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
    // 결과 어레이 업데이트 하는 로직
    // 결과 어레이 업데이트 하는 로직
    filteredArray(){

      let arts = this.arts
      let result1 = arts.map(item => {
        return {
            ...item.data(),
            id:item.id,
          }
      })
      return result1
    },
    ...mapGetters({
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
  methods: {
    nextPage(){
      this.$store.commit('setUpFooter')
      window.scroll(0, 0)
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
      
    }),
    onScroll (e) {
      if (typeof window === 'undefined') return
      const top = window.pageYOffset ||   e.target.scrollTop || 0
      this.fab = top > 20
    },
    toTop () {
      this.$vuetify.goTo(0)
    },
    // 전부 지우기 버튼

  },
  async created(){
    await bus.$emit('start:spinner')
  },
  async mounted(){   
    await bus.$emit('end:spinner')
    //  
  },
}
</script>
