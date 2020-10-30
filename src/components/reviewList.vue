<template>
    <v-card flat v-if="reviews">
        <v-card-title>
            리뷰 {{ reviews.length }} 개
            <v-spacer></v-spacer>
            <v-btn v-if="currentUser" :disabled="disabled || navBtnDisabled" color="grey" rounded outlined @click="clickBtn">리뷰 쓰기</v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
            <v-row>
                <v-col cols="12" v-for="review in reviews" :key="review.id">
                    <review-card :review="review"></review-card>
                </v-col>
            </v-row>
        </v-card-text>
    </v-card>
</template>

<script>
import reviewCard from './reviewCard'
import { mapGetters, mapMutations, mapActions } from 'vuex';

export default {
    props: ['reviews'],
    data(){
        return {
            disabled: false,
        }
    },
    components: {
        reviewCard
    },
    computed: {
        ...mapGetters({
            currentUser: 'getCurrentUser',
            navBtnDisabled: 'getNavBtnDisabled'
        })

    },
    methods: {
        clickBtn(){
            this.disabled = true
            this.setWriteIdFromArt(this.$route.params.writeId)
            this.fetchArtAuthorUid(this.$route.params.writeId)
            this.$router.push('/reviewwrite/new')
            
        },
        ...mapMutations({
            setWriteIdFromArt: 'setWriteIdFromArt', // reviewwrite.js
        }),
        ...mapActions({
            fetchArtAuthorUid: 'fetchArtAuthorUid',
        }),
    },
    created(){
    }

}
</script>

<style>

</style>