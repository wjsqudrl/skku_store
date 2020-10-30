<template>
    <div>
        좋아요 {{ numFavorite ? numFavorite : 0 }}개
    </div>
</template>

<script>
import { dbQuery } from '../firebase'

export default {
    props: ['item'],
    data() {
        return {
            numFavorite: 0,
        }
    },
    async created() {
        let querySnapshot = await dbQuery('favorites', 'artId', '==', this.item.id)
        this.numFavorite = querySnapshot.length
    }

}
</script>

<style>

</style>