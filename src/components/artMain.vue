<template>
    <v-card flat>
        <!-- author 정보 시작 -->
        <v-card-title>
            <v-row>
                <v-col>
                    <avatar-list :forUser="forUser" :authorProfile="authorProfile" :type="type">
                    <dot-vertical v-if="isAuthor" :item="artDoc" :type="type"></dot-vertical>
                    </avatar-list>
                </v-col>
            </v-row>
        </v-card-title>
        <!-- author 정보 끝 -->
        <!-- 작품 컨텐츠 시작 -->
        <v-card-text v-if="artDoc">
            <!-- 이미지 시작 -->
            <v-card flat
                max-width="100%"
                class="mx-auto">
                <v-carousel height="300px" :hide-delimiters="imgItems.length === 1 ? true : false" :show-arrows="imgItems.length === 1 ? false : true">
                    <v-carousel-item
                        v-for="(item,i) in imgItems"
                        :key="i"
                    >
                    <v-img class="grey darken-4" aspect-ratio="1" :src="item.url">
                    </v-img>
                    </v-carousel-item>
                </v-carousel>
            </v-card>
            <!-- 이미지 끝 -->
                
            <!-- 컨텐츠 시작 -->
            
            <v-list>
                <!-- 좋아요 시작 -->
                <v-list-item > 
                    <v-row align="center">
                        <v-col align="left" cols="4">
                            <favorite-btn v-show="currentUser" :item="artDoc"></favorite-btn>
                        </v-col>
                        <v-col align="right" cols="4">
                            <num-favorite :item="artDoc"></num-favorite>
                                    
                        </v-col>
                        <v-col align="left" cols="4">
                            <num-hit :item="artDoc" :type="type"></num-hit>
                        </v-col>
                    </v-row>
                </v-list-item>
                <!-- 좋아요 끝 -->

                <!-- 태그 시작 -->
                <v-list-item>                    
                <v-row>
                    <v-col>
                        <v-chip style="margin-right:3px" @click="$router.push('/search/' + tag)" v-for="(tag, i) in artDoc.data().hashtag" :key="i">#{{ tag }}</v-chip>
                    </v-col>
                </v-row>
                </v-list-item>
                <!-- 태그 끝 -->

            </v-list>
        </v-card-text>
    </v-card>
</template>

<script>
import avatarList from '../components/avatarList'
import dotVertical from '../components/dotVertical'
import favoriteBtn from '../components/favoriteBtn'
import numFavorite from '../components/numFavorite'
import numHit from '../components/numHit'
import { mapGetters } from 'vuex'

export default {
    props: ['authorProfile', 'isAuthor', 'artDoc'],
    components: {
        avatarList,
        dotVertical,
        favoriteBtn,
        numFavorite,
        numHit,
    },
    created(){
    },
    data() {
        return {
            type: 'art',
            forUser: false,
            swiperOption: {
                pagination: {
                el: '.swiper-pagination',
                dynamicBullets: true,
                // clickable: true 
                }
            },
        }
    },
    computed: {
        ...mapGetters({
            userProfile: 'getUserProfile',
            currentUser: 'getCurrentUser'
        }),
        imgItems(){
            console.log('artDoc')
            return this.artDoc.data().thumbArtArt ? this.artDoc.data().thumbArtArt : this.artDoc.data().img
        }
    }
}
</script>

<style>
</style>