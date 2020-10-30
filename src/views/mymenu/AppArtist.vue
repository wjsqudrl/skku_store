<template>
  <v-app>
<!--  v-if="authorProfile ? authorProfile.data().isArtist === true ? true : false : false" -->
    <appbar :arrow="true">{{ authorProfile ? authorProfile.data().displayName : null }}</appbar>

      <v-col class="black" cols="12" style="padding-bottom:0px;">
        <v-row class="black" v-show="isAuthorShow">

          <v-col cols="4" justify="center" align="center">
            <avatar-view :authorProfile="authorProfile" :isAuthor="isAuthor" @renewAuthorProfile="renewAuthorProfile"></avatar-view>
          </v-col>

          <v-col cols="8" justify="center" align="center">
            <artist-Right :meanRate="meanRate" :authorProfile="authorProfile" :authorArts="authorArts"></artist-Right>
          </v-col>

          <v-col v-if="isAuthor" cols="12" justify="center" align="center">
            <v-btn small outlined width="100%" :to="'/accountsettings/' + userProfile.data().uid">프로필 수정</v-btn>
          </v-col>
          <!-- <v-col v-if="authorProfile ? authorProfile.data().isArtist === true ? true : false : false" cols="12" justify="center" align="center">
            <consult-btn  :userProfile="userProfile" :authorProfile="authorProfile"></consult-btn>
          </v-col> -->

        </v-row>
        <v-row class="black" style="padding-top:30px;">
          <v-col cols="12" class="black" style="padding:0px 0px 10px 0px;">
            <backgroundView :authorProfile="authorProfile" :isAuthor="isAuthor" @renewAuthorProfile="renewAuthorProfile"></backgroundView>
            <!-- <tab v-if="authorProfile ? authorProfile.data().isArtist === true ? true : false : false" :isAuthor="isAuthor" :authorArts="authorArts" :authorProfile="authorProfile"></tab> -->
          </v-col>
        </v-row>
        <v-row align="center">
          <v-col cols="2" style="padding:0px; font-weight:bold; font-size:13px;" align="left">
            주   소
          </v-col>
          <v-col cols="7" style="padding:0px;font-weight:lighter; font-size:13px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;" align="center">
            {{address}}
          </v-col>
          <v-col cols="3" style="padding:0px;font-weight:lighter; font-size:13px;" align="right">
            <v-btn color="info" :href=findRoad style="padding:0px;font-size:13px;">길찾기</v-btn>
          </v-col>
        </v-row>
        <v-row style="padding-top:20px;">
          <div id="map" style="width:100%;height:300px;"></div>
        </v-row>
        <v-row style="padding-top:20px;">
          <review-tab :reviewsDocsToArray="reviewToMe"></review-tab>
        </v-row>
      </v-col>
      
      
      <v-row class="black">
        

      </v-row>
      
    

  </v-app>
</template>

