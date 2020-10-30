<template>
<div>
    <v-list>
        <v-list-item :ripple="false" @click="type === 'art'? profile ? forUser ? $router.push('/accountsettings/' + profile.data().uid) : $router.push('/artist/' + profile.data().uid) : null : null">
        
            <v-list-item-avatar v-show="type === 'art'">
                <avatar :userProfile="profile" :size="size"></avatar>
            </v-list-item-avatar>
            
            <v-list-item-content>
                <v-list-item-title>{{ profile ? type === 'art'? profile.data().displayName : profile.data().displayName.slice(0,1) + '*****' : null }}</v-list-item-title>
            </v-list-item-content>

            <v-list-item-icon>
                <slot></slot>
            </v-list-item-icon>


        </v-list-item>
    </v-list>
    <v-spacer></v-spacer>
    
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import avatar from '../components/avatar'
export default {
    props: ['forUser', 'authorProfile', 'type'],
    components: {
        avatar,
    },
    data(){
        return{
            size: 60,
            profile: '',
        }
    },
    computed: {
        ...mapGetters({
            userProfile: 'getUserProfile'
        })
    },
    created() {
        if(this.forUser){
            this.profile = this.userProfile
        }else{
        }
        
    },
    watch: {
        authorProfile(){
            if(!this.forUser){
                this.profile = this.authorProfile
            }
        }
    }
}
</script>

<style>
</style>