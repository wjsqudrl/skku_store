<template>
    <v-btn :disabled="disabled" icon v-show="currentUser" style="color:black;">
        <v-icon :disabled="disabled" @click.stop="likeOff(); " v-if="pink" color="#FF2E8E">
            favorite
        </v-icon>
        <v-icon :disabled="disabled" @click.stop="likeOn();" v-else color="#a18cd1">
            favorite_border
        </v-icon>
    </v-btn>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import { dbWrite, dbDelete, dbQuery, dbRead } from '../firebase.js';
import bus from '../utils/bus';

export default {
    props:['item'],
    data(){
        return {
            disabled: false,
        }
    },
    created() {
        // 좋아요 관련 로직
        if(this.currentUser !== null){
            this.fetchFavoritesDocsToArray(this.currentUser.uid) // favorite.js
        }
        
    },
    watch:{
        pink(){
            console.log('pink is changed')
            this.disabled = false
        }
    },
    computed: {
        pink(){
            return this.favoritesDocsToArray.filter(doc => doc.data().artId === this.item.id).length !== 0
        },
        ...mapGetters({
                    
        // 좋아요 관련 변수
        favoritesDocsToArray: 'getFavoritesDocsToArray', //favorite.js
        // commons 변수들 초기화
        currentUser: 'getCurrentUser', // commons.js
        
        }),
    },
    methods: {
        ...mapActions({
         // 좋아요 관련 로직
            fetchFavoritesDocsToArray: 'fetchFavoritesDocsToArray', //favorite.js
         }),
        async likeOn() {
             
            await bus.$emit('start:spinner') 
            // favorites에 doc 하나 생성
            this.disabled = true
            let input = {
                userUid: this.currentUser.uid,
                artId: this.item.id,
                createdAt: new Date()
            }
            await dbWrite('favorites', input)
            await this.fetchFavoritesDocsToArray(this.currentUser.uid)
            await bus.$emit('end:spinner') 
             
        },
        async likeOff() {
             
            await bus.$emit('start:spinner') 
            // favorites에서 해당 doc 하나 제거
            this.disabled = true
            let querySnapshot = await dbQuery('favorites', 'userUid', '==', this.currentUser.uid, 'artId', '==', this.item.id)
            await dbDelete('favorites', querySnapshot[0].id)
            await this.fetchFavoritesDocsToArray(this.currentUser.uid)
            await bus.$emit('end:spinner') 
             
        },
    }

}
</script>

<style scoped>
.v-btn--icon.v-size--default .v-icon{
    font-weight:599;
}

</style>