<script>
import appbar from '../../components/appbar'
import { mapGetters, mapMutations, mapActions } from 'vuex'
import { userProfiles } from '../../firebase.js';
import { follows } from '../../firebase.js';
import { dbQuery } from '../../firebase.js'
import artistFollowBtn from '../../components/AppArtist/artistFollowBtn.vue'
import artistRight from '../../components/artistRight'
import avatarView from '../../components/avatarView'
import backgroundView from '../../components/backgroundView.vue'
import consultBtn from '../../components/consultBtn'
import tab from '../../components/tab'
import bus from '../../utils/bus.js';
import IsAuthor from '../../mixins/IsAuthor.js'
import reviewTab from '../../components/reviewTab'
export default {
  mixins : [IsAuthor],
  components: {
    appbar,
    artistRight,
    artistFollowBtn,
    avatarView,
    backgroundView,
    tab,
    consultBtn,
    reviewTab
  },
  data() {
    return {
      authorDocType: 'mypage',
      authorArts: [],
      followsDocsArray: [],
      deleteList: '',
      userFavoriteTattoos: [],
      followings:[],
      followers:[],
      map: null,
      lng:0,
      lat:0,
    }
  },
  methods: {
    renewAuthorProfile(){
      console.log('accountsetting')
      this.getAuthorProfile(this.authorDocType)
    },
    // async setAuthorArts(){
    //         let querySnapshot = await dbQuery('arts','authorUid', '==', this.$route.params.id)
            
    //         querySnapshot.forEach(item => {
    //           let url = item.data().thumbArtMyPage ? item.data().thumbArtMyPage[0].url : item.data().img[0].url
    //           this.authorArts.push({ 
    //                   'fileName':item.data().img[0].name,
    //                   'url': url,
    //                   'id': item.id,
    //                   'createdAt': item.data().createdAt
    //           })
    //         })
    // },
    ...mapActions({
      fetchReviewToMe: 'fetchReviewToMe',
    }),
    getFollowsDocsArray(){
      this.$store.commit('changeNavBtnDisabled')
      follows.where("from", "==", this.userProfile.data().uid).where("to", "==", this.$route.params.id)
      .get().then(querySnapshot => {
          querySnapshot.forEach(          
              item => {
                this.followsDocsArray.push(item)
                
              })         
        }).then().catch()
      this.$store.commit('changeNavBtnDisabled')

    },
    clickFollow(){
      this.$store.commit('changeNavBtnDisabled')
        follows.add({
          from : this.userProfile.data().uid,
          to : this.$route.params.id,
          createdAt : new Date() 
          }
        ).then(this.getFollowsDocsArray()).catch()
      this.$store.commit('changeNavBtnDisabled')
    },
    clickUnFollow(){
      this.$store.commit('changeNavBtnDisabled')
      follows.doc(this.followsDocsArray[0].id).delete().then(this.followsDocsArray = []).catch(console.log(this.followsDocsArray.length))
      this.$store.commit('changeNavBtnDisabled')
    },
    initMap() {
        console.log(this.lat, this.lng)
        let container = document.getElementById('map');
        let options = {
            center: new kakao.maps.LatLng(this.lat, this.lng),
            level: 3
        };
        var markerPosition  = new kakao.maps.LatLng(this.lat, this.lng); 
        var marker = new kakao.maps.Marker({
            position: markerPosition
        });

        let map = new kakao.maps.Map(container, options);

        // this.map = map;
        marker.setMap(map);
        map.setMapTypeId(kakao.maps.MapTypeId.HYBRID);
        // this.geocoder = new kakao.maps.services.Geocoder();
        this.map=map
    },
  },
  computed: {
    meanRate(){
      let a = []
      this.reviewToMe.filter(item => {
          a.push(item.data().rating)
      })
      const average = arr => arr.reduce( ( p, c ) => p + c, 0 ) / arr.length;
      return Math.round(average(a)*10)/10
    },
    ...mapGetters({
      userProfile: 'getUserProfile',
      navBtnDisabled: 'getNavBtnDisabled',
      // 리뷰 어레이
      reviewToMe: 'getReviewToMe', // myreviews.js
    }),
    findRoad(){
      return "https://map.kakao.com/link/search/"+this.userProfile.data().address
    },
    address(){
      return this.authorProfile ? this.authorProfile.data().address ? this.authorProfile.data().address : '':''
    },
    
  },
  async created() {
    await bus.$emit('start:spinner')
    await this.getFollowsDocsArray()
    this.fetchReviewToMe(this.$route.params.id)
    // await this.setAuthorArts()
    // await bus.$emit('end:spinner')
    // this.fileName = this.authorProfile.data().fileName
    // this.uploadEnd = this.authorProfile.data().uploadEnd    
  },
  async mounted(){
    await this.getAuthorProfile(this.authorDocType)
    this.lat = this.authorProfile ? this.authorProfile.data().latLng ? this.authorProfile.data().latLng.lat : 37.554229748867 : 37.554229748867
    this.lng = this.authorProfile ? this.authorProfile.data().latLng ? this.authorProfile.data().latLng.lng : 126.97474860534089 : 126.97474860534089
    this.afterSetMapOptions = true

    if (window.kakao && window.kakao.maps) {
        this.initMap();
    } else {
        const script = document.createElement('script');
        /* global kakao */
        script.onload = () => kakao.maps.load(this.initMap);
        script.src = 'http://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=66e112bad6ed1c35267171235fc42344&libraries=services';
        document.head.appendChild(script);
    }
    await bus.$emit('end:spinner')
    //  
  },
  watch: {

   
  }
}
</script>

<style scoped>

</style>