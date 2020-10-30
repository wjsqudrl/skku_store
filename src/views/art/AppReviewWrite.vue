<template>
  <v-app>
    <appbar :arrow="true"> {{ type === 'write' ? '리뷰 쓰기' : '리뷰수정하기' }}</appbar>

    <v-form ref="form" v-model="valid">
      <v-row align="center" justify="center">

        <v-col cols="12">
          <v-stepper v-model="step">
            
              <v-stepper-header :class="$vuetify.theme.isDark === true ? 'grey darken-4' : ''">
                <v-stepper-step :complete="step > 1" step="1">이미지 업로드</v-stepper-step>
                <v-divider></v-divider>
                <v-stepper-step step="2">주요 내용</v-stepper-step>
              </v-stepper-header>

              <v-card>
              <v-stepper-items>
                  <v-stepper-content step="1">
                    <!-- 이미지 업로드 시작-->
                    <img-view :disabled="disabled" :type="type" v-if="type === 'write' || imgVisible" :img="img" @fileUpdate="fileUpdate" @deleteStorage="deleteStorage"></img-view>
                    <!-- 이미지 업로드 끝-->
                  </v-stepper-content>
                  
                  <v-stepper-content step="2">
                    <!-- 제목 -->
                    <v-text-field :disabled="disabled" outlined v-model="title" :counter="50" :rules="titleRules" label="제목" required prepend-icon="title"></v-text-field>
                    <!-- 제목 끝 -->
                  
                    <!-- 내용 -->
                    <v-textarea :disabled="disabled" outlined v-model="content" :counter="400" :rules="contentRules" label="내용" required prepend-icon="border_color"></v-textarea>
                    <!-- 내용 끝 -->

                    <!-- 평점 -->
                    <v-col cols="12" align="center" justify="center">
                        <v-rating :disabled="disabled" background-color="grey" color="yellow" half-increments large v-model="rating"></v-rating>
                        {{ rating }}
                    </v-col>
                    <!-- 평점 끝 -->

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
                  :disabled="step === 2"
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
        <snackBar :type = "typeForSnackBar" v-if="snackbar"></snackBar>
      
    </v-form>

  </v-app>
</template>

