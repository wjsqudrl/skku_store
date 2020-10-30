<template>

<div> 
  <v-dialog v-model="dialog" width="350">
    <template v-slot:activator="{ on }">
    <v-btn icon v-on="on">
        <v-icon>mdi-dots-vertical</v-icon>
    </v-btn>
    </template>

    <v-card :class="$vuetify.theme.isDark === true ? 'grey darken-3' : 'grey lighten-4'">
    <v-row>
        <v-col align="center" cols="12">
            <v-btn :disabled="disabled" tile block text @click="clickBtn(type)">삭제</v-btn>
        </v-col>
        
        <!-- <v-col align="center" cols="12">  
            <v-btn :disabled="disabled" v-if="type === 'comment' ? false : true" tile block text @click="type === 'art'? $router.push('/artwrite/' + $route.params.writeId) : (type ==='comment'? true : $router.push('/reviewwrite/' + $route.params.reviewId))">수정</v-btn>
        </v-col> -->
    </v-row>
    </v-card>

    <!-- <v-row>
    <v-col>
    </v-col>
    </v-row> -->

    <v-card :class="$vuetify.theme.isDark === true ? 'grey darken-3' : 'grey lighten-4'">
    <v-row>
        <v-col cols="12" align="center">
        <v-btn :disabled="disabled" tile block text @click="dialog = false">취소</v-btn>
        </v-col>
    </v-row>
    </v-card>

</v-dialog>


</div>

</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import { storage, dbDelete, dbRead, dbQuery } from '../firebase.js';
import bus from '../utils/bus';

