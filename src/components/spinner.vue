<template>
    <div class="spinner">
        <v-progress-circular
            style="z-index:9999"
            :indeterminate="true"
            :rotate="4"
            :size="32"
            :value="0"
            :width="4"
            dark
            v-if ="loading"
            >
        </v-progress-circular>
    </div>
</template>

<script>


export default {
    props: ['type', 'loading'],
    data() {
        return{

        }
    },
    created(){
        console.log('spinner on')
        
    },

}
</script>

<style>
.spinner {
    display: inline-block;
    position: fixed;
    top: 47%;
    left: 47%;
}
</style>