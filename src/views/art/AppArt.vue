<template>
<div id="app">
  <appbar style="z-index:9998" :arrow="true">게시물</appbar>
    <v-row v-show="authorDoc === '' && authorProfile === '' ? false : true"> 
      <!-- 메인 정보 시작 -->
      <v-col cols="12">
        <art-main :authorProfile="authorProfile" :isAuthor="isAuthor" :artDoc="authorDoc"></art-main>
      </v-col>
      <!-- 메인 정보 끝 -->

      <v-col cols="12">
        <consult-btn :artUid="this.$route.params.writeId" :userProfile="userProfile" :authorProfile="authorProfile"></consult-btn>
      </v-col>

      <!-- 컨텐츠 정보 시작 -->
      <v-col cols="12">
        <art-content :item="authorDoc"></art-content> 
      </v-col>
      <!-- 컨텐츠 정보 끝 -->
 
      <!-- 상세 정보 시작 -->
      <v-col cols="12">
        <art-detail :item="authorDoc"></art-detail> 
      </v-col>
      <!-- 상세 정보 끝 -->

      <v-col cols="12" align="center" v-if="isMap">
        <map-component :authorProfile="authorProfile" :disabled="true" :isBtn="false"></map-component>
      </v-col>

      <!-- 댓글 시작 -->
      <v-col cols="12">
        <comment :type="type"></comment> 
      </v-col>
      <!-- 댓글 끝 -->
      
      <!-- 리뷰 시작 -->
      <v-col cols="12" v-if="reviews && meanRate">
        <v-card flat>
          <v-card-title>
            평점
            <v-spacer></v-spacer>
            <v-icon style="margin-right:8px">stars</v-icon>
            {{ meanRate }}
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text align="center">
            <v-rating background-color="grey" color="yellow" half-increments x-large :value="meanRate" readonly ></v-rating>              
          </v-card-text>
        </v-card>
        
      </v-col>
      <!-- 리뷰 끝 -->

      <!-- 리뷰 시작 -->
      <v-col cols="12" v-if="reviews">
        <review-list :reviews="reviews"></review-list>
      </v-col>
      <!-- 리뷰 끝 -->


      <art-tab v-if="authorArts.length !== 0" type="art" :authorArts="authorArts" :authorProfile="authorProfile" ></art-tab>

    </v-row>

    </div>
</template>

<script>
import appbar from '../../components/appbar'
import artMain from '../../components/artMain'
import artDetail from '../../components/artDetail'
import artContent from '../../components/artContent'
import comment from '../../components/comment'
import reviewList from '../../components/reviewList'
import artTab from '../../components/artTab'

import consultBtn from '../../components/consultBtn'

import { mapGetters, mapMutations, mapActions } from 'vuex'

import firebase from 'firebase/app'
import { storage, arts, userProfiles, dbDelete, dbQuery } from '../../firebase.js';
import bus from '../../utils/bus.js';
import IsAuthor from '../../mixins/IsAuthor';
import mapComponent from '../../components/mapComponent'

export default {
  name:'art',
  mixins : [IsAuthor],
  components:{
    mapComponent,
    appbar,
    artMain,
    artDetail,
    artContent,
    comment,
    reviewList,
    consultBtn,
    artTab
  },
  data(){
    return {
      type: 'art',
      authorDocType: 'art', 
      // 글 내용 초기화

      // 리뷰 관련 변수
      reviews: [],

      
      userFavoriteTattoos: [],
      userId: '',

      authorArts:[],
    }
  },
  computed: {
    meanRate(){
        let a = []
        this.reviews.filter(item => {
            a.push(item.data().rating)
        })
        const average = arr => arr.reduce( ( p, c ) => p + c, 0 ) / arr.length;
        return Math.round(average(a)*10)/10
    },
    isMap(){
      return this.authorProfile ? this.authorProfile.data().latLng ? true : false : false
    },
    ...mapGetters({
      // init
      currentUser: 'getCurrentUser', // commons.js
      userProfile: 'getUserProfile', // commons.js
      
      // 좋아요 관련 변수
      favoritesDocsToArray: 'getFavoritesDocsToArray', //favorite.js

    }),
  },
  async created(){
    await bus.$emit('start:spinner')
    

 },
  async mounted() {
    this.$store.commit('changeNavBtnDisabled')
    if(this.currentUser !== null){
    //update
    let qeurySnapshot = await this.$db.collection('latests').where('userUid', '==', this.userProfile.id)
    .where('artId', '==', this.$route.params.writeId).get()
    let docs = []
    qeurySnapshot.forEach(doc => {
      docs.push(doc)
    })
    
    if(docs.length === 1){
      await this.$db.collection('latests').doc(docs[0].id).delete()
    }

    await this.$db.collection('latests').add({
            userUid: this.userProfile.id,
            artId: this.$route.params.writeId,
            createdAt: new Date()
        }).then(res => {
        }).catch(res => {
        })
    this.$store.commit('changeNavBtnDisabled')
    }  

    // 좋아요 관련 로직
    if(this.currentUser !== null){
      await this.fetchFavoritesDocsToArray(this.currentUser.uid) // favorite.js
    }

    let querySnapshot = await dbQuery('reviews', 'artId', '==', this.$route.params.writeId)
    querySnapshot.forEach(doc => {
      this.reviews.push(doc)
      })
    this.reviews = this.reviews.sort((t1,t2) => t1.data().createdAt > t2.data().createdAt ? -1 : 1)

    await this.setAuthorArts()
    await bus.$emit('end:spinner')
     
  },
  methods: {
    async setAuthorArts(){
            let querySnapshot = await dbQuery('arts','authorUid', '==', this.authorProfile.data().uid)
            
            querySnapshot.forEach(item => {
              let url = item.data().thumbArtMyPage ? item.data().thumbArtMyPage[0].url : item.data().img[0].url
              this.authorArts.push({ 
                      'fileName':item.data().img[0].name,
                      'url': url,
                      'id': item.id,
                      'createdAt': item.data().createdAt
              })
            })
    },
    ...mapActions({
      // fetchArtListDocsToArray: 'fetchArtListDocsToArray',
      // 좋아요 관련 로직
      fetchFavoritesDocsToArray: 'fetchFavoritesDocsToArray', //favorite.js
      }),
  },
}
</script>

<style scoped>

</style>
