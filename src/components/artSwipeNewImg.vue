<template>
    <v-img class="grey darken-4" style="border-radius:12px;" @click.stop="$router.push('/art/' + item.id)" height="177px" aspect-ratio="0.8" :src="item.thumbArtHome ? item.thumbArtHome[0].url : item.img[0].url"></v-img>
</template>

<script>
export default {
    props:['item'],
    data(){
        return{
        }
    },
    created(){
        
    },

}
</script>

<style scoped>
</style>