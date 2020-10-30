<template>
        <v-img class="grey darken-4" :src="item.url" style="width:screen.width;margin-bottom:0px;">
        </v-img>
</template>

<script>
import bus from '../utils/bus'
export default {
    props:['item'],
    data(){
        return{
            winHeight: '', 
        }
    },
    async created(){
        
        await bus.$emit('start:spinner')
        this.winHeight =  window.innerHeight || document.body.clientHeight
    },
    async mounted(){
        
        await bus.$emit('end:spinner')

    }    

}
</script>
