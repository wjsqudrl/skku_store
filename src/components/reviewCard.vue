<template>
<!-- div 안에 v-if 코드가 있어야 렌더링? 에러가 안뜸 -->
<div v-if="review.data().img">
    
    <v-card flat class="black" >
        
        
        <v-card-text style="padding-bottom:0px;">
            <v-row>
                <v-col cols="2" align="right" justify="center" v-if="userAvatarUrl">
                    <v-avatar>
                        <v-img class="grey darken-4" :src="userAvatarUrl"></v-img>
                    </v-avatar>
                </v-col>
                <v-col cols="2" align="right" justify="center" v-else>
                    <v-icon x-large>account_circle</v-icon>
                </v-col>
                
                <v-col style="margin-left:-10px;margin-top:-3px" cols="7" align="left" justify="center">
                    <v-col cols="12">
                        {{  displayName.slice(0,1) + '*****' }}
                    </v-col>
                </v-col>
                <v-col align="right" justify="center" cols="3">
                    <v-btn text fab x-small @click.stop="$router.push('/review/' + review.id)">
                        <v-icon>keyboard_arrow_right</v-icon>
                    </v-btn>
                </v-col>

                <v-col style="margin-top:-15px; margin-left:-20px" cols="7" align="right" justify="center">
                        <v-rating background-color="grey" color="yellow" half-increments small :value="review ? review.data().rating : null" readonly ></v-rating>                
                </v-col>
                <v-col style="margin-top:-15px; margin-left:-10px" align="left" justify="center" class="caption" cols="5">
                    {{ review ? dt : null }}
                </v-col>
            </v-row>
        </v-card-text>

        <v-card-text v-if="review ? review.data().img[0] ? true : false : false" style="padding:0px 16px 0px 16px">
            <v-img class="grey darken-4" aspect-ratio="2" :src="review.data().thumbReviewCardList ? review.data().thumbReviewCardList[0].url : review.data().img[0] ? review.data().img[0].url : ''"></v-img>
        </v-card-text>
        <v-card-text v-if="review ? review.data().content ? true : false : false">
            {{ review ? review.data().content ? review.data().content : '' : ''}}
        </v-card-text>
    </v-card>
    
</div>
</template>

<script>
import { dbRead, dbQuery } from '../firebase'

export default {
    props: ['review'],
    data(){
        return{
            // dbQuery:null,
            displayName:'',
            userAvatarUrl:'',
        }
    },
    computed: {
        dt() {
            return this.dateTimeToFormatted(this.review.data().createdAt.toDate())
        },
        // checkDisplayName(){
        //     return this.displayName !== ''
        // },
        // checkUserAvatarUrl(){
        //     return this.userAvatarUrl !== ''
        // }
    },
    methods:{
        dateTimeToFormatted(dt) {
            let min = 60 * 1000;
            let c = new Date()
            let d = new Date(dt);
            let minsAgo = Math.floor((c - d) / (min));

            let result = {
                'raw': d.getFullYear() + '-' + (d.getMonth() + 1 > 9 ? '' : '0') + (d.getMonth() + 1) + '-' + (d.getDate() > 9 ? '' : '0') +  d.getDate() + ' ' + (d.getHours() > 9 ? '' : '0') +  d.getHours() + ':' + (d.getMinutes() > 9 ? '' : '0') +  d.getMinutes() + ':'  + (d.getSeconds() > 9 ? '' : '0') +  d.getSeconds(),
                'formatted': '',
            };

            if (minsAgo < 60) { // 1시간 내
                result.formatted = minsAgo + '분 전';
            } else if (minsAgo < 60 * 24) { // 하루 내
                result.formatted = Math.floor(minsAgo / 60) + '시간 전';
            } else { // 하루 이상
                result.formatted = Math.floor(minsAgo / 60 / 24) + '일 전';
            };

            return result.formatted;
        },
        async settings(a){
            this.displayName = a[0].data().displayName
            this.userAvatarUrl = a[0].data().userAvatarUrl ? a[0].data().thumbAvatar ? a[0].data().thumbAvatar : a[0].data().userAvatarUrl : null
        }

    },
    async created(){
        let a = await dbQuery('userProfiles', 'uid', '==', this.review.data().authorUid)
        // await console.log(a[0])
        await this.settings(a)
        // await console.log(this.displayName)
        // await console.log(this.userAvatarUrl)
        // let a = await dbQuery('userProfiles', 'uid', '==', this.review.data().authorUid)
        // this.dbQuery=a[0].data()
        // this.displayName = a[0].data().displayName
        // this.userAvatarUrl = a[0].data().userAvatarUrl ? a[0].data().thumbAvatar ? a[0].data().thumbAvatar : a[0].data().userAvatarUrl :null
        // console.log(this.userAvatarUrl)
    }

}
</script>

<style scoped>

</style>