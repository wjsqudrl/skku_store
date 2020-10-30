<template>
  <div>
    
      <v-card flat tile class="black" >
        <v-card-title style="font-size:13px;padding:0px;" >
            <v-col cols="6" align="left">
                전체 리뷰 
              <span style="color:#3884FF;font-size:14px;padding:0px 5px 0px 5px;">
                {{ reviewsDocsToArray.length }}
              </span> 개
            </v-col>
            <v-col cols="2"></v-col>
            <v-col cols="4" align="center">
              <v-btn color="info" @click="showDialog = !showDialog" style="padding:0px;font-size:13px;">모든 리뷰 보기</v-btn>
            </v-col>
        </v-card-title>

        <v-divider></v-divider>

        <v-card-text style="padding:0px;">
          <v-col v-for="review in reviewsDocsToArray.slice(0,1)" :key="review.id" cols="12">
            <review-card :review="review"></review-card>
          </v-col>
          <v-bottom-sheet v-model="showDialog" max-width="calc(100% - 0px)" scrollable inset>
            <v-card style="border-top-left-radius:30px; border-top-right-radius:30px; background-color:black;">
                <v-divider style="border-color:#707070; color:#707070;"></v-divider>
                <v-card-title>
                    모든 리뷰
                    <v-spacer></v-spacer>
                    <v-btn class="mt-6" text @click="showDialog = !showDialog">
                        닫기
                    </v-btn>
                </v-card-title>

                <v-divider style="border-color:#707070; color:#707070;"></v-divider>

                <v-card-text>
                    <v-col v-for="review in reviewsDocsToArray" :key="review.id" cols="12">
                      <review-card :review="review"></review-card>
                    </v-col>
                </v-card-text>

                <v-divider style="border-color:#707070; color:#707070;"></v-divider>
                
            </v-card>
          </v-bottom-sheet>
        </v-card-text>
      </v-card>
      
    
  </div>
</template>

<script>
import reviewCard from '../components/reviewCard'
export default {
    props: ['reviewsDocsToArray'],
    components:{
      reviewCard
    },
    computed:{
      
    },
    created(){
      // console.log(this.reviewsDocsToArray)
    },
    data(){
      return {
        showDialog:false,
      }
    }

}
</script>

<style>

</style>