<template>
    <div>
        <v-img class="rounded-img grey darken-4" @click.stop="$router.push('/art/' + item.id)" aspect-ratio="0.995" :src="item.thumbArtArt ? item.thumbArtArt[0].url : item.img[0].url"> 
        <slot></slot>
        </v-img>
    </div>
</template>

<script>
export default {
    name:'cardListImg',
    props:['item'],
    data(){
        return{
        }
    },
    mounted(){
    }    

}
</script>

<style scoped>
/* 이미지 둥글게 */
.rounded-img{
    border-radius: 12px 12px 12px 12px;
}
</style>