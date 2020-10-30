<template>
  <v-app class="black">
    <appbar :arrow="true">{{ authorProfile ? authorProfile.data().displayName : null }}</appbar>

    <v-tabs v-show="getFollowersCompleted && getFollowingsCompleted" color="grey darken-5" grow>
      <v-tab>팔로워</v-tab>
      <v-tab ref="tab2">팔로잉</v-tab>

      <v-tab-item>
        <v-row> 
          <v-col cols="12"  v-if="Followers.length === 0 && !getFollowersCompleted">
            <v-card elevation="12" height="100%">
              <v-card-text>
                팔로워가 없습니다.
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-data-iterator
              :items="Followers"
              :items-per-page.sync="itemsPerPage"
              :page="page"
              :search="search1"
              hide-default-footer
            >
              <!-- 헤더부분 시작 -->
              <template v-slot:header>
                <v-toolbar dense flat >
                  <v-row align="center" justify="center" >
                    <v-col align="center" justify="center">
                      <v-text-field
                        background-color="transparent"
                        dense
                        v-model="search1"
                        clearable
                        flat
                        outlined
                        rounded
                        hide-details
                        prepend-inner-icon="search"
                        label="검색">
                      </v-text-field>              
                    </v-col>
                  </v-row>
                </v-toolbar>
              </template>
              <!-- 헤더 끝 -->
                
              <!-- 내용부분 시작 -->
              <template v-slot:default="props">
              <!-- 카드시작 -->
                <v-row>
                  <v-col cols ="12">
                    <v-card text flat v-for="item in Followers" :key="item.displayname">
                      <v-row align="center">
                        <v-col cols="3" align="end"  @click="$router.push('/artist/' + item.uid)">
                          <v-avatar v-if="item.userAvatarUrl">
                              <img :src= "item.thumbAvatar ? item.thumbAvatar : item.userAvatarUrl" >
                          </v-avatar>
                          <v-avatar v-else :color="item.nickNameColor ? item.nickNameColor : null">
                            <span class="white--text headline">{{item.displayname ? item.displayname.substring(0,1) : "TU" }}</span>
                          </v-avatar>
                        </v-col>
                        <v-col cols="5" align="start" @click="$router.push('/artist/' + item.uid)">
                          {{item.displayname}}
                        </v-col>
                        <v-col v-if="item.uid !== userProfile.data().uid" cols="3" align="end" >
                          <artistFollowBtn :item ="item"></artistFollowBtn>
                        </v-col>
                        <v-col v-else cols="3" align="end" @click="$router.push('/artist/' + item.uid)">
                        </v-col>                                
                      </v-row>
                    </v-card>
                  </v-col>
                </v-row>
              <!-- 카드 끝 -->
              </template>
              <!-- 내용 끝 -->
              <!-- 푸터 시작 -->
              <template v-slot:footer>
                <v-row align="center" justify="center">
                  <v-col cols="12" align="center" justify="center">
                  페이지: {{ page }} / {{ numberOfPagesForFollowers }}
                  </v-col>
                  <v-col cols="12" align="center" justify="center">
                    <v-btn outlined fab x-small @click="formerPage()" >
                        <v-icon>keyboard_arrow_left</v-icon>
                    </v-btn>
                    <v-btn outlined fab x-small @click="nextPage(numberOfPagesForFollowers)" >
                        <v-icon>keyboard_arrow_right</v-icon>
                    </v-btn>
                  </v-col>
                </v-row>
              
              </template>
                <!-- 풋터 끝 -->
            </v-data-iterator>
          </v-col>
        </v-row>
      </v-tab-item>
      
      <v-tab-item>
        <v-row v-if="Followings.length === 0 && !getFollowingsCompleted">
          <v-col cols="12">
            <v-card elevation="12" height="100%">
              <v-card-text>
                팔로잉이 없습니다.
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-data-iterator
              :items="Followings"
              :items-per-page.sync="itemsPerPage"
              :page="page"
              :search="search2"
              hide-default-footer
            >
              <!-- 헤더부분 시작 -->
              <template v-slot:header>
                <v-toolbar dense flat >
                  <v-row align="center" justify="center" >
                    <v-col align="center" justify="center">
                      <v-text-field
                        background-color="transparent"
                        dense
                        v-model="search2"
                        clearable
                        flat
                        outlined
                        rounded
                        hide-details
                        prepend-inner-icon="search"
                        label="검색">
                        
                      </v-text-field>              
                    </v-col>
                  </v-row>
                </v-toolbar>
              </template>
              <!-- 헤더 끝 -->

              <!-- 내용부분 시작 -->
              <template v-slot:default="props">
              <!-- 카드시작 -->
                <v-row>          
                  <v-col cols ="12">
                    <v-card text flat v-for="item in Followings" :key="item.displayname">
                      <v-row align="center">
                        <v-col cols="3" align="end"  @click="$router.push('/artist/' + item.uid)">
                          <v-avatar v-if="item.userAvatarUrl">
                              <img :src= "item.thumbAvatar ? item.thumbAvatar : item.userAvatarUrl" >
                          </v-avatar>
                          <v-avatar v-else :color="item.nickNameColor ? item.nickNameColor : null">
                            <span class="white--text headline">{{item.displayname ? item.displayname.substring(0,1) : "TU" }}</span>
                          </v-avatar>
                        </v-col>
                        <v-col cols="5" align="start" @click="$router.push('/artist/' + item.uid)">
                          {{item.displayname}}
                        </v-col>                      
                        <v-col v-if="item.uid !== userProfile.data().uid" cols="3" align="end" >
                          <artistFollowBtn :item ="item"></artistFollowBtn>
                        </v-col>
                        <v-col v-else cols="3" align="end" @click="$router.push('/artist/' + item.uid)">
                        </v-col>
                      </v-row>
                    </v-card>
                  </v-col>  
                </v-row>
              <!-- 카드 끝 -->
              </template>
              <!-- 내용 끝 -->
              <!-- 푸터 시작 -->
              <template v-slot:footer>
                <v-row align="center" justify="center">
                  <v-col cols="12" align="center" justify="center">
                  페이지: {{ page }} / {{ numberOfPagesForFollowings}}
                  </v-col>
                  <v-col cols="12" align="center" justify="center">
                    <v-btn outlined fab x-small @click="formerPage()" >
                        <v-icon>keyboard_arrow_left</v-icon>
                    </v-btn>
                    <v-btn outlined fab x-small @click="nextPage(numberOfPagesForFollowings)" >
                        <v-icon>keyboard_arrow_right</v-icon>
                    </v-btn>
                  </v-col>
                </v-row>
              </template>
              <!-- 풋터 끝 -->
            </v-data-iterator>
          </v-col>
        </v-row>
      </v-tab-item>
    </v-tabs>
  </v-app>
