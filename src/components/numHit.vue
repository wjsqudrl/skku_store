<template>
<div>
    조회수 {{ item ? item.data().hits: 0 }}개
</div>
</template>

<script>
import { dbUpdate } from '../firebase'
import firebase from 'firebase/app'
export default {

    props: ['item', 'type'],
    async created() {
        let input = {
            hits: firebase.firestore.FieldValue.increment(1)
        }
        if(this.type === 'art'){
            let a =  await dbUpdate('arts', this.$route.params.writeId, input)
        }else{
            let a =  await dbUpdate('reviews', this.$route.params.reviewId, input)
        }
        
    }
}
</script>

<style>

</style>