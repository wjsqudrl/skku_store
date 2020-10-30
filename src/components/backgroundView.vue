<template>
    <div v-if="authorProfile">
        <background :userProfile="authorProfile" :size="size"></background>
        <background-upload v-show="isAuthor" :authorProfile="authorProfile" @renewAuthorProfile="renewAuthorProfile"></background-upload>
    </div> 
</template>

<script>
import background from './background'
import backgroundUpload from './backgroundUpload'

export default {
    props:['authorProfile', 'isAuthor'],
    data() {
        return {
            size: "100%",
        }
    },
    computed:{

    },
    components:{
        background,
        backgroundUpload,
    },
    methods: {
        renewAuthorProfile(){
            console.log('backgroundView')
            this.$emit('renewAuthorProfile')
        }
    }
}
</script>

<style>

</style>