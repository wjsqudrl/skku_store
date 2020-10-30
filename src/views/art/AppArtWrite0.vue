<template>
    <div> 
        <appbar :cancel="cancel" :next="next" @clickNext="clickNext" @clickCancel="clickCancel">{{ type === 'write' ? '글 쓰기' : '글 수정하기' }}</appbar>

        <v-row>
            <v-col cols="12">
                <!-- 이미지 업로드 시작-->
                <img-view :disabled="disabled" v-if="type === 'write' || imgVisible" :img="writeModifyImg" :type="type" @fileUpdate="fileUpdate"></img-view>
                <!-- 이미지 업로드 끝-->
            </v-col>

            <v-col cols="12">
                <v-form ref="form" v-model="valid">
                    <!-- 제목 -->
                    <v-text-field :disabled="disabled" outlined v-model="title" :counter="50" :rules="titleRules" label="제목" required prepend-icon="title"></v-text-field>
                    <!-- 제목 끝 -->
                    
                    <!-- 내용 -->
                    <v-textarea :disabled="disabled" outlined v-model="content" :counter="400" :rules="contentRules" label="내용" required prepend-icon="border_color"></v-textarea>
                    <!-- 내용 끝 -->
                    <!-- <div class="container">
                        <vue-hashtag-textarea
                            style="background-color:black"
                            :disabled="disabled" outlined v-model="content" :counter="400" :rules="contentRules" label="내용" required prepend-icon="border_color"
                            :option=option 
                            v-on:onChangeHashtag="onChangeHashtag" 
                            v-on:onSelectHashtag="onSelectHashtag"
                            ref="vueHashtagTextarea"
                        />
                    </div> -->

                <!-- 장르  -->
                <v-select
                    :disabled="disabled"
                    v-model="genre"
                    dense
                    hide-selected
                    label="장르"
                    small-chips
                    outlined
                    prepend-icon="face"
                    :items="genres"
                    :rules="genreRules"
                    required>
                </v-select>
                <!-- 장르 끝 -->

                <!-- 주제  -->
                <v-select
                    :disabled="disabled"
                    v-model="concept"
                    hide-selected
                    dense
                    label="주제"
                    small-chips
                    outlined
                    prepend-icon="redeem"
                    :items="concepts"
                    :rules="conceptRules"
                    required>
                </v-select>
                <!-- 주제 끝 -->

                <!-- 부위  -->
                <v-select
                    :disabled="disabled"
                    v-model="part"
                    hide-selected
                    dense
                    label="부위"
                    small-chips
                    outlined
                    prepend-icon="pan_tool"
                    :items="parts"
                    :rules="partRules"
                    required>
                </v-select>
                <!-- 부위 끝 -->

                <!-- 해시태그  -->
                <v-combobox
                    :disabled="disabled"
                    v-model="hashtag"
                    hide-selected
                    label="해시태그"
                    multiple
                    dense
                    small-chips
                    outlined
                    prepend-icon="tag"
                    :delimiters="[' ', ',']"
                    hint="최대 3개 까지">
                </v-combobox>
                <!-- 해시 태그 끝 -->
                </v-form>
            </v-col>

            <!-- 스낵바 -->
            <snack-bar type="writeModifyCancel" v-if="snackbar"></snack-bar>
            <!-- 스낵바 끝 -->
        </v-row>
    </div>
</template>

<script>
import appbar from '../../components/appbar'
import { dbUpdate } from '../../firebase';
import { mapGetters, mapMutations, mapActions } from 'vuex'
import firebase from 'firebase/app'
import imgView from '../../components/imgView'
import snackBar from '../../components/snackBar'

export default {
    components:{
        appbar,
        imgView,
        snackBar,
    },
    mounted(){
       
        this.title = this.writeModifyTitle
        this.content = this.writeModifyContent

        this.genre = this.writeModifyGenre
        this.concept = this.writeModifyConcept
        this.part = this.writeModifyPart
        this.hashtag = this.writeModifyHashTag
    },
    watch:{
        title(){
            this.setWriteModifyTitle(this.title)
        },
        content(){
            this.setWriteModifyContent(this.content)
        },
        snackbar(){
            if(this.snackbar === true){
                setTimeout(() => {
                this.snackbar = false
                }, 2000)
            }
        },

        genre(){
            this.setWriteModifyGenre(this.genre)
        },
        concept(){
            this.setWriteModifyConcept(this.concept)
        },
        part(){
            this.setWriteModifyPart(this.part)
        },
        // 입력 폼 관련 로직(규칙)
        hashtag (val) {
            if (val.length > 3) {
                this.$nextTick(() => this.hashtag.pop())
            }
            this.setWriteModifyHashTag(this.hashtag)
        },  
    },
    computed: {
        next(){
            return this.writeModifyImg.length !== 0 && this.valid
        },
        
        ...mapGetters({
            //init
            userProfile: 'getUserProfile',
            writeModifyImg: 'getWriteModifyImg',
            titleRules: 'getTitleRules', // write.js
            contentRules: 'getContentRules', // write.js

            writeModifyTitle: 'getWriteModifyTitle',
            writeModifyContent: 'getWriteModifyContent',

                        // 이미 저장된 내용
            genres: 'getGenres', // commons.js
            concepts: 'getConcepts', // commons.js
            parts: 'getParts', // commons.js

            genreRules: 'getGenreRules', // write.js
            conceptRules: 'getConceptRules', // write.js
            partRules: 'getGenreRules', // write.js


            writeModifyGenre: 'getWriteModifyGenre',
            writeModifyConcept: 'getWriteModifyConcept',
            writeModifyPart: 'getWriteModifyPart',
            writeModifyHashTag: 'getWriteModifyHashTag',
        }),

        type() {
        if(this.$route.params.id === 'new'){
            return 'write'
        }else{
            return 'modify'
        }
        },
    },
    data(){
        return{
            // 이미지 관련 변수
            uploadedImg:[],
            disabled:false,

            cancel: true,

            snackbar: false,

            // 입력 관련 변수
            title: '',
            content: '',
            genre: '',
            concept: '',
            part: '',
            hashtag: '',

            valid: false,
            imgVisible: false, // 수정으로들어왔을때, img-view 컴포넌트가 좀 나중에 떠야 props로 제대로 변수값을 넘겨주기 가능
        }
    },
    methods:{

        fileUpdate(imgList) {
            this.setWriteModifyImg(imgList)
        },
        ...mapMutations({
            setWriteModifyImg: 'setWriteModifyImg',
            setWriteModifyTitle: 'setWriteModifyTitle',
            setWriteModifyContent: 'setWriteModifyContent',
            setWriteModifyImg: 'setWriteModifyImg',
            setWriteModifyGenre: 'setWriteModifyGenre',
            setWriteModifyConcept: 'setWriteModifyConcept',
            setWriteModifyPart: 'setWriteModifyPart',
            setWriteModifyHashTag: 'setWriteModifyHashTag',
        }),
        ...mapActions({
            fetchUserProfile: 'fetchUserProfile', // commons.js
            fetchArts: 'fetchArts',
        }),

        async clickNext(){
            this.disabled = true
            this.$router.push('/artwrite2/' + this.$route.params.id)
        },
        clickCancel(){
            console.log('취소')
            this.snackbar = true
        }
    }

}
</script>

<style>

</style>