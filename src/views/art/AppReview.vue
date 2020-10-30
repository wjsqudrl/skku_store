<template>
<div>
<appbar :arrow="true">리뷰 게시글</appbar>

  <v-row>
    <!-- 메인 정보 시작 -->
    <v-col cols="12"> 
      <review-main :authorProfile="authorProfile" :isAuthor="isAuthor" :reviewDoc="authorDoc"></review-main>
    </v-col> 
    <!-- 메인 정보 끝 -->

    <!-- 상세 정보 시작 -->
    <v-col cols="12">
      <v-card flat>
        <v-card-title>
            내용
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
            {{ authorDoc ? authorDoc.data().content : null }}
        </v-card-text>
      </v-card>
    </v-col>
    <!-- 상세 정보 끝 -->

    <!-- 댓글 시작 -->
    <v-col cols="12"> 
      <comment :type="type"></comment> 
    </v-col>
    <!-- 댓글 끝 -->

    <!-- 상세 정보 시작 -->
    <!-- <v-col cols="12">
      <v-card flat>
        <v-card-title>
            원글
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-card flat @click="$router.push('/art/' + authorDoc.data().artId)">
            <v-img class="grey darken-4" :src="imgSrc"></v-img>

            <v-card-title>
              {{ rootArts ? rootArts.data().title : '' }}
            </v-card-title>
          </v-card>
          
          
        </v-card-text>
      </v-card>
    </v-col> -->
    <!-- 상세 정보 끝 -->

  </v-row>
  </div>
</template>

<script>
import appbar from '../../components/appbar'
import reviewMain from '../../components/reviewMain'
import artContent from '../../components/artContent'
import comment from '../../components/comment'
import { mapGetters, mapMutations, mapActions } from 'vuex'

import firebase from 'firebase/app'
import { reviews, userProfiles, storaged, dbRead } from '../../firebase.js';
import IsAuthor from '../../mixins/IsAuthor';
import bus from '../../utils/bus.js';

export default {
  mixins : [IsAuthor],
  components: {
    appbar,
    reviewMain,
    artContent,
    comment,
  },
  data(){
    return {
      type: 'review',
      forUser: false,
      authorDocType: 'review',
      rootArts: '',
      
    }
  },
  computed: {
    ...mapGetters({
      // init
      currentUser: 'getCurrentUser', // commons.js
      userProfile: 'getUserProfile', // commons.js

    }),
    imgSrc(){
      return this.rootArts ? this.rootArts.data().img[0].url : ''
    }
  },
  watch:{
    async authorDoc(){
      if(this.authorDoc){
        let a = await dbRead('arts', this.authorDoc.data().artId)
        this.rootArts = a
      }
    }
  },
  async created(){
    await bus.$emit('start:spinner')
  },
  async mounted() {
    await bus.$emit('end:spinner')
     
  },
  methods: {
    ...mapMutations({
      setWriteIdFromArt: 'setWriteIdFromArt', // reviewwrite.js
    }),
    ...mapActions({
      // 업데이트
      updateLatestTattoos: 'updateLatestTattoos',
      
      fetchArtAuthorEmail: 'fetchArtAuthorEmail',
      fetchArtAuthorUid: 'fetchArtAuthorUid',
      }),
  },
}
</script>

<style scoped>

</style>
