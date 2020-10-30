<template>
  <v-bottom-sheet v-model="eventArtistSheet" max-width="calc(100% - 0px)" scrollable inset>
      <v-card style="border-top-left-radius:30px; border-top-right-radius:30px; background-color:#1a1c1f;">
          <v-card-title style="padding-bottom:0px; padding-top:25px;">
            <v-img class="grey darken-4" style="border-radius:10px" :src="eventImg.artist"></v-img>
          </v-card-title>
          <v-card-actions style="padding:0px 0px 50px 0px;">
              <v-col cols="1"></v-col>
              <v-col cols="5" style="padding:0px 0px 0px 10px">
                <v-checkbox v-model="checkbox" @click="noLongerShowEvent" label="다시보지않기">
                </v-checkbox> 
              </v-col>
              <v-col cols="2">
                <v-btn style="border-radius:20px 20px 20px 20px;" @click="eventArtistSheet = !eventArtistSheet">
                    닫기
                </v-btn>
              </v-col>
              <v-col cols="3">
                <v-btn style="border-radius:20px 20px 20px 20px; margin-left:10px"  @click="goEvent">
                    자세히
                </v-btn>
              </v-col>
              <v-col cols="1"></v-col>
          </v-card-actions>
      </v-card>
    </v-bottom-sheet>

</template>

<script>
import { dbRead, dbQuery, appContents, dbUpdate} from '../firebase'
import { mapMutations, mapActions, mapGetters } from 'vuex'

export default {
    props:['eventArtistShow', 'eventImg'],
    created(){
        if(this.eventArtistShow){
            this.eventArtistSheet = true
        }
    },
    data(){
        return{
            eventArtistSheet: false,
            checkbox: false,
        }
    },
    computed: {
        ...mapGetters({
            currentUser: 'getCurrentUser',
            img: 'getImg', 
        }),
    },
    methods:{
    ...mapActions({
        fetchUserProfile: 'fetchUserProfile',
      }),
        goEvent(){
            this.eventArtistSheet = false
            this.$router.push('/notice')
        },
        async noLongerShowEvent(){
            let input = {eventPopupOn:false}
            await dbUpdate('userProfiles', this.currentUser.uid, input)
            this.eventArtistSheet = false
            await this.fetchUserProfile(this)
            
        },
    }

}
</script>

<style>

</style>