<template>
<div>
    <v-img style="height:8.6rem; width:8.6rem;" class="rounded-img grey darken-4" @click.stop="$router.push('/art/' + item.id)" aspect-ratio="1" :src="item.thumbArtArt ? item.thumbArtArt[0].url : item.img[0].url">
    </v-img>
</div>
</template>

<script>
export default {
    name:'cardListSmallImg',
    props:['item'],
    data(){
        return{
        }
    },  

}
</script>

<style scoped>
/* 이미지 둥글게 */
.rounded-img{
    border-radius: 12px 12px 12px 12px;
}
</style>