</template>

<script>
import appbar from '../../components/appbar'
import firebase from 'firebase/app'
import { mapGetters, mapMutations, mapActions } from 'vuex'
import { userProfiles, dbRead } from '../../firebase.js';
import { follows, dbQuery, dbWrite} from '../../firebase.js';
import artistFollowBtn from '../../components/AppArtist/artistFollowBtn.vue'
import bus from '../../utils/bus.js';
import IsAuthor from '../../mixins/IsAuthor'

export default {
  mixins : [IsAuthor],
  components: {
    artistFollowBtn,
    appbar
  },
  data(){
    return {
        authorDocType: 'mypage',
        Followers: [],
        Followings: [],
        getFollowersCompleted: false,
        getFollowingsCompleted: false,
        //검색창 변수
        search1: '',
        search2: '',

        // 푸터 관련 변수
        page: 1,
        itemsPerPage: 10,
    }
  },
  computed: {
    ...mapGetters({
        tab: 'getTab',
        userProfile: 'getUserProfile',
    }),
    // 푸터 관련 변수
    numberOfPagesForFollowings() {
        return Math.ceil(this.Followings.length / this.itemsPerPage)
    },
    numberOfPagesForFollowers() {
        return Math.ceil(this.Followers.length / this.itemsPerPage)
    },
  },
  methods: {
    ...mapMutations({
    }),
    // 푸터 관련 로직
    nextPage (item) {
      if (this.page + 1 <= item) this.page += 1
    },
    formerPage () {
      if (this.page - 1 >= 1) this.page -= 1
    },
    async getFollowings(){
      let followingListFromArtist = await dbQuery('follows',"from","==", this.$route.params.id)
      // console.log(followingListFromArtist)
      await followingListFromArtist.forEach(item =>{
        this.setFollowings(item)
      })
      this.getFollowingsCompleted = true
    },
    async setFollowings(item){
      let isFollowedByCurrentUser =[]
      let isFollowedByCurrentUserDocId=[]
      let followingListFromCurrentUser = await dbQuery("follows", "from", "==", this.userProfile.data().uid,"to", "==", item.data().to)
      await followingListFromCurrentUser.forEach(isfollow=>{
        isFollowedByCurrentUser.push(isfollow)
        isFollowedByCurrentUserDocId.push(isfollow.id)
      })
      let userProfile = await dbQuery('userProfiles',"uid", "==", item.data().to)
      await userProfile.forEach(profile =>{
        this.Followings.push({
          "thumbAvatar":profile.data().thumbAvatar,
          "nickNameColor": profile.data().nickNameColor,
          'uid' : profile.data().uid,
          'displayname' : profile.data().displayName,
          'userAvatarUrl' : profile.data().userAvatarUrl,
          'isFollowedByCurrentUser' : isFollowedByCurrentUser.length,
          'isFollowedByCurrentUserDocId' : isFollowedByCurrentUserDocId[0]
        })
      })
    },
    async getFollowers(){
      let followingListFromArtist = await dbQuery('follows',"to","==", this.$route.params.id)
      await followingListFromArtist.forEach(item =>{
        this.setFollowers(item)
      })
      this.getFollowersCompleted = true
    },
    async setFollowers(item){
      this.$store.commit('changeNavBtnDisabled')
      let isFollowedByCurrentUser =[]
      let isFollowedByCurrentUserDocId=[]
      let followingListFromCurrentUser = await dbQuery("follows", "from", "==", this.userProfile.data().uid,"to", "==", item.data().from)
      await followingListFromCurrentUser.forEach(isfollow=>{
        isFollowedByCurrentUser.push(isfollow)
        isFollowedByCurrentUserDocId.push(isfollow.id)
      })
      let userProfile = await dbQuery('userProfiles',"uid", "==", item.data().from)
      console.log("setFollowers")
      // console.log(userProfile)
      await userProfile.forEach(profile =>{
        
        this.Followers.push({
          "thumbAvatar":profile.data().thumbAvatar,
          "nickNameColor": profile.data().nickNameColor,
          'uid' : profile.data().uid,
          'displayname' : profile.data().displayName,
          'userAvatarUrl' : profile.data().userAvatarUrl,
          'isFollowedByCurrentUser' : isFollowedByCurrentUser.length,
          'isFollowedByCurrentUserDocId' : isFollowedByCurrentUserDocId[0]
        })
      })
    this.$store.commit('changeNavBtnDisabled')
    },
    
  },
  async mounted(){
    if(this.tab === 'tab2'){ // 만약에 마이메뉴에서 팔로잉을 눌러서 내부변수 tab이 tab2면
          this.$refs.tab2.$el.click() // tab2를 클릭해라
    }
     
    await bus.$emit('end:spinner')
  },
  async created(){
    await bus.$emit('start:spinner')
    await this.getFollowings()
    await this.getFollowers()
    // await bus.$emit('end:spinner')
  },
  async beforeDestroy(){

  }
}
</script>

<style scoped>

</style>
