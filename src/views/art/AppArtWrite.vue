<template>
<div>
    <appbar :arrow="true"> {{ type === 'write' ? '글 쓰기' : '글 수정하기' }}</appbar>

    <v-form ref="form" v-model="valid">
      <v-row align="center" justify="center"> 

        <v-col cols="12">
          <v-stepper alt-labels v-model="step">
            
              <v-stepper-header :class="$vuetify.theme.isDark === true ? 'grey darken-4' : ''">
                <v-stepper-step :complete="step > 1" step="1">이미지 업로드</v-stepper-step>
                <v-divider></v-divider>
                <v-stepper-step :complete="step > 2" step="2">주요 내용</v-stepper-step>
                <v-divider></v-divider>
                <v-stepper-step :complete="step > 3" step="3">상세 내용 1</v-stepper-step>
                <v-divider></v-divider>
                <v-stepper-step step="4">상세 내용 2</v-stepper-step>
              </v-stepper-header>

              <v-card>
              <v-stepper-items>
                  
                  <v-stepper-content step="1">
                    <!-- 이미지 업로드 시작-->
                    <img-view :disabled="disabled" v-if="type === 'write' || imgVisible" :img="img" :type="type" @fileUpdate="fileUpdate" @deleteStorage="deleteStorage"></img-view>
                    <!-- 이미지 업로드 끝-->
                  </v-stepper-content>

                  <v-stepper-content step="2">
                    
                  </v-stepper-content>

                  <v-stepper-content step="3">
                    

                    
                  </v-stepper-content>
                
                  <v-stepper-content step="4">

                    

                  </v-stepper-content>
                
              </v-stepper-items>

              <v-divider></v-divider>
  
              <v-card-actions>
                <v-btn
                  :disabled="step === 1"
                  outlined
                  @click="step--"
                >
                  이전
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn
                  :disabled="step === 4"
                  outlined
                  @click="step++"
                >
                  다음
                </v-btn>
              </v-card-actions>

              </v-card>
            
          </v-stepper>
        </v-col>
        </v-row>


        <!-- 버튼 -->
            <write-modify-btn :disabled="disabled" @clickBtn="clickBtn" :completed="completed"></write-modify-btn>
        <!-- 버튼 끝 -->

        <!-- 스낵바 -->
          <snack-bar :type="type" v-if="snackbar"></snack-bar>
        <!-- 스낵바 끝 -->
      
    </v-form>
  </div>
</template>

<script>
import imgView from '../../components/imgView'
import snackBar from '../../components/snackBar'
import writeModifyBtn from '../../components/writeModifyBtn'
import appbar from '../../components/appbar'
import { dbRead, dbWrite, dbUpdate } from "../../firebase.js";
import { mapGetters, mapMutations, mapActions } from 'vuex';
import bus from '../../utils/bus';

