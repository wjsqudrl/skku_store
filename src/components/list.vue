<template>
    <div v-if="isShow">
    <v-list>
        <v-list-item @click="item.method === 'click' ? $emit('click', item.key) : (item.key==='artistPage' ? goArtistPage(item.url) :$router.push(item.url))" :href="item.href">
            <v-list-item-avatar>
                <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-avatar>
            
            <v-list-item-content>
                <v-list-item-title>{{ item.content }}</v-list-item-title>
            </v-list-item-content>

            <v-list-item-icon>
                <v-icon>keyboard_arrow_right</v-icon>
            </v-list-item-icon>
            
        </v-list-item>
    </v-list>
    <v-divider></v-divider>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    props: ['item'],
    computed: {
        ...mapGetters({
            userProfile: 'getUserProfile'
        }),
        isShow(){
            if(this.item.for === 'common'){
                return true
            }else if(this.item.for === 'artist'){
                if(this.userProfile.data().isArtist){
                    return true
                }
            }
        }
        
    },
    methods:{
        goArtistPage(url){
            window.location.href = url
        }
    }
}
</script>

<style>

</style>