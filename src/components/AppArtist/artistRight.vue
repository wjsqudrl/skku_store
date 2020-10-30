<template>
  <!-- <v-app>
    <v-content> -->
      <v-row align="center">
        <v-col cols="3" align="center">
            <v-col class="font-weight-bold">
              {{ authorTattoos.length }}
              <!-- {{authorProfile.data()}} -->
            </v-col>
            <v-col>
            게시물
            </v-col>
        </v-col>


        <v-col cols="3" align="center" @click="$router.push('/follow/' +  authorProfile.data().uid); setTab('tab1')">
            <v-col class="font-weight-bold">
                10
            </v-col>
            <v-col>
                팔로워
            </v-col>
        </v-col>

        <v-col cols="3" align="center" @click="$router.push('/follow/' +  authorProfile.data().uid); setTab('tab2')">
            <v-col class="font-weight-bold">
              45
            </v-col>
            <v-col>
              팔로잉
            </v-col>
        </v-col>
      </v-row>
    <!-- </v-content>
  </v-app> -->
</template>



<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  props : ["authorProfile"],
  computed: {
    ...mapGetters({
      // 페이지 저자의 정보들 
      authorTattoos: 'getAuthorTattoos', // artist.js
    }),
  },
  methods: {
    ...mapMutations({
      // 팔로워, 팔로잉 넘어갈때 로직
      setTab: 'setTab', // follow.js
    }),
    ...mapActions({
      fetchAuthorTattoos: 'fetchAuthorTattoos',
      fetchReviewsDocsToArray: 'fetchReviewsDocsToArray',
    }),
  },
  data() {
    return {

    }
  },
  created(){
    
  },
  async mounted(){
    await this.fetchAuthorTattoos(this.$route.params.id) // artist.js
  }
}
</script>

<style>

</style>
