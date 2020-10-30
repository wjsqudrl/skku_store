<template>
    <v-row class="black">
        <v-col @click.stop="$router.push('/art/' + item.id)" style="margin:-10px -5px -10px -5px;" v-for="(item, i) in arts" :key="item.id" cols="12">
            <v-card style="padding:0px 0px 0px 0px;margin-bottom:0px;" class="black" tile elevation="12">
                <v-row style="margin:0px 0px 0px 0px;">

                    <v-col cols="5" style="padding:13px 0px 0px 10px;">
                        <card-list-small-img :item="item"></card-list-small-img>
                    </v-col>
                    
                    <v-col cols="7" style="padding:10px 0px 0px 10px;">
                        <v-card-title class='d-inline-block text-truncate' style="max-width: 100%; font-weight:600; font-size: 1rem; padding:0; padding-top:0.6rem; line-height: 1.3rem">
                            {{ item.title }}                        
                        </v-card-title>
                        <v-card-text style="color:rgb(130, 130, 130); font-size:9px; font-weight:500;">
                            <v-row align="center" style="margin:0px; line-height:1px; margin-left:-5px;">
                                <!-- <v-col cols="1" style="padding:0px 2px 2px 4px;"><v-icon style="color:rgb(130, 130, 130); font-size:9px;">visibility</v-icon></v-col>
                                {{item.hits}} -->
                                <!-- <v-col cols="1" style="padding:0px 0px 0px 0px;"></v-col> -->
                                <v-col cols="1" style="padding:0px 0px 2px 5px;"><v-icon style=" font-weight:600; color:rgb(130, 130, 130); font-size:9px;">favorite_border</v-icon></v-col>
                                <num-likes :item="item"></num-likes>
                            </v-row>
                        </v-card-text>
                        <v-list dense class="black" style="padding:0 0 0 0;">
                            <v-list-item style="padding:0 0 0 0; min-height: 30px;">
                                <v-list-item-content style="padding:12px 0 0 0; min-height: 30px; font-weight:600; font-size: 1rem; color:#FF2E8E; " >
                                    {{ item.price }}만원 
                                    
                                </v-list-item-content>  
                                <v-list-item-action>
        
                                </v-list-item-action>
                            </v-list-item>
                        </v-list>
                        <!-- #00FFA7 -->
                        <!-- <v-card-text style="line-height: 1.5rem;"> -->
                            
                            <!-- <v-btn disabled outlined style="padding:0px;">무료타투</v-btn> -->
                            <!-- <v-icon style="color:#00FFA7; font-size:15px;">star</v-icon> <v-text style="font-size:12px;">{{ item.rating !== 0 ? item.rating : '' }}</v-text> -->
                        <!-- </v-card-text> -->
                        <v-card-text style="line-height: 2.3rem; font-size:10px;">
                            <v-row>
                                <v-col cols="12" style="padding-top:0px; padding-bottom:0px; margin:0px">
                                    <v-row align="center" style="margin:0px;">
                                        <v-col align="start" cols="1" style="padding:0px 0px 4px 0px;"><v-icon style="color:#2ECFFF; font-size:15px; line-height:1.2rem;">star</v-icon></v-col>
                                        <v-col cols="2" style="padding:0px 0px 0px 2px; ">
                                            <rating :item="item"></rating>
                                        </v-col>
                                        <v-col cols="9">
                                        </v-col>
                                    </v-row>
                                </v-col>
                                <v-col cols="12" align="end" style="padding: 0px 10px 0px 0px; margin:0px">
                                    <favorite-btn style="align-items: right;" :item="item"></favorite-btn>
                                </v-col>
                            </v-row>
                        </v-card-text>
                    </v-col>
                </v-row>
                <v-divider style="border-color:#333333; color:#333333;margin-top:0px"></v-divider>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import favoriteBtn from './favoriteBtn'
import { dbRead, dbQuery} from '../firebase'
import numLikes from './numLikes'
import cardListSmallImg from './cardListSmallImg'
import rating from './rating'
export default {
    name:'cardListSmall',
    computed:{
        ...mapGetters({
            currentUser: 'getCurrentUser',
        }),
    },
    components: {
        favoriteBtn,
        cardListSmallImg,
        numLikes,
        rating
    },
    data(){
        return {
            items: [],
            loadingImg: true,
        }
    },
    props: ['arts'],
    created(){
        
        if(this.currentUser === null){
            console.log('if')
            
        }else{
            console.log('else')
            //this.arts = this.arts.sort((t1,t2) => t1.createdAt > t2.createdAt ? -1 : 1)
        }
        
    },
    methods:{
    ...mapMutations({
      changeGridNum: 'changeGridNum',
    }),
    }
}
</script>

<style scoped>

/* 무료타투 버튼 */
.v-btn:not(.v-btn--text):not(.v-btn--outlined):hover:before {
    opacity: 0;
}
.inner {
    transition: transform 0.3s;
}
.inner:hover {
    -webkit-transform: scale(0.95);
    -ms-transform: scale(0.95);
    transform: scale(0.95)
}

.card{
    padding:20px;
    margin-top:14px;
}
/* 조회수, 좋아요 card-text */
.v-card__text{
    padding:0px 0px 0px 0px;
    line-height: 0rem;
    align-items: baseline;
}
/* 조회수, 좋아요 아이콘 높낮이 조절 */
.v-icon.v-icon{
    line-height: 0.02;
    align-items: center;
}
.text-ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  word-wrap: break-word;
}

</style>