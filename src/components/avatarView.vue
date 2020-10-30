<template>
    <div v-if="authorProfile">
        <avatar :userProfile="authorProfile" :size="size"></avatar>
        <avatar-upload v-show="isAuthor" :authorProfile="authorProfile" @renewAuthorProfile="renewAuthorProfile"></avatar-upload>
        <div>
            {{ authorProfile.data().displayName }}
            <font-awesome-icon v-if="authorProfile.data().isArtist" :icon="{ prefix: 'fas', iconName: icon }" :style="{ color: color }" size="xs"/>
        </div>
    </div> 
</template>

<script>
import avatar from './avatar'
import avatarUpload from './avatarUpload'

export default {
    props:['authorProfile', 'isAuthor'],
    data() {
        return {
            size: 80,
        }
    },
    computed:{
        icon(){
            return this.authorProfile.data().gender === 'female' ? 'venus' : 'mars'
        },
        color(){
            return this.authorProfile.data().gender === 'female' ? 'pink' : '#00AAFF'
        }
    },
    components:{
        avatar,
        avatarUpload,
    },
    methods: {
        renewAuthorProfile(){
            console.log('avatarview')
            this.$emit('renewAuthorProfile')
        }
    }
}
</script>

<style>

</style>