<template>
        <v-row class="black">
            <v-col @click.stop="$router.push('/art/' + item.id)"  style="padding:0px 1px 0px 1px; margin:0px;" class="card" v-for="(item, i) in arts" :key="item.writeId" cols="6">
                <v-card text style="padding:5px;" tile class="black">
                    <v-spacer></v-spacer>
                    <card-list-img :item="item">
                        <favorite-btn :item="item"></favorite-btn>
                    </card-list-img>
                    <v-card-title class='d-inline-block text-truncate' style="max-width: 100%; font-weight:600; font-size: 1rem; padding:0rem; padding-top:0.5rem; line-height: 1.2rem">
                        
                        <!-- <v-spacer></v-spacer>  -->
                        {{ item.title }}
                        
                    </v-card-title>
                    <v-card-text style="color:rgb(130, 130, 130); font-size:9px; font-weight:500;">
                        <v-row align="center" style="margin:0px; line-height:1px; margin-left:-4px;">
                            <!-- <v-col cols="1" style="padding:0px 2px 2px 3px;"><v-icon style="color:rgb(130, 130, 130); font-size:9px;">visibility</v-icon></v-col>
                            {{item.hits}} -->
                            <!-- <v-col cols="1" style="padding:0px 0px 0px 0px;"></v-col> -->
                            <v-col cols="1" style="padding:0px 0px 2px 4px;"><v-icon style=" font-weight:600; color:rgb(130, 130, 130); font-size:9px;">favorite_border</v-icon></v-col>
                            <num-likes :item="item"></num-likes>
                        </v-row>
                    </v-card-text>
                    <v-list dense class="black" style="padding:0 0 0 0;">
                        <v-list-item style="padding:0 0 0 0; min-height: 30px;">
                            <v-list-item-content style="padding:12px 0 0 0; min-height: 30px; font-weight:600; font-size: 1rem; color:#FF2E8E; " >
                                {{ item.price }}만원 
                                <!-- <v-list-item-title style="width:100%; white-space:inherit;">
                                    {{ item.displayName }}
                                    <v-chip v-show="false" small v-for="tag in item.tag">#{{ tag }}</v-chip>
                                </v-list-item-title> -->
                                
                                <!-- <v-list-item-subtitle>
                                    장소: {{ item.location }}
                                </v-list-item-subtitle> -->

                                <!-- <v-list-item-subtitle class="" style="font-weight:600; font-size: 1rem; color:#e91e63; ">
                                    {{ item.price }}만원
                                </v-list-item-subtitle> -->
                            </v-list-item-content>  
                            <v-list-item-action>
                                <!-- <v-icon>star</v-icon> -->
                            </v-list-item-action>
                        </v-list-item>
                    </v-list>
                    <v-card-text style="font-size:10px; padding: 0px 0px 12px 0px;">
                        <!-- <v-icon style="color:#2ECFFF; font-size:0.8rem; line-height:1.2rem;">star</v-icon> {{ item.rating !== 0 ? item.rating : '' }} -->
                        <v-row align="center" style="margin:0px;">
                            <v-col align="start" cols="1" style="padding:0px;"><v-icon style="color:#2ECFFF; font-size:15px; line-height:1.2rem;">star</v-icon></v-col>
                            <v-col cols="2" style="padding:0px 0px 0px 2px">
                                <rating :item="item"></rating>
                            </v-col>
                            <v-col cols="9">
                            </v-col>
                        </v-row>
                    </v-card-text>                   
                </v-card>
            </v-col>
        </v-row>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import favoriteBtn from './favoriteBtn'
import { dbRead, dbQuery} from '../firebase'
import numLikes from './numLikes'
import cardListImg from './cardListImg'
import rating from './rating'
export default {
    name:'cardList',
    computed:{
        ...mapGetters({
            currentUser: 'getCurrentUser',
        }),
    },
    components: {
        favoriteBtn,
        numLikes,
        cardListImg,
        rating
        
    },
    data(){
        return {
            items: [],
        }
    },
    props: ['arts'],
    created(){
        
        if(this.currentUser === null){
            console.log('if')
            
        }else{
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
/* 이미지 둥글게 */
.rounded-img{
    border-radius: 12px 12px 12px 12px;
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