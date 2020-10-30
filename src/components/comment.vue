<template>

<div>
    <v-card flat>
    <v-card-title>댓글</v-card-title>
    <v-divider></v-divider>   
    <v-card-text>
        <comment-list v-for="comment in comments" :comment="comment" :type="type" @deleteComment="deleteComment"></comment-list>
    </v-card-text>
    <v-card-actions>
        <v-text-field :disabled="disabled || currentUser ? false : true" @click:append-outer="addComments" :append-outer-icon="commentContent ? 'mdi-send' : ''" clearable dense outlined rounded ref="form" v-model="commentContent" :label="currentUser ? '댓글 작성' : '로그인이 필요합니다.'"></v-text-field>
    </v-card-actions>
    </v-card>

</div>
</template>

<script>
import { mapGetters } from 'vuex'
import { dbQuery } from '../firebase.js';
import commentList from '../components/commentList'
import bus from '../utils/bus';

export default {
    props: ['type'],
    components: {
        commentList
    },
    data() {
        return {
            disabled: false,
            // 코멘트 관련 변수
            // authorProfileQuery:[],
            comments: [], // 초기화
            commentContent: '',
        }
    },
    async created() {
        // 해당 작품의 코멘트를 받아옴
        await this.setComments()
    },
    methods: {
        deleteComment(){

            this.comments = []
            this.setComments()
        },
        // 코멘트 관련 로직
        async setComments() { // 글 코멘트 초기화
            console.log('setComments')
            this.$store.commit('changeNavBtnDisabled')
            if(this.type === 'art'){
                let querySnapshot = await this.$db.collection('arts').doc(this.$route.params.writeId).collection('comments').get()
                querySnapshot.forEach(doc => {
                    this.comments.push(doc)
                })
                // await console.log(this.comments)
                await this.comments.sort((t1,t2) => t1.data().createdAt < t2.data().createdAt ? -1 : 1)
            }else{
                let querySnapshot = await this.$db.collection('reviews').doc(this.$route.params.reviewId).collection('comments').get()
                querySnapshot.forEach(doc => {
                    this.comments.push(doc)
                })
                // await console.log(this.comments)
                await this.comments.sort((t1,t2) => t1.data().createdAt < t2.data().createdAt ? -1 : 1)
            }
            this.$store.commit('changeNavBtnDisabled')
        },

    async addComments() { // 코멘트 추가
         this.$store.commit('changeNavBtnDisabled')
        await bus.$emit('start:spinner')
        this.disabled = true
        let input = {
            authorEmail: this.userProfile.data().email,
            authorUid: this.userProfile.data().uid,
            content: this.commentContent,
            createdAt: new Date(),
            }
        if(this.type === 'art'){
            await this.$db.collection('arts').doc(this.$route.params.writeId).collection('comments').add(input)
        }else{
            await this.$db.collection('reviews').doc(this.$route.params.reviewId).collection('comments').add(input)
        }
        
        this.$refs.form.reset() // 폼 리셋
        this.comments = []
        this.setComments() // 코멘트 다시 받아옴
        this.disabled = false
        this.$store.commit('changeNavBtnDisabled')
        await bus.$emit('end:spinner')
        
    },
    
    },
    computed: {
        ...mapGetters({
                    
        // commons 변수들 초기화
        currentUser: 'getCurrentUser', // commons.js
        userProfile: 'getUserProfile'
        
        }),
    },

}
</script>

<style>

</style>