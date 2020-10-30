<template>
<div>
    <v-list>
    <v-list-item>
        <v-row>
        
            <v-col cols="3" @click="authorProfile ? $router.push('/artist/' + authorProfile.data().uid) : null">
                <v-avatar size="48" v-if="authorProfile ?  authorProfile.data().userAvatarUrl ? true : false : null">
                    <v-img class="grey darken-4" :src="authorProfile.data().userAvatarUrl" ></v-img>
                </v-avatar>
                <v-avatar size="48" v-else :color="backgroudColor">
                    <!-- 만약 저장된 아바타가 없다면 그냥 아이콘 -->
                    <span class="white--text headline">{{nickName}}</span>
                </v-avatar>
            
            </v-col>
            
            <v-col cols="7" @click="authorProfile ? $router.push('/artist/' + authorProfile.data().uid) : null">
                {{ authorProfile ? authorProfile.data().displayName : null}}                
            </v-col>

            <v-col cols="2">
                <dot-vertical v-if="isAuthor" :item="authorDoc" type="comment" @deleteComment="deleteComment"></dot-vertical>
            </v-col>

            <v-col cols="3">
                {{ authorDoc ? dt : null }}
            </v-col>
       
            <v-col cols="9">
                {{ authorDoc ? authorDoc.data().content : null }}
            </v-col>
        </v-row>
    </v-list-item>
    </v-list>
    <v-divider></v-divider>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import dotVertical from './dotVertical'
import IsAuthor from '../mixins/IsAuthor';


export default {
    mixins : [IsAuthor],
    props: ['comment', 'type'],
    components: {
        dotVertical,    
    },
    data(){
        return{
            authorProfile:'',
            authorDocType: this.type + '/comment',
        }
    },
    created(){
        console.log('comment-list')
    },
    computed: {
        ...mapGetters({
            userProfile: 'getUserProfile'
        }),
        dt() {
            return this.dateTimeToFormatted(this.authorDoc.data().createdAt.toDate())
        },
        backgroudColor(){
            return this.authorProfile ? this.authorProfile.data().nickNameColor ? this.authorProfile.data().nickNameColor : null : null
        },
        nickName(){
            return this.authorProfile ? this.authorProfile.data().displayName ? this.authorProfile.data().displayName.substring(0,1) : "TU": null
        },
    },
    methods: {
        deleteComment(){
            console.log('commentList.vue')
            this.$emit('deleteComment')
        },
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
	    }
    }

}
</script>

<style>

</style>