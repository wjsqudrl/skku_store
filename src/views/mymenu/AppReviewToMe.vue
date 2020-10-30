<template>
<v-app class="black">
  <div class="black">
    <appbar :arrow="true">내가받은리뷰</appbar>
    <v-row class="black" v-show="contentsShow">
      <v-col class="black" v-show="reviewToMe.length === 0 && arrayCompleted" cols="12">
        <v-card class="black" elevation="12" height="100%">
          <v-card-text>
            내가 받은 리뷰가 없습니다.
          </v-card-text>
        </v-card>
      </v-col>
      
      <v-col v-for="review in reviewToMe" :key="review.id" cols="12">
        <review-card :review="review"></review-card>
      </v-col>
    
    </v-row>
  </div>
</v-app>

</template>

<script>
import appbar from '../../components/appbar'
import reviewCard from '../../components/reviewCard'
import { mapGetters, mapActions } from 'vuex';
import bus from '../../utils/bus.js';

export default {
  data(){
    return {
      completed: false,
    }
  },
  components:{
    appbar,
    reviewCard,
  },
  computed: {
    contentsShow(){ // 먼저 문서 자체가 받아와 질 때 까지 렌더링 대기
      return this.reviewToMe ? true : false // 요소가 받아와 지면 렌더링
    },
    arrayCompleted() { // 그 이후 어레이 내에 아이템이 있으면 뿌려주고, 아니면 뿌러주지 말기
      return this.completed ? true : false // 어레이 자체가 생성된 것을 completed으로 아는것
    },
    ...mapGetters({
      reviewToMe: 'getReviewToMe',
      
    })
  },
  async created() {
    await bus.$emit('start:spinner')
    // await bus.$emit('end:spinner')
  },
  async mounted(){

    await this.fetchReviewToMe(this.$route.params.id)
    this.completed = true
    await bus.$emit('end:spinner')
    //  
  },
  methods: {
    ...mapActions({
      fetchReviewToMe: 'fetchReviewToMe',
    })
  },
}
</script>

<style scoped>

</style>
