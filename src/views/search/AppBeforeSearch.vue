<template>
  <v-app>
      <appbar :arrow="true">{{ pageName }}로 찾기</appbar>
        <v-row>
            <v-col cols="12" v-for="item in items" :key="item.name">
                <v-card contain @click="$router.push('/categoryArt/' + item.name)">
                    <v-img class="grey darken-4" aspect-ratio="3" :src="item.downloadURL">
                        <v-chip style="margin:5px">{{ item.name }}</v-chip>
                    </v-img>
                </v-card>
            </v-col>
        </v-row>
            
  </v-app>
</template>

<script>
import appbar from './../../components/appbar'
export default {
    components: {
        appbar,
    },
  data() {
    return {
      items: [],
    }
  },
  mounted(){
       
  },
  computed: {
      pageName(){
          if(this.$route.params.value === 'genre'){
              return '장르'
          }else if(this.$route.params.value === 'concept'){
              return '주제'
          }else if(this.$route.params.value === 'part'){
              return '부위'
          }else {
              return '장소'
          }
      }
  },
  created(){
        let val = this.$route.params.value
        if(val === 'genre'){
            this.items = [
                {name:'블랙워크',downloadURL:'https://firebasestorage.googleapis.com/v0/b/tattooup.appspot.com/o/img%2Fgenre%2Fgenre_%E1%84%87%E1%85%B3%E1%86%AF%E1%84%85%E1%85%A2%E1%86%A8%E1%84%8B%E1%85%AF%E1%84%8F%E1%85%B3.jpg?alt=media&token=1e80d368-be60-4f62-8631-783a8072f183'},
                {name:'올드스쿨',downloadURL:'https://firebasestorage.googleapis.com/v0/b/tattooup.appspot.com/o/img%2Fgenre%2Fgenre_%E1%84%8B%E1%85%A9%E1%86%AF%E1%84%83%E1%85%B3%E1%84%89%E1%85%B3%E1%84%8F%E1%85%AE%E1%86%AF.jpg?alt=media&token=8c318cc0-f6a6-4ad4-860f-a2b0cbb4cc16'},
                {name:'뉴스쿨',downloadURL:'https://firebasestorage.googleapis.com/v0/b/tattooup.appspot.com/o/img%2Fgenre%2Fgenre_%E1%84%82%E1%85%B2%E1%84%89%E1%85%B3%E1%84%8F%E1%85%AE%E1%86%AF.jpg?alt=media&token=87f6e336-4833-4d68-b62f-bbf2097ebf00'},
                {name:'레터링',downloadURL:'https://firebasestorage.googleapis.com/v0/b/tattooup.appspot.com/o/img%2Fgenre%2Fgenre_%E1%84%85%E1%85%A6%E1%84%90%E1%85%A5%E1%84%85%E1%85%B5%E1%86%BC.jpg?alt=media&token=b986b6c0-2acb-4f74-a651-12ef0aa297f7'},
                {name:'미니타투',downloadURL:'https://firebasestorage.googleapis.com/v0/b/tattooup.appspot.com/o/img%2Fgenre%2Fgenre_%E1%84%86%E1%85%B5%E1%84%82%E1%85%B5%E1%84%90%E1%85%A1%E1%84%90%E1%85%AE.jpg?alt=media&token=acc1629f-e58a-4dfc-83f6-9775aa9e98d3'},
                {name:'일러스트',downloadURL:'https://firebasestorage.googleapis.com/v0/b/tattooup.appspot.com/o/img%2Fgenre%2Fgenre_%E1%84%8B%E1%85%B5%E1%86%AF%E1%84%85%E1%85%A5%E1%84%89%E1%85%B3%E1%84%90%E1%85%B3.jpg?alt=media&token=2630001a-0c75-404f-800c-d437c6a2fc1f'},
                {name:'라인워크',downloadURL:'https://firebasestorage.googleapis.com/v0/b/tattooup.appspot.com/o/img%2Fgenre%2Fgenre_%E1%84%85%E1%85%A1%E1%84%8B%E1%85%B5%E1%86%AB%E1%84%8B%E1%85%AF%E1%84%8F%E1%85%B3.jpg?alt=media&token=9cc80b24-7239-42f2-82ed-3b7eda1b5a08'},
                {name:'블랙앤그레이',downloadURL:'https://firebasestorage.googleapis.com/v0/b/tattooup.appspot.com/o/img%2Fgenre%2Fgenre_%E1%84%87%E1%85%B3%E1%86%AF%E1%84%85%E1%85%A2%E1%86%A8%E1%84%8B%E1%85%A2%E1%86%AB%E1%84%80%E1%85%B3%E1%84%85%E1%85%A6%E1%84%8B%E1%85%B5.jpg?alt=media&token=3ec71836-a438-4392-87d1-817a4792d5fc'},
                {name:'치카노',downloadURL:'https://firebasestorage.googleapis.com/v0/b/tattooup.appspot.com/o/img%2Fgenre%2Fgenre_%E1%84%8E%E1%85%B5%E1%84%8F%E1%85%A1%E1%84%82%E1%85%A9.jpg?alt=media&token=c85412c9-9aa0-43f6-a438-47cbda75d69b'},
                {name:'이레즈미',downloadURL:'https://firebasestorage.googleapis.com/v0/b/tattooup.appspot.com/o/img%2Fgenre%2Fgenre_%E1%84%8B%E1%85%B5%E1%84%85%E1%85%A6%E1%84%8C%E1%85%B3%E1%84%86%E1%85%B5.jpg?alt=media&token=59c7292b-592a-4a54-98d7-653186860506'},
                {name:'커버업',downloadURL:'https://firebasestorage.googleapis.com/v0/b/tattooup.appspot.com/o/img%2Fgenre%2Fgenre_%E1%84%8F%E1%85%A5%E1%84%87%E1%85%A5%E1%84%8B%E1%85%A5%E1%86%B8.jpg?alt=media&token=a7bf9fee-a82b-454f-b1bf-a381b9c4d75e'},
                {name:'리얼리스틱',downloadURL:'https://firebasestorage.googleapis.com/v0/b/tattooup.appspot.com/o/img%2Fgenre%2Fgenre_%E1%84%85%E1%85%B5%E1%84%8B%E1%85%A5%E1%86%AF%E1%84%85%E1%85%B5%E1%84%89%E1%85%B3%E1%84%90%E1%85%B5%E1%86%A8.jpg?alt=media&token=4099baee-7d59-414a-9a89-d6f810440cda'},
                {name:'트라이벌',downloadURL:'https://firebasestorage.googleapis.com/v0/b/tattooup.appspot.com/o/img%2Fgenre%2Fgenre_%E1%84%90%E1%85%B3%E1%84%85%E1%85%A1%E1%84%8B%E1%85%B5%E1%84%87%E1%85%A5%E1%86%AF.jpg?alt=media&token=b677af3f-b163-4eb4-bfcf-d844efaee7cf'},

            ]
        }else if(val === 'concept'){
            this.items = [
                {name:'꽃',downloadURL:'https://firebasestorage.googleapis.com/v0/b/tattooup.appspot.com/o/img%2Fconcept%2Fconcept_%E1%84%81%E1%85%A9%E1%86%BE.jpg?alt=media&token=84b1729c-5648-42cd-90c3-c27b76c1d232'},
                {name:'장미',downloadURL:'https://firebasestorage.googleapis.com/v0/b/tattooup.appspot.com/o/img%2Fconcept%2Fconcept_%E1%84%8C%E1%85%A1%E1%86%BC%E1%84%86%E1%85%B5.jpg?alt=media&token=8f61c92b-94bc-4574-a8d8-5e169512b8ad'},
                {name:'고래',downloadURL:'https://firebasestorage.googleapis.com/v0/b/tattooup.appspot.com/o/img%2Fconcept%2Fconcept_%E1%84%80%E1%85%A9%E1%84%85%E1%85%A2.jpg?alt=media&token=b698b109-f6c4-41d3-b790-c0f7c068108d'},
                {name:'맹수',downloadURL:'https://firebasestorage.googleapis.com/v0/b/tattooup.appspot.com/o/img%2Fconcept%2Fconcept_%E1%84%86%E1%85%A2%E1%86%BC%E1%84%89%E1%85%AE.jpg?alt=media&token=122fbb3a-082b-41dd-ab64-1ab3f0d87fa3'},
                {name:'뱀',downloadURL:'https://firebasestorage.googleapis.com/v0/b/tattooup.appspot.com/o/img%2Fconcept%2Fconcept_%E1%84%87%E1%85%A2%E1%86%B7.jpg?alt=media&token=8f87d307-2903-4cbb-afee-d48151846438'},
                {name:'용',downloadURL:'https://firebasestorage.googleapis.com/v0/b/tattooup.appspot.com/o/img%2Fconcept%2Fconcept_%E1%84%8B%E1%85%AD%E1%86%BC.jpg?alt=media&token=82c004d0-d94e-47ab-98a1-85bcfadb58e1'},
                {name:'반려동물',downloadURL:'https://firebasestorage.googleapis.com/v0/b/tattooup.appspot.com/o/img%2Fconcept%2Fconcept_%E1%84%87%E1%85%A1%E1%86%AB%E1%84%85%E1%85%A7%E1%84%83%E1%85%A9%E1%86%BC%E1%84%86%E1%85%AE%E1%86%AF.jpg?alt=media&token=495dd58e-3042-4e3d-995e-efa411eb16c0'},
                {name:'동물',downloadURL:'https://firebasestorage.googleapis.com/v0/b/tattooup.appspot.com/o/img%2Fconcept%2Fconcept_%E1%84%83%E1%85%A9%E1%86%BC%E1%84%86%E1%85%AE%E1%86%AF.jpg?alt=media&token=e38b9ed9-e540-45e9-899c-8951b9de1f6e'},
                {name:'해골',downloadURL:'https://firebasestorage.googleapis.com/v0/b/tattooup.appspot.com/o/img%2Fconcept%2Fconcept_%E1%84%92%E1%85%A2%E1%84%80%E1%85%A9%E1%86%AF.jpg?alt=media&token=84c8910b-a04a-4ee2-9eb3-befb1fbb8f9d'},
                {name:'다크',downloadURL:'https://firebasestorage.googleapis.com/v0/b/tattooup.appspot.com/o/img%2Fconcept%2Fconcept_%E1%84%83%E1%85%A1%E1%84%8F%E1%85%B3.jpg?alt=media&token=5586993d-22a6-4681-bd4b-214249ecbd5c'},
                {name:'종교',downloadURL:'https://firebasestorage.googleapis.com/v0/b/tattooup.appspot.com/o/img%2Fconcept%2Fconcept_%E1%84%8C%E1%85%A9%E1%86%BC%E1%84%80%E1%85%AD.jpg?alt=media&token=f5de95f6-8931-4463-8b17-998495d44ba0'},
                {name:'만다라',downloadURL:'https://firebasestorage.googleapis.com/v0/b/tattooup.appspot.com/o/img%2Fconcept%2Fconcept_%E1%84%86%E1%85%A1%E1%86%AB%E1%84%83%E1%85%A1%E1%84%85%E1%85%A1.jpg?alt=media&token=2997ac77-7e5c-4e03-80f4-74e7f966f7f7'},
                {name:'나침반',downloadURL:'https://firebasestorage.googleapis.com/v0/b/tattooup.appspot.com/o/img%2Fconcept%2Fconcept_%E1%84%82%E1%85%A1%E1%84%8E%E1%85%B5%E1%86%B7%E1%84%87%E1%85%A1%E1%86%AB.jpg?alt=media&token=2ef2d128-9441-4ac1-bf2d-cf0d3e3a589f'},
                {name:'우주',downloadURL:'https://firebasestorage.googleapis.com/v0/b/tattooup.appspot.com/o/img%2Fconcept%2Fconcept_%E1%84%8B%E1%85%AE%E1%84%8C%E1%85%AE.jpg?alt=media&token=fcbe6f53-0e32-4cd6-a3db-4d4a07ff2b41'},
                {name:'한야',downloadURL:'https://firebasestorage.googleapis.com/v0/b/tattooup.appspot.com/o/img%2Fconcept%2Fconcept_%E1%84%92%E1%85%A1%E1%86%AB%E1%84%8B%E1%85%A3.jpg?alt=media&token=302b7ad1-7b9e-4985-afb2-3ce2c75424fd'},
                {name:'동양의미',downloadURL:'https://firebasestorage.googleapis.com/v0/b/tattooup.appspot.com/o/img%2Fconcept%2Fconcept_%E1%84%83%E1%85%A9%E1%86%BC%E1%84%8B%E1%85%A3%E1%86%BC%E1%84%8B%E1%85%B4%E1%84%86%E1%85%B5.jpg?alt=media&token=4b30f4c5-6c10-4c86-bf8a-c0fe276bb800'},
                {name:'인물',downloadURL:'https://firebasestorage.googleapis.com/v0/b/tattooup.appspot.com/o/img%2Fconcept%2Fconcept_%E1%84%8B%E1%85%B5%E1%86%AB%E1%84%86%E1%85%AE%E1%86%AF.jpg?alt=media&token=8c36e87d-1c9f-4630-a521-7807bb4e4b0a'},
                {name:'커플',downloadURL:'https://firebasestorage.googleapis.com/v0/b/tattooup.appspot.com/o/img%2Fconcept%2Fconcept_%E1%84%8F%E1%85%A5%E1%84%91%E1%85%B3%E1%86%AF.jpg?alt=media&token=56e3e5a1-990c-4fd8-ada2-fce81fe0081a'},

            ]
        }else if(val === 'part'){
            this.items = [
                {name:'팔',downloadURL:'https://firebasestorage.googleapis.com/v0/b/tattooup.appspot.com/o/img%2Fpart%2Fpart_%E1%84%91%E1%85%A1%E1%86%AF.jpg?alt=media&token=16cda1ab-16dc-46b8-80fc-7be9f3b235fa'},
                {name:'윗팔',downloadURL:'https://firebasestorage.googleapis.com/v0/b/tattooup.appspot.com/o/img%2Fpart%2Fpart_%E1%84%8B%E1%85%B1%E1%86%BA%E1%84%91%E1%85%A1%E1%86%AF.jpg?alt=media&token=b432bb30-9465-4258-8bff-8567f14e36bf'},
                {name:'아랫팔',downloadURL:'https://firebasestorage.googleapis.com/v0/b/tattooup.appspot.com/o/img%2Fpart%2Fpart_%E1%84%8B%E1%85%A1%E1%84%85%E1%85%A2%E1%86%BA%E1%84%91%E1%85%A1%E1%86%AF.jpg?alt=media&token=c72229bc-7cc4-41d6-980d-ad9a33bed049'},
                {name:'팔꿈치',downloadURL:'https://firebasestorage.googleapis.com/v0/b/tattooup.appspot.com/o/img%2Fpart%2Fpart_%E1%84%91%E1%85%A1%E1%86%AF%E1%84%81%E1%85%AE%E1%86%B7%E1%84%8E%E1%85%B5.png?alt=media&token=36ffd742-a3b2-4b61-99b0-a94ca928cae4'},
                {name:'긴팔',downloadURL:'https://firebasestorage.googleapis.com/v0/b/tattooup.appspot.com/o/img%2Fpart%2Fpart_%E1%84%80%E1%85%B5%E1%86%AB%E1%84%91%E1%85%A1%E1%86%AF.jpg?alt=media&token=f39abab2-5a6b-42a0-a088-2a0c3f988996'},
                {name:'손목',downloadURL:'https://firebasestorage.googleapis.com/v0/b/tattooup.appspot.com/o/img%2Fpart%2Fpart_%E1%84%89%E1%85%A9%E1%86%AB%E1%84%86%E1%85%A9%E1%86%A8.jpg?alt=media&token=95202834-8e5b-41c9-867f-3c9f2d0825e4'},
                {name:'손가락',downloadURL:'https://firebasestorage.googleapis.com/v0/b/tattooup.appspot.com/o/img%2Fpart%2Fpart_%E1%84%89%E1%85%A9%E1%86%AB%E1%84%80%E1%85%A1%E1%84%85%E1%85%A1%E1%86%A8.jpg?alt=media&token=08965fec-3f89-45b5-b531-280c7a9a24ae'},
                {name:'손등',downloadURL:'https://firebasestorage.googleapis.com/v0/b/tattooup.appspot.com/o/img%2Fpart%2Fpart_%E1%84%89%E1%85%A9%E1%86%AB%E1%84%83%E1%85%B3%E1%86%BC.png?alt=media&token=2730e804-0655-4665-b1f9-49c62c3433f2'},
                {name:'다리',downloadURL:'https://firebasestorage.googleapis.com/v0/b/tattooup.appspot.com/o/img%2Fpart%2Fpart_%E1%84%83%E1%85%A1%E1%84%85%E1%85%B5.jpg?alt=media&token=e9678563-3270-4640-976f-245c70c4d83e'},
                {name:'무릎',downloadURL:'https://firebasestorage.googleapis.com/v0/b/tattooup.appspot.com/o/img%2Fpart%2Fpart_%E1%84%86%E1%85%AE%E1%84%85%E1%85%B3%E1%87%81.jpg?alt=media&token=0a1cb58e-f49c-47aa-964c-e40354affd81'},
                {name:'발목',downloadURL:'https://firebasestorage.googleapis.com/v0/b/tattooup.appspot.com/o/img%2Fpart%2Fpart_%E1%84%87%E1%85%A1%E1%86%AF%E1%84%86%E1%85%A9%E1%86%A8.jpg?alt=media&token=75013073-a2f9-4158-955c-83664f93678b'},
                {name:'등판',downloadURL:'https://firebasestorage.googleapis.com/v0/b/tattooup.appspot.com/o/img%2Fpart%2Fpart_%E1%84%83%E1%85%B3%E1%86%BC%E1%84%91%E1%85%A1%E1%86%AB.jpg?alt=media&token=bba68558-aca3-44f8-b5e5-1d3a46f92065'},
                {name:'옆구리',downloadURL:'https://firebasestorage.googleapis.com/v0/b/tattooup.appspot.com/o/img%2Fpart%2Fpart_%E1%84%8B%E1%85%A7%E1%87%81%E1%84%80%E1%85%AE%E1%84%85%E1%85%B5.jpeg?alt=media&token=42ba2799-e184-4bb5-82fd-f5454db98927'},
                {name:'가슴',downloadURL:'https://firebasestorage.googleapis.com/v0/b/tattooup.appspot.com/o/img%2Fpart%2Fpart_%E1%84%80%E1%85%A1%E1%84%89%E1%85%B3%E1%86%B7.jpg?alt=media&token=e41ae0ee-c23d-4ad6-9b10-732f207ec092'},
                {name:'쇄골',downloadURL:'https://firebasestorage.googleapis.com/v0/b/tattooup.appspot.com/o/img%2Fpart%2Fpart_%E1%84%89%E1%85%AB%E1%84%80%E1%85%A9%E1%86%AF.jpg?alt=media&token=775f61cc-f48d-4b00-8a0c-fd73a1d1b108'},
                {name:'목',downloadURL:'https://firebasestorage.googleapis.com/v0/b/tattooup.appspot.com/o/img%2Fpart%2Fpart_%E1%84%86%E1%85%A9%E1%86%A8.jpg?alt=media&token=031a46f8-269b-4ce4-b51c-8a5fe91ea712'},
                {name:'귀',downloadURL:'https://firebasestorage.googleapis.com/v0/b/tattooup.appspot.com/o/img%2Fpart%2Fpart_%E1%84%80%E1%85%B1.jpg?alt=media&token=6c476466-0f2d-49cc-ab32-537456262306'},
                
            ]
        }else if(val === 'location'){
            this.items = [
                {name:'서울',downloadURL:'https://firebasestorage.googleapis.com/v0/b/tattooup.appspot.com/o/img%2Flocation%2Flocation_%E1%84%89%E1%85%A5%E1%84%8B%E1%85%AE%E1%86%AF.jpeg?alt=media&token=29a28a8d-5f22-41e9-afad-7dabb59fde5f'},
                {name:'강남',downloadURL:'https://firebasestorage.googleapis.com/v0/b/tattooup.appspot.com/o/img%2Flocation%2Flocation_%E1%84%80%E1%85%A1%E1%86%BC%E1%84%82%E1%85%A1%E1%86%B7.jpeg?alt=media&token=0b5fe86e-ebe4-4f29-ad9e-5cda06994489'},
                {name:'홍대',downloadURL:'https://firebasestorage.googleapis.com/v0/b/tattooup.appspot.com/o/img%2Flocation%2Flocation_%E1%84%92%E1%85%A9%E1%86%BC%E1%84%83%E1%85%A2.jpg?alt=media&token=143d6816-65f8-41d4-9ec3-541127002bd5'},
                {name:'이태원',downloadURL:'https://firebasestorage.googleapis.com/v0/b/tattooup.appspot.com/o/img%2Flocation%2Flocation_%E1%84%8B%E1%85%B5%E1%84%90%E1%85%A2%E1%84%8B%E1%85%AF%E1%86%AB.jpeg?alt=media&token=dec46fe9-243a-4f73-bc5e-4dee3ec8d30e'},
                {name:'경기남부',downloadURL:'https://firebasestorage.googleapis.com/v0/b/tattooup.appspot.com/o/img%2Flocation%2Flocation_%E1%84%80%E1%85%A7%E1%86%BC%E1%84%80%E1%85%B5%E1%84%82%E1%85%A1%E1%86%B7%E1%84%87%E1%85%AE.jpg?alt=media&token=12685d8c-fc1b-4ed9-8cff-9abd18dec89e'},
                {name:'경기북부',downloadURL:'https://firebasestorage.googleapis.com/v0/b/tattooup.appspot.com/o/img%2Flocation%2Flocation_%E1%84%80%E1%85%A7%E1%86%BC%E1%84%80%E1%85%B5%E1%84%87%E1%85%AE%E1%86%A8%E1%84%87%E1%85%AE.jpeg?alt=media&token=45ab495b-fb7b-4b00-aa2e-9f12b702aa37'},
                {name:'인천',downloadURL:'https://firebasestorage.googleapis.com/v0/b/tattooup.appspot.com/o/img%2Flocation%2Flocation_%E1%84%8B%E1%85%B5%E1%86%AB%E1%84%8E%E1%85%A5%E1%86%AB.jpeg?alt=media&token=b7ebbd14-7dbf-4629-a42f-e99f8d04306b'},
                {name:'부산',downloadURL:'https://firebasestorage.googleapis.com/v0/b/tattooup.appspot.com/o/img%2Flocation%2Flocation_%E1%84%87%E1%85%AE%E1%84%89%E1%85%A1%E1%86%AB.jpeg?alt=media&token=dd492a65-e7da-49f8-8c54-307f72172796'},
                {name:'대구',downloadURL:'https://firebasestorage.googleapis.com/v0/b/tattooup.appspot.com/o/img%2Flocation%2Flocation_%E1%84%83%E1%85%A2%E1%84%80%E1%85%AE.jpg?alt=media&token=0a22cd07-e84f-46f6-8c9e-f437e8ad892f'},
                {name:'대전',downloadURL:'https://firebasestorage.googleapis.com/v0/b/tattooup.appspot.com/o/img%2Flocation%2Flocation_%E1%84%83%E1%85%A2%E1%84%8C%E1%85%A5%E1%86%AB.jpg?alt=media&token=0121e98f-ae63-409f-abd2-4c8cd13611a8'},
                {name:'전북',downloadURL:'https://firebasestorage.googleapis.com/v0/b/tattooup.appspot.com/o/img%2Flocation%2Flocation_%E1%84%8C%E1%85%A5%E1%86%AB%E1%84%87%E1%85%AE%E1%86%A8.jpeg?alt=media&token=b1b53479-980c-4ea4-9fe1-9f86d6e419fb'},
                {name:'전남',downloadURL:'https://firebasestorage.googleapis.com/v0/b/tattooup.appspot.com/o/img%2Flocation%2Flocation_%E1%84%8C%E1%85%A5%E1%86%AB%E1%84%82%E1%85%A1%E1%86%B7.jpg?alt=media&token=c0287add-2d20-45ba-a41d-a39d193f98b8'},
                {name:'충북',downloadURL:'https://firebasestorage.googleapis.com/v0/b/tattooup.appspot.com/o/img%2Flocation%2Flocation_%E1%84%8E%E1%85%AE%E1%86%BC%E1%84%87%E1%85%AE%E1%86%A8.jpeg?alt=media&token=6546608b-cc23-44e2-8207-ae7e656d4702'},
                {name:'충남',downloadURL:'https://firebasestorage.googleapis.com/v0/b/tattooup.appspot.com/o/img%2Flocation%2Flocation_%E1%84%8E%E1%85%AE%E1%86%BC%E1%84%82%E1%85%A1%E1%86%B7.jpeg?alt=media&token=5daad01c-8d45-46a4-a8fa-933d6b9f48f1'},
                {name:'경북',downloadURL:'https://firebasestorage.googleapis.com/v0/b/tattooup.appspot.com/o/img%2Flocation%2Flocation_%E1%84%80%E1%85%A7%E1%86%BC%E1%84%87%E1%85%AE%E1%86%A8.jpg?alt=media&token=609dd83b-09d3-43c6-a346-2984bc549bef'},
                {name:'경남',downloadURL:'https://firebasestorage.googleapis.com/v0/b/tattooup.appspot.com/o/img%2Flocation%2Flocation_%E1%84%80%E1%85%A7%E1%86%BC%E1%84%82%E1%85%A1%E1%86%B7.jpeg?alt=media&token=856b02b3-874b-43a4-afb5-66c93662df65'},
                {name:'울산',downloadURL:'https://firebasestorage.googleapis.com/v0/b/tattooup.appspot.com/o/img%2Flocation%2Flocation_%E1%84%8B%E1%85%AE%E1%86%AF%E1%84%89%E1%85%A1%E1%86%AB.jpeg?alt=media&token=8248a568-8961-41e4-a365-4acde16f5c15'},
                {name:'광주',downloadURL:'https://firebasestorage.googleapis.com/v0/b/tattooup.appspot.com/o/img%2Flocation%2Flocation_%E1%84%80%E1%85%AA%E1%86%BC%E1%84%8C%E1%85%AE.jpeg?alt=media&token=86297221-beee-4ea2-abd7-e42ed83d2661'},
                {name:'강원',downloadURL:'https://firebasestorage.googleapis.com/v0/b/tattooup.appspot.com/o/img%2Flocation%2Flocation_%E1%84%80%E1%85%A1%E1%86%BC%E1%84%8B%E1%85%AF%E1%86%AB.jpg?alt=media&token=de52c2d9-886c-4e46-b5dd-ba8716393365'},
                {name:'세종',downloadURL:'https://firebasestorage.googleapis.com/v0/b/tattooup.appspot.com/o/img%2Flocation%2Flocation_%E1%84%89%E1%85%A6%E1%84%8C%E1%85%A9%E1%86%BC.jpeg?alt=media&token=e1e9ad7d-0900-41e6-80c9-5124a9695d03'},
                {name:'제주도',downloadURL:'https://firebasestorage.googleapis.com/v0/b/tattooup.appspot.com/o/img%2Flocation%2Flocation_%E1%84%8C%E1%85%A6%E1%84%8C%E1%85%AE%E1%84%83%E1%85%A9.jpg?alt=media&token=d9af3aca-c71f-40a6-860b-c56337fbc1a9'},
            ]
        }
  }
}
</script>

<style>

</style>