<template>
    <v-col :class="$vuetify.theme.isDark === true ? 'black' : 'white'" cols="12" style="padding:3px;">
        <v-card :class="$vuetify.theme.isDark === true ? 'black' : 'white'" flat style="padding:0px">
            <v-card-title style="padding:0px">
                <slot></slot>
            </v-card-title>
            <v-card-text style="padding:0px">
                <swiper :options="swiperOption">
                    <swiper-slide v-for="art in arts" :key="art.id">
                            <v-card class="inner" tile>
                                <v-img class="grey darken-4" @click.stop="$router.push('/art/' + art.id)" height="180px" aspect-ratio="0.8" :src="art.data().thumbArtHome ? art.data().thumbArtHome[0].url : art.data().img[0].url"></v-img>
                            </v-card>
                    </swiper-slide>
                </swiper>
            </v-card-text>
        </v-card>
    </v-col>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    props:['num'],
    data() {
        return {
            swiperOption: {
                slidesPerView: this.num,
                centeredSlides: false,
                spaceBetween: 2,
                speed: 0,
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true
                }
            }
        }
    },
    computed: {
        ...mapGetters({
            arts: 'getArts', // commons.js
        })
    },
    created(){
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
</style>