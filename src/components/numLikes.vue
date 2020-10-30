<template>
    <div>
        {{ numLikes }}
    </div>      
</template>

<script>
import { dbRead, dbQuery } from '../firebase'

export default {
    data(){
        return{
            numLikes: 0,
        }
    },
    props:['item'],
    async created(){
        // let a = await dbRead('userProfiles', item.data().authorUid)
        let querySnapshot = await dbQuery('favorites', 'artId', '==', this.item.id)
        this.numLikes = querySnapshot.length
        // let querySnapshot1 = await dbQuery('reviews', 'artId', '==', item.id)
        // let sum = 0
        //   if(querySnapshot1.length !==0){
        //       await querySnapshot1.forEach(query=>{
        //           sum = sum + query.data().rating
        //       })
        //       sum = sum/querySnapshot1.length
        //       sum = sum.toFixed(1)
        //   }
    }

}
</script>

<style>

</style>