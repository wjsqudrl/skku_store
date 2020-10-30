<template>
  <div style="font-size:13px"> 
      {{ rating === 0 ? '' : rating }}
  </div>
</template>

<script>
import { dbRead, dbQuery } from '../firebase'

export default {
    data(){
        return{
            rating: 0,
        }
    },
    props:['item'],
    async created(){
        let querySnapshot1 = await dbQuery('reviews', 'artId', '==', this.item.id)
        let sum = 0
          if(querySnapshot1.length !==0){
              await querySnapshot1.forEach(query=>{
                  sum = sum + query.data().rating
              })
              sum = sum/querySnapshot1.length
              sum = sum.toFixed(1)
          }
        this.rating = sum
    }

}
</script>

<style>

</style>