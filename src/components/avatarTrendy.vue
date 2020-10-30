<template>
    <v-img v-if="thumbAvatar ? true : false" class="white" style="border-style: solid; border-width: 1px; border-radius:5px; width:40px; height:40px;" :src="thumbAvatar"></v-img>
    <v-img v-else class="white" style="border-style: solid; border-width: 1px; border-radius:5px; width:40px; height:40px;">
        <!-- <v-avatar style="width:40px; height:40px;" :color="nickNameColor"> -->
            <!-- 만약 저장된 아바타가 없다면 그냥 아이콘 -->
        <v-img :style="{background:nickNameColor}" style="width:40px;height:40px;padding:0px;align-items:center;text-align:center;">
            <span style="" class="white--text headline">{{nickName}}</span>
        <!-- </v-avatar> -->
        </v-img>
    </v-img> 
</template>

<script>
import { dbRead, dbQuery } from '../firebase'
import bus from '../utils/bus'

export default {
    data(){
        return{
            thumbAvatar: '',
            nickNameColor:'',
            nickName:'',
        }
    },
    props:['item'],
    computed: {
        // backgroudColor(){
        //     return this.nickNameColor ? this.authorProfile.data().nickNameColor ? this.authorProfile.data().nickNameColor : null : null
        // },
        // nickName(){
        //     return this.authorProfile ? this.authorProfile.data().displayName ? this.authorProfile.data().displayName.substring(0,1) : "TU": null
        // },
    },
    async created(){
        await bus.$emit('start:spinner')
        
        let b = await dbQuery('userProfiles', 'uid', '==', this.item.authorUid)
        this.thumbAvatar = b[0].data().thumbAvatar ? b[0].data().thumbAvatar : b[0].data().userAvatarUrl 
        this.nickNameColor = b[0].data().nickNameColor ? b[0].data().nickNameColor : "#E91E63"
        this.nickName = b[0].data().displayName ? b[0].data().displayName.substring(0,1) : "TU"
    },
    async mounted(){
        await bus.$emit('end:spinner')
    }  

}
</script>

<style>

</style>