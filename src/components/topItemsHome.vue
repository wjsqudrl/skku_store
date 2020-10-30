<template>
<v-col style="padding:0px;">
    <swiper :options="swiperOptionTop" style="width:100%;">
    <swiper-slide v-for="item in topItems" :class="item.class" :key="item.name">
        <v-card :height="winHeight / 11 * 3" class="black" style="padding:0px; width:100%;"> 
            <top-items-home-img :item="item"></top-items-home-img>
        </v-card>
    </swiper-slide>
    <div class="swiper-pagination swiper-pagination-white" slot="pagination"></div> 
    </swiper>

</v-col>
</template>
<script>
import { mapGetters } from 'vuex'
import { dbRead, dbQuery, appContents } from '../firebase'
import topItemsHomeImg from './topItemsHomeImg'
import bus from '../utils/bus'

export default {
    components:{
        topItemsHomeImg
    },
    data() {
        return {
            winHeight: '',            
            swiperOptionTop: {
                slidesPerView: '1',
                spaceBetween: 2,
                effect: 'fade',
                speed: 1000,
                pagination: {
                el: '.swiper-pagination',
                clickable: true,
                dynamicBullets: true
                },
            },          
            topItems:[],
        }
    },
    computed: {
        
    },
    async created(){
        await bus.$emit('start:spinner')
        this.winHeight =  window.innerHeight || document.body.clientHeight

    },
    async mounted(){
        this.$store.commit('changeNavBtnDisabled')
        let a = await appContents.doc('img').get()
        // console.log(a.data().home.topItems)
        await a.data().home.topItems.forEach((item,i) =>{
            this.topItems.push({url:item, name:i, class:'slide-'+i})
        })
        await bus.$emit('end:spinner')
        this.$store.commit('changeNavBtnDisabled')
    }

}
</script>
