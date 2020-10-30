<template>
    <div>
        <appbar :arrow="arrow" :writeModify="writeModify" @clickWriteModify="clickWriteModify">{{ type === 'write' ? '글 쓰기' : '글 수정하기' }}</appbar>
        
        <v-row>

        </v-row>
    </div>
</template>

<script>
import appbar from '../../components/appbar'
import { dbRead, dbWrite, dbUpdate } from "../../firebase.js";
import { mapGetters, mapMutations, mapActions } from 'vuex'
import firebase from 'firebase/app'
import imgView from '../../components/imgView'

export default {
    components:{
        appbar,
        imgView,
    },
    watch:{
    },
    computed: {

        ...mapGetters({
            //init
            currentUser: 'getCurrentUser',
            userProfile: 'getUserProfile',

            writeModifyImg: 'getWriteModifyImg',
            writeModifyTitle: 'getWriteModifyTitle',
            writeModifyContent: 'getWriteModifyContent',
            writeModifyLocationSelected: 'getWriteModifyLocationSelected',
            writeModifySize: 'getWriteModifySize',
            writeModifyPrice: 'getWriteModifyPrice',
            writeModifyTimeExpected: 'getWriteModifyTimeExpected',
            writeModifyNumExpected: 'getWriteModifyNumExpected',



        }),

        type() {
        if(this.$route.params.id === 'new'){
            return 'write'
        }else{
            return 'modify'
        }
        },
        writeModify(){
            return this.valid
        }
    },
    mounted(){
         
        this.genre = this.writeModifyGenre
        this.concept = this.writeModifyConcept
        this.part = this.writeModifyPart
        this.hashtag = this.writeModifyHashTag
    },
    data(){
        return{
            // 이미지 관련 변수
            disabled:false,

            uploadedImg:[],
            disabled:false,
            arrow:true,
            
            

            valid:false,
        }


    },

    beforeDestroy(){
        // 
    },
    methods:{
        
        

        ...mapMutations({
        }),

        ...mapActions({
        }),
    }

}
</script>

<style>

</style>