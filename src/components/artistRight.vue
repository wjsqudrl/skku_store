<template>
  <v-row justify="center" align="center">
    <v-col cols="4" justify="center" align="center">
      <div class="font-weight-bold" v-if="!isNaN(meanRate)">
        {{meanRate}}
      </div>
      <div class="font-weight-bold" v-else>
        0
      </div>
      <div >
        평점
      </div>
    </v-col>
    <v-col cols="4" justify="center" align="center" @click="$router.push('/follow/' + authorProfile.data().uid); setTab('tab1')">
        <div class="font-weight-bold">
            {{followers.length}} 
        </div>
        <div>
            팔로워
        </div>
    </v-col>

    <v-col cols="4" justify="center" align="center" @click="$router.push('/follow/' + authorProfile.data().uid); setTab('tab2')">
        <div class="font-weight-bold">
          {{followings.length}}
        </div>
        <div>
          팔로잉
        </div>
    </v-col>
  </v-row>
        
</template>



<script>
import { mapGetters, mapMutations } from 'vuex'
import { follows } from '../firebase.js';
import { dbQuery } from '../firebase.js'

export default {
  props: ['authorProfile', 'authorArts','meanRate'],
  data() {
    return {
      followings: [],
      followers: [],
    }
  },
  methods: {
    ...mapMutations({
      // 팔로워, 팔로잉 넘어갈때 로직
      setTab: 'setTab', // follow.js
    }),
    async getFollowings(){
      let followingListFromArtist = await dbQuery('follows',"from","==", this.$route.params.id)
      followingListFromArtist.forEach(item =>{
        this.followings.push(item)
      })
    },
    async getFollowers(){
      let followers = []
      let followingListFromArtist = await dbQuery('follows',"to","==", this.$route.params.id)
      followingListFromArtist.forEach(item =>{
        this.followers.push(item)
      })
    },
  },
  created() {
    this.getFollowings()
    this.getFollowers()    
  },
}
</script>

<style>

</style>
