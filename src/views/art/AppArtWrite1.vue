<template>
    <div>
        <appbar :arrow="arrow" :next="next" @clickNext="clickNext">{{ type === 'write' ? '글 쓰기' : '글 수정하기' }}</appbar>
        <v-row>

        </v-row>
    </div>
</template>

<script>
import appbar from '../../components/appbar'
import { dbUpdate } from '../../firebase';
import { mapGetters, mapMutations, mapActions } from 'vuex'
import firebase from 'firebase/app'
import imgView from '../../components/imgView'
import VueHashtagTextarea from 'vue-hashtag-textarea';

export default {
    components:{
        appbar,
        imgView,
        VueHashtagTextarea,
    },
    watch:{
        title(){
            this.setWriteModifyTitle(this.title)
        },
        content(){
            this.setWriteModifyContent(this.content)
        },
        locationSelected(){
            this.setWriteModifyLocationSelected(this.locationSelected)
        }
    },
    mounted(){
         
        this.title = this.writeModifyTitle
        this.content = this.writeModifyContent
        this.locationSelected = this.writeModifyLocationSelected
    },
    computed: {
        next(){
            return this.valid && this.locationSelected.length !== 0
        },
        ...mapGetters({
            //init
            userProfile: 'getUserProfile',
            locations: 'getLocations',
            titleRules: 'getTitleRules',
            contentRules: 'getContentRules',
            writeModifyTitle: 'getWriteModifyTitle',
            writeModifyContent: 'getWriteModifyContent',
            writeModifyLocationSelected: 'getWriteModifyLocationSelected'
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
            valid: true,

            // 이미지 관련 변수
            uploadedImg:[],
            disabled:false,
            arrow:true,

            // 입력 관련 변수
            title: '',
            content: '',
            locationSelected: '',
            }
    },

    beforeDestroy(){
        // 
    },
    methods:{
        //  onChangeHashtag(info) {   
        //     console.log(info)   
        // },
        // onSelectHashtag(target) {
        //     console.log(target)      
        // },
        // onSelectItem(item) {      
        //     this.$refs.vueHashtagTextarea.pushHashtagNodeContent(item.content + ' ')
        // },
        ...mapMutations({
            setWriteModifyTitle: 'setWriteModifyTitle',
            setWriteModifyContent: 'setWriteModifyContent',
            setWriteModifyLocationSelected: 'setWriteModifyLocationSelected',
        }),
        ...mapActions({
            fetchUserProfile: 'fetchUserProfile', // commons.js
        }),

        async clickNext(){
            this.disabled = true
            this.$router.push('/artwrite2/' + this.$route.params.id)
        }
    }

}
</script>

<style>

</style>