export default {
  components: {
    appbar,
    imgView,
    writeModifyBtn,
    snackBar
  },

  data () {
    return {
      disabled: false,
      isFreeItems: ['무료', '유료'],
      isFree:'유료',
      step: 1,
      // 이미지 관련 변수
      img: [],
      uploadedImg:[],

      //스낵바
      snackbar: false,

      // 입력 관련 변수
      title: '',
      content: '',
      size: '',
      price: '',
      timeExpected: '',
      numExpected: '',
      genre: '',
      concept: '',
      part: '',
      hashtag: '',
      locationSelected: '',
      
      valid: false,
      imgVisible: false, // 수정으로들어왔을때, img-view 컴포넌트가 좀 나중에 떠야 props로 제대로 변수값을 넘겨주기 가능
    }
  },
  computed: {
    completed(){
      let cond = this.img.length !== 0 && this.title !== '' && this.content !== '' && this.size !== '' && this.price !== '' && this.timeExpected !== '' && this.numExpected !== '' && this.genre !== '' && this.concept !== '' && this.part !== '' && this.locationSelected !== '' && this.valid
      if(cond){
        return true
      }else{
        return false
      }
    },
    currentTitle () {
      switch (this.step) {
        case 1: return '이미지 업로드'
        case 2: return '중요 내용'
        case 3: return '상세 내용 1'
        default: return '상세 내용 2'
      }
    },
    type() {
      if(this.$route.params.id === 'new'){
        return 'write'
      }else{
        return 'modify'
      }
    },
    // 입력 관련 변수
    tag() {
      return [this.genre, this.concept, this.part, ...this.hashtag]
    },
    
    modifyResult() {
      let a = {
        // 글 쓰기 관련 변수
        title: this.title,
        content: this.content,
        size: this.size,
        price: this.price,
        timeExpected: this.timeExpected,
        numExpected: this.numExpected,
        genre: this.genre,
        concept: this.concept,
        part: this.part,
        hashtag: this.hashtag,
        tag: this.tag,
        location: this.locationSelected,
        isFree: this.isFree === '유료' ? false : true,
        
        // 자동으로 입력되어야 할 변수
        authorEmail: this.currentUser.email,
        authorUid: this.currentUser.uid,

        // 자동으로 입력되어야 할 변수
        modifiedAt: new Date()
        }
      return a 
    },

    ...mapGetters({
      //init
      userProfile: 'getUserProfile',
      currentUser: 'getCurrentUser', // commons.js
      // artListDocsToArray: 'getArtListDocsToArray', // commons.js
      
      // 이미 저장된 내용
      genres: 'getGenres', // commons.js
      concepts: 'getConcepts', // commons.js
      parts: 'getParts', // commons.js
      sizes: 'getSizes', // write.js
      locations: 'getLocations',

      //규칙
      titleRules: 'getTitleRules', // write.js
      contentRules: 'getContentRules', // write.js
      sizeRules: 'getSizeRules', // write.js
      priceRules: 'getPriceRules', // write.js
      timeExpectedRules: 'getTimeExpectedRules', // write.js
      numExpectedRules: 'getNumExpectedRules', // write.js
      genreRules: 'getGenreRules', // write.js
      conceptRules: 'getConceptRules', // write.js
      partRules: 'getGenreRules', // write.js

    }),
  },
  methods: {
    async deleteStorage(name){
      console.log('delete')
      this.$store.commit('changeNavBtnDisabled')
      await this.$storage.child('arts').child(this.$route.params.id).child(this.currentUser.uid).child(name.toString()).delete()
      for(var i in this.img) {
        let refs = await this.$storage.child('arts').child(this.$route.params.id).child(this.currentUser.uid).child(i)
        let url = await refs.getDownloadURL()
        let name = refs.name
        this.uploadedImg.push({url:url})
      }
      let input = {img:this.uploadedImg}
      this.$store.commit('changeNavBtnDisabled')
      await dbUpdate('arts', this.$route.params.id, input)
    },
    clickBtn(type){
      this.disabled = true
      if(type === 'write'){
        this.artWrite()
      }else {
        this.artModify()
      }
    },

    fileUpdate(imgList) {
      this.img = imgList
    },

    
    async artModify(){
       
      await bus.$emit('start:spinner')
      let input = await {...this.modifyResult}

      await dbUpdate('arts', this.$route.params.id, input)
      await this.fetchArts()
      await bus.$emit('end:spinner')
       
      this.snackbar = true
      
    },
    
    ...mapMutations({
      // 수정 취소 버튼
      goBack: 'goBack',
    }),
    ...mapActions({  
      // init
      fetchContents: 'fetchContents',
      fetchArts: 'fetchArts'
      
    }),

  },
  async created(){
    await bus.$emit('start:spinner')
    if(!this.userProfile){
      this.$router.go(-1)
    }
    if(!this.userProfile.data().isArtist){
      this.$router.go(-1)
    }
    
    // 수정으로 들어왔으면
    if(this.$route.params.id !== 'new'){
      console.log('modify')
      let artDoc = await dbRead('arts', this.$route.params.id)
      this.title = artDoc.data().title
      this.content = artDoc.data().content
      this.size = artDoc.data().size
      this.price = artDoc.data().price
      this.timeExpected = artDoc.data().timeExpected
      this.numExpected = artDoc.data().numExpected
      this.genre = artDoc.data().genre
      this.concept = artDoc.data().concept
      this.part = artDoc.data().part
      this.hashtag = artDoc.data().hashtag
      this.locationSelected = artDoc.data().location

      // 이미지 업로드 관련 변수
      // console.log(artDoc.data())
      this.img = artDoc.data().img // DB저장 변수
    }
    this.imgVisible = true
  },
  async mounted(){
    await bus.$emit('end:spinner')
     
  },
  watch: {
    // 입력 폼 관련 로직(규칙)
    hashtag (val) {
      if (val.length > 3) {
        this.$nextTick(() => this.hashtag.pop())
      }
    },
  }
}
</script>

<style scoped>
</style>
