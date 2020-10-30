<template>
    <div>
        <appbar :cancel="cancel" @clickCancel="clickCancel" :writeModify="writeModify" @clickWriteModify="clickWriteModify">{{ type === 'reviewwrite' ? '리뷰 쓰기' : '리뷰수정하기' }}</appbar>

        <v-row>
            <v-col cols="12" align="center" justify="center">
                <v-card flat>
                    <v-card-text>
                        <v-form ref="form" v-model="valid">
                            <v-rating :disabled="disabled" background-color="grey" color="yellow" half-increments large v-model="rating"></v-rating>
                            {{ rating }}
                        </v-form>
                    </v-card-text>

                    <v-card-text>
                        <!-- 내용 -->
                        <v-textarea :disabled="disabled" outlined v-model="content" :counter="400" label="내용" required prepend-icon="border_color"></v-textarea>
                        <!-- 내용 끝 -->
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col cols="12">
                <!-- 이미지 업로드 시작-->
                <img-view :disabled="disabled" v-if="type === 'reviewwrite' || imgVisible" :img="writeModifyImg" :type="type" @fileUpdate="fileUpdate"></img-view>
                <!-- 이미지 업로드 끝-->
            </v-col>

            <!-- 스낵바 -->
            <snack-bar type="writeModifyCancel" v-if="snackbar"></snack-bar>
            <!-- 스낵바 끝 -->

            <!-- 스낵바 -->
            <snack-bar :type="type" v-if="snackbarComplete"></snack-bar>
            <!-- 스낵바 끝 -->
        </v-row>
    </div>
</template>

<script>
import appbar from '../../components/appbar'
import { dbUpdate, dbWrite } from '../../firebase';
import { mapGetters, mapMutations, mapActions } from 'vuex'
import firebase from 'firebase/app'
import imgView from '../../components/imgView'
import snackBar from '../../components/snackBar'
import bus from '../../utils/bus';

export default {
    components:{
        
        appbar,
        imgView,
        snackBar,
    },
    mounted(){
       
    },
    watch:{
        snackbar(){
            if(this.snackbar === true){
                setTimeout(() => {
                this.snackbar = false
                }, 2000)
            }
        }
    },
    computed: {
        // 입력 관련 변수
        writeResult() {
        let a = {
            content: this.content,
            rating: this.rating,
            
            // 자동으로 입력되어야 할 변수
            createdAt: new Date(),
            hits: 0,
            
            // 자동으로 입력되어야 할 변수
            authorEmail: this.currentUser.email,
            authorUid: this.currentUser.uid,
            artId: this.writeId,
            artAuthorUid: this.artAuthorUid,

            modifiedAt: null, //나중에 수정 페이지에서 저장될 예정,, 미리 만들어 둔 것
        }
        return a 
        },
        writeModify(){
            return this.valid && this.rating !== 0
        },
        ...mapGetters({
            //init
            currentUser: 'getCurrentUser',
            userProfile: 'getUserProfile',
            writeModifyImg: 'getWriteModifyImg',
            contentRules: 'getContentRules', // write.js
            writeId: 'getWriteIdFromArt', // reviewwrite.js
            artAuthorUid: 'getArtAuthorUid', // reviewwrite.js
        }),

        type() {
        if(this.$route.params.id === 'new'){
            return 'reviewwrite'
        }else{
            return 'modify'
        }
        },
    },
    data(){
        return{
            rating: 0,
            content: '',
            // 이미지 관련 변수
            uploadedImg:[],
            disabled:false,

            cancel: true,

            snackbar: false,
            snackbarComplete: false,

            valid: false,
            imgVisible: false, // 수정으로들어왔을때, img-view 컴포넌트가 좀 나중에 떠야 props로 제대로 변수값을 넘겨주기 가능
        }
    },
    methods:{
        async reviewWrite(){
        // storage에 이미지 업로드

        //var uuid = require("uuid");
        //var id = uuid.v4();
        this.$store.commit('changeNavBtnDisabled')
        await bus.$emit('start:spinner')
        let input = {...this.writeResult}
        let w = await dbWrite('reviews', input)
        for(var i in this.writeModifyImg) { // reviews/리뷰글 아이디/본인 아이디/만든 날짜/파일이름
            let uploadTaskSnapshot = await this.$storage.child('reviews').child(this.currentUser.uid).child(w.id).child(i).child('review_'+i).put(this.writeModifyImg[i].file)
            let url = await uploadTaskSnapshot.ref.getDownloadURL()
            //let name = uploadTaskSnapshot.metadata.name
            
            this.uploadedImg.push({url:url})
        }
        let input2 = await {...this.writeResult, img:this.uploadedImg}
        await dbUpdate('reviews', w.id, input2)
        this.setWriteModifyImg([])
        await bus.$emit('end:spinner')
         
        this.snackbarComplete = true
        this.$store.commit('changeNavBtnDisabled')
        },

        async clickWriteModify(type){
            this.disabled = true
            if(this.type === 'reviewwrite'){
                this.reviewWrite()
            }else {
                this.reviewModify()
            }
        },

        fileUpdate(imgList) {
            this.setWriteModifyImg(imgList)
        },
        ...mapMutations({
            setWriteModifyImg: 'setWriteModifyImg',
        }),
        ...mapActions({
            fetchUserProfile: 'fetchUserProfile', // commons.js
        }),
        clickCancel(){
            console.log('취소')
            this.snackbar = true
        }
    }

}
</script>

<style>

</style>