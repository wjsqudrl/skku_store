<template>
    <v-card flat style="padding:0px" class="black">
        <v-card-title style="padding:0px 0px 13px 17px; font-size:18px;" class="font-weight-black">
            수리후기
        </v-card-title>
        <v-card-text style="padding:0px 0px 0px 0px;">
            <swiper class="swiper" :options="swiperOption" style="padding:0px 18px 0px 10px;">
                <swiper-slide v-for="item in newTattooItems" :key="item.id">
                    <v-card class="black inner" tile style="padding:0px 0px 0px 4px;">
                        <art-swipe-new-tattoo-img :item="item"></art-swipe-new-tattoo-img>
                        <v-card-title class="artTitle d-inline-block font-weight-bold" style="color:#BCBCBC; padding:0px 0px 0px 5px; font-size:14px;">
                            {{ item.title}}
                        </v-card-title>
                        <v-card-text class="likeFavorite" style="padding:0px 0px 0px 6px; ">
                            <v-row align="start" justify="start" style="margin:-9px 0px 0px 0px; font-size:11px;">
                                <!-- <v-col align="start" justify="start" cols="1" style="margin-top:-1px; margin-right:1px; padding:0px 4px 0px 0px;"><v-icon style="color:#BCBCBC; font-size:14px;">visibility</v-icon></v-col>
                                {{item.hits}} -->
                                <!-- <v-col cols="1" style="padding:0px 0px 0px 0px;"></v-col> -->
                                <v-col align="left" justify="start" cols="8" style="margin-top:0px; margin-right:0px; padding:0px 0px 0px 4px; font-size:11px; color:#FF2E8E;" class="font-weight-bold">
                                    {{Math.floor((date.getTime()/1000- item.createdAt.seconds)/3600/24)}}일전
                                </v-col>
                                <!-- {{new Date()}} -->
                            </v-row>
                        </v-card-text>
                    </v-card>
                </swiper-slide>
            </swiper>
        </v-card-text>
    </v-card>
</template>
<script>
import { mapGetters } from 'vuex'
import artSwipeNewImg from './artSwipeNewImg'

export default {
    components:{

        artSwipeNewImg
    },
    props:['num', 'items'],
    data() {
        return {              
            swiperOption: {
                newTattooItems:[],
                freeMode: true,
                slidesPerView: this.num,
                centeredSlides: false,
                spaceBetween: 7,
                speed: 10,
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true
                }
            },
            date: new Date(),
            
        }
    },
    computed: {
        ...mapGetters({
            artsItems: 'getArtsItems', // commons.js
        }),
        
    },
    created(){
        this.newTattooItems = this.artsItems.sort((t1,t2) => t1.createdAt > t2.createdAt ? -1 : 1)
        this.newTattooItems = this.newTattooItems.slice(0, 12)
    }

}
</script>

<style scoped>
.inner {
    transition: transform 0.3s;
}
.inner:hover {
    -webkit-transform: scale(0.92);
    -ms-transform: scale(0.92);
    transform: scale(0.92)
}
.artTitle{
    width:120px;
    overflow: hidden;
    text-overflow: ellipsis;
    /* word-wrap: break-word; */
    white-space:nowrap;
}
.trendy{
    width:185px;
    overflow: hidden;
    text-overflow: ellipsis;
    /* word-wrap: break-word; */
    white-space:nowrap;
}
.v-card__text .likeFavorite{
    font-size:8px !important;
}
</style>