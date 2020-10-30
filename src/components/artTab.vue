<template>
  <v-col cols="12">
          <v-card flat tile>
            <v-card-title v-if="type === 'art'">
              아티스트 {{ authorProfile.data().displayName }}님의 작품들
            </v-card-title>
            <v-divider v-if="type === 'art'"></v-divider>
            <v-container>
              <v-row align="center" v-if="items.length !== 0">
                <v-col v-for="item in items" :key="item.id" cols="4">
                  <v-card flat tile class="d-flex">
                    <v-img class="grey darken-4" aspect-ratio="1" :src="item.url" @click="clickBtn(item)"></v-img>
                    
                  </v-card>
                </v-col>
                <v-col cols="4"> 
                  <v-card flat tile>
                    <slot></slot>
                  </v-card>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
    </v-col>
</template>

<script>
import { mapGetters} from 'vuex'
export default {
    props: ['authorArts', 'type', 'authorProfile'],
    data(){
      return{
        items:[],
      }
    },
    computed:{
      ...mapGetters({
          history: 'getRouterHistory'
      })
    },
    methods:{
      clickBtn(item){
        // console.log(this.$route.params.writeId)
        // console.log(this.history[this.history.length-1])
        // console.log(item)
        if(item.id === this.$route.params.writeId){//같은 작품을 클릭 했다면
          window.scroll(0, 0)//스크롤 최상단으로 이동
          return
        }
        if(this.history[this.history.length-1].indexOf("/artist/")!=-1){//artistPage에서 작품을 선택했다면("/artist/"를 포함한다면)
          this.$router.push('/art/' + item.id).catch(err => {})
        }else{// "/art/:writeId"에서 작품을 선택했다면
           
          // alert('else')
          // console.log(this.$route)
          this.$store.commit('setRouterHistory', '/art/' + item.id)
          this.$router.push('/art/' + item.id).catch(err => {})
        }        
      }
    },
    created(){
      this.items = this.authorArts.sort((t1,t2) => t1.createdAt > t2.createdAt ? -1 : 1)
      //console.log(this.items)
    },
}
</script>

<style>

</style>