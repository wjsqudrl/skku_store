<template>
  <v-app>
    <v-row class="black">
      <v-tabs color="grey darken-5" grow> 
        <v-tab>타투</v-tab>
        <v-tab>리뷰</v-tab>
        <v-tab>캘린더</v-tab>
        
        <!-- 아티스트가 쓴 글 시작 -->
        <v-tab-item>
          <art-tab :authorArts="authorArts">
            <v-btn
              to="/artwrite/new"
              style="bottom: 160px; right: 15px;"
              fab
              fixed
              class="grey"
              v-show="isAuthor"
            >
              <v-icon>add</v-icon>
            </v-btn>
          </art-tab>
          
        </v-tab-item>
        <!-- 아티스트가 쓴 글 끝 -->

        <!-- 리뷰 시작 -->
        <v-tab-item>
          <review-tab :reviewsDocsToArray="reviewToMe"></review-tab>
        </v-tab-item>
        <!-- 리뷰 끝 -->

        <!-- 캘린더 시작 -->
        <v-tab-item>
          <calendar :isAuthor="isAuthor" :authorProfile="authorProfile"></calendar>
        </v-tab-item>
        <!-- 캘린더 끝 -->
      
      </v-tabs>
      </v-row>
      <v-row class="black">

      </v-row>

  </v-app>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import artTab from './artTab'
import reviewTab from './reviewTab'

import calendar from '../components/calendar'

export default {
  props:['isAuthor', 'authorArts', 'authorProfile'],
  data() {
    return {
    }
  },
  components: {
    calendar,
    artTab,
    reviewTab,
  },
  created() {
   this.fetchReviewToMe(this.$route.params.id) 
  },
  methods: {
    ...mapActions({
      fetchReviewToMe: 'fetchReviewToMe',
    }),
  },
  computed: {
    ...mapGetters({
      // 리뷰 어레이
      reviewToMe: 'getReviewToMe', // myreviews.js
    }),
  }

}
</script>

<style scoped>
</style>