<script>
import appbar from '../../components/appbar'
import imgView from '../../components/imgView'
import writeModifyBtn from '../../components/writeModifyBtn'
import snackBar from '../../components/snackBar'
import { dbRead, dbWrite, dbUpdate } from "../../firebase.js";
import { mapGetters, mapMutations, mapActions } from 'vuex';
import bus from '../../utils/bus.js';

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
      step: 1,
      imgCreatedAt:'',
      
      name: [],

      // 이미지 관련 변수
      img: [],
      uploadedImg:[],
      imgVisible: false,

      // 입력 관련 변수
      title: '',
      content: '',
      rating: 0,
      tag: [],
      
      valid: false,
      snackbar : false,
      typeForSnackBar : 'review',
      // 수정시 초기화 되야할 변수
      reveiewDoc: [],
    }
  },
  computed: {
    completed(){
      let cond = this.title !== '' && this.content !== '' && this.rating !== 0 && this.img.length !== 0
      // console.log(cond)
      if(cond){
        return true
      }else{
        return false
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
    writeResult() {
      let a = {
        // 글 쓰기 관련 변수
        title: this.title,
        content: this.content,
        rating: this.rating,
        tag: this.tag, 
        
        // 자동으로 입력되어야 할 변수
        createdAt: new Date(),
        hits: 0,
        
        // 자동으로 입력되어야 할 변수
        authorEmail: this.currentUser.email,
        authorUid: this.currentUser.uid,
        artId: this.writeId,
        artAuthorUid: this.artAuthorUid,

        // 자동으로 입력되어야 할 변수
        createdAt: new Date(),
        modifiedAt: null, //나중에 수정 페이지에서 저장될 예정,, 미리 만들어 둔 것
      }
      return a 
    },
    modifyResult() {
      let a = {
        // 글 쓰기 관련 변수
        title: this.title,
        content: this.content,
        tag: this.tag,
        rating: this.rating,
        
        // 자동으로 입력되어야 할 변수
        authorEmail: this.currentUser.email,
        authorUid: this.currentUser.uid,
        artId: this.writeId,
        artAuthorUid: this.artAuthorUid,

        // 자동으로 입력되어야 할 변수
        modifiedAt: new Date()
        }
      return a 
    },


    ...mapGetters({  
      //init
      currentUser: 'getCurrentUser', // commons.js
      // artListDocsToArray: 'getArtListDocsToArray', // commons.js
      writeId: 'getWriteIdFromArt', // reviewwrite.js
      artAuthorUid: 'getArtAuthorUid', // reviewwrite.js

      //규칙
      titleRules: 'getTitleRules', // write.js
      contentRules: 'getContentRules', // write.js


    }),
  },
  methods: {
    deleteStorage(name){
      this.name.push(name)
    },

    fileUpdate(imgList) {
      this.img = imgList
    },

    doReviewUpdate() {
       this.$store.commit('changeNavBtnDisabled')
        reviews.doc(this.$route.params.id).update({
            ...this.result,
            // 자동으로 입력되어야 할 변수
            modifiedAt: new Date(),
        })
        .then().catch()
    this.$store.commit('changeNavBtnDisabled')
    },

    clickBtn(type){
      this.disabled = true
      if(type === 'write'){
        this.reviewWrite()
      }else {
        this.reviewModify()
      }
    },

    async reviewWrite(){
      // storage에 이미지 업로드

      //var uuid = require("uuid");
      //var id = uuid.v4();
      this.$store.commit('changeNavBtnDisabled')
      await bus.$emit('start:spinner')
      let input = {...this.writeResult}
      let w = await dbWrite('reviews', input)
      for(var i in this.img) { // reviews/리뷰글 아이디/본인 아이디/만든 날짜/파일이름
        let uploadTaskSnapshot = await this.$storage.child('reviews').child(this.currentUser.uid).child(w.id).child(i).child('review_'+i).put(this.img[i].file)
        let url = await uploadTaskSnapshot.ref.getDownloadURL()
        //let name = uploadTaskSnapshot.metadata.name
        
        this.uploadedImg.push({url:url})
      }
      let input2 = await {...this.writeResult, img:this.uploadedImg}
      await dbUpdate('reviews', w.id, input2)
      await bus.$emit('end:spinner')
      this.$store.commit('changeNavBtnDisabled')
      this.snackbar = true
    },

    async reviewModify(){
      
      await bus.$emit('start:spinner')
      let input = await {...this.modifyResult}
      await dbUpdate('reviews', this.$route.params.id, input)
      await bus.$emit('end:spinner')
       
      this.snackbar = true
    },

    ...mapMutations({
    }),

    ...mapActions({
      // 글쓰기 버튼
      doReviewWrite: 'doReviewWrite',  // reviewwrite.js
    }),
  },
  async created(){
    await bus.$emit('start:spinner')
    // 쓰기로 들어왔으면,
    if(this.$route.params.id === 'new'){
      // 글의 tag를 받아오자
      let doc = await dbRead('arts', this.writeId)
      this.tag = doc.data().tag
    }else{
    // 수정으로 들어왔으면
      console.log('modify')
      
      let doc = await dbRead('reviews', this.$route.params.id)
      // 입력 관련 변수
      this.title = doc.data().title
      this.content = doc.data().content
      this.rating = doc.data().rating
      this.tag = doc.data().tag
      this.imgCreatedAt = doc.data().imgCreatedAt
      
      // 이미지 업로드 관련 변수
      this.img = doc.data().img
    }
    this.imgVisible = true
  },
  async mounted(){
    await bus.$emit('end:spinner')
     
  }
}
</script>

<style scoped>
</style>
