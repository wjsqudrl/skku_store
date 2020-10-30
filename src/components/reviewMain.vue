<template>
    <v-card flat>
        <!-- author 정보 시작 -->
        <v-card-title>
            <v-row>
                <v-col cols="12">
                    <avatar-list :forUser="forUser" :authorProfile="authorProfile" :type="type">
                        <dot-vertical v-if="isAuthor" :item="reviewDoc" :type="type"></dot-vertical>
                    </avatar-list>
                </v-col>
                <v-col cols="12" style="margin-top:-50px;">
                    <!-- 평점 시작 -->
                    <v-rating background-color="grey" color="yellow" half-increments small :value="reviewDoc ? reviewDoc.data().rating : null" readonly ></v-rating>                
                    <!-- 평점 끝 -->
                </v-col>
            </v-row> 
        </v-card-title>
        <!-- author 정보 끝 -->
            
        <!-- 작품 컨텐츠 시작 -->
        <v-card-text v-if="reviewDoc"> 
            <!-- 이미지 시작 -->
            <v-card flat
                max-width="100%"
                class="mx-auto">
                <v-carousel height="300px">
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
                
            <!-- 컨텐츠 시작 -->
            
            <v-list>
                <!-- 좋아요 시작 --> 
                <v-list-item>
                    <v-spacer></v-spacer>
                    <num-hit :item="reviewDoc" :type="type"></num-hit>
                </v-list-item>
                <!-- 좋아요 끝 -->
            </v-list>
        </v-card-text>
    </v-card>
</template>

<script>
import avatarList from '../components/avatarList'
import dotVertical from '../components/dotVertical'
import numHit from '../components/numHit'
import { mapGetters } from 'vuex'
export default {
    props: ['authorProfile', 'isAuthor', 'reviewDoc'],
    components: {
        avatarList,
        dotVertical,
        numHit,
    },
    data() {
        return {
            type: 'review',
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
            return this.reviewDoc.data().thumbReviewMain ? this.reviewDoc.data().thumbReviewMain : this.reviewDoc.data().img
        }
    }
}
</script>

<style>

</style>