export default {
    props:['item', 'type'],
    data() {
        return {
            dialog: false,
            disabled: false,
        }
    },
    computed: {
        ...mapGetters({
            userProfile: 'getUserProfile',
            currentUser: 'getCurrentUser'
        })
    },
    methods: {
        ...mapMutations({
            clickBack: 'clickBack'
        }),
        ...mapActions({
            fetchArts: 'fetchArts'
        }),
        clickBtn(type){
            this.disabled = true
            
            return type === 'art' ? this.deleteArt() : (type ==='comment'? this.deleteComment() : this.deleteReview())
        },
        async deleteReview() {
            // reviews내의 comment 삭제
             
            await bus.$emit('start:spinner') 
            this.$store.commit('changeNavBtnDisabled')
            let querySnapshot = await this.$db.collection('reviews').doc(this.$route.params.reviewId).collection('comments').get()
            let commentIds = []
            await querySnapshot.forEach( doc => {
                commentIds.push(doc.id)
            })
            commentIds.forEach( async id => {
                await this.$db.collection('reviews').doc(this.$route.params.reviewId).collection('comments').doc(id).delete()
            })

            // reviews에서 삭제
            await dbDelete('reviews', this.$route.params.reviewId)
            
            // reviews 이미지 업로드 된 것 삭제
            for(var i in this.item.data().img){        
                // await storage.ref('art/' + this.item.data().authorUid +'/'+this.item.id + '/'+i+'/' + 'art_0').delete()
                let a = await this.$storage.child('reviews').child(this.item.data().authorUid).child(this.item.id).child(i)
                //원본사진 삭제
                await a.child('review_'+i).delete().then().catch(function(error){console.log(error)})
                //tumbnail_150, 300
                await a.child('thumb_450x450_'+'review_'+i).delete().then().catch(function(error){console.log(error)})
                // await a.child('thumb_200x200_'+'review_'+i).delete().then().catch(function(error){console.log(error)})
                await a.child('thumb_900x900_'+'review_'+i).delete().then().catch(function(error){console.log(error)})
            }

            this.$store.commit('changeNavBtnDisabled')
            await bus.$emit('end:spinner')
             
            this.clickBack(this)
        },
        async deleteArt() {
            console.log("deleteArt")
            // favorites에서 삭제
             
            await bus.$emit('start:spinner')
            this.$store.commit('changeNavBtnDisabled')
            let querySnapshot = await this.$db.collection('favorites').where('artId', '==', this.$route.params.writeId).where('userUid', '==', this.userProfile.id).get()
            
            if(!querySnapshot.empty){
                console.log('favorites delete')
                let docId = ''
                querySnapshot.forEach(doc => {
                docId = doc.id
                })
                dbDelete('favorites', docId)
            }

            console.log('favorite del')

            // latests에서 삭제
            let querySnapshot2 = await this.$db.collection('latests').where('artId', '==', this.$route.params.writeId).where('userUid', '==', this.userProfile.id).get()
            
            if(!querySnapshot2.empty){
                console.log('latests delete')
                let docId2 = ''
                querySnapshot2.forEach(doc => {
                docId2 = doc.id
                })
                dbDelete('latests', docId2)
            }
            console.log('lateset Del')

            // art내의 comments 삭제
            let querySnapshot3 = await this.$db.collection('arts').doc(this.$route.params.writeId).collection('comments').get()
            let commentIds = []
            await querySnapshot3.forEach( doc => {
                commentIds.push(doc.id)
            })
            commentIds.forEach( async id => {
                await this.$db.collection('arts').doc(this.$route.params.writeId).collection('comments').doc(id).delete()
            })

            console.log('comment Del')

            // artList에서 삭제
            await dbDelete('arts', this.$route.params.writeId)

            console.log('arts Del')

            // 딸린 review들 모두 삭제
            let review = await dbQuery('reviews', 'artId', '==', this.$route.params.writeId)
            // 딸린 review들의 db 자료와 이미지를 reviews와 storage에서 삭제
            if(review.length !== 0){
                await review.forEach(async (review, index)=>{
                    let path = await this.$storage.child('reviews').child(this.currentUser.uid).child(review.id)
                    await dbDelete('reviews', review.id)
                    await review.data().img.forEach(async (img, index)=>{
                        await path.child(index+ '').child('review_'+index).delete().then().catch(function(error){console.log(error)})
                        await path.child(index+ '').child('thumb_450x450_'+'review_'+index).delete().then().catch(function(error){console.log(error)})
                        await path.child(index+ '').child('thumb_900x900_'+'review_'+index).delete().then().catch(function(error){console.log(error)})
                    })
                })
            }else{
                console.log("no review exists")
            }
            console.log('review Del')

            // arts 이미지 업로드 된 것 삭제
            for(var i in this.item.data().img){
                // console.log(this.item.id)
                // console.log(this.item.data())
                // console.log(i)           
                // await storage.ref('art/' + this.item.data().authorUid +'/'+this.item.id + '/'+i+'/' + 'art_0').delete()
                let a = await this.$storage.child('arts').child(this.item.data().authorUid).child(this.item.id).child(i)
                //원본사진 삭제
                await a.child('art_'+i).delete().then().catch(function(error){console.log(error)})
                await a.child('thumb_450x450_'+'art_'+i).delete().then().catch(function(error){console.log(error)})
                await a.child('thumb_600x600_'+'art_'+i).delete().then().catch(function(error){console.log(error)})
                await a.child('thumb_900x900_'+'art_'+i).delete().then().catch(function(error){console.log(error)})
            }

            console.log('img Del')


            await this.fetchArts()
            this.$store.commit('changeNavBtnDisabled')
            await bus.$emit('end:spinner')
            //  
            this.$router.push('/home')
            this.$router.go(0)

        },
        async deleteComment() {
             
            await bus.$emit('start:spinner')
            
            if(this.$route.params.writeId){
                await dbDelete('arts', this.$route.params.writeId, 'comments', this.item.id)
            }else if(this.$route.params.reviewId){
                await dbDelete('reviews', this.$route.params.reviewId, 'comments', this.item.id)
            }
            
            console.log('comment delete')
            this.$emit('deleteComment')
            await bus.$emit('end:spinner')
             
        }
    },
    async created(){
        let review = await dbQuery('reviews', 'artId', '==', this.$route.params.writeId)
        
    }
}
</script>

<style>

</style>