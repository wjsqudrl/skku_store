<template>
    <v-btn-toggle v-if= "checkpage == 'artistpage'">
        <v-btn :disabled="disabled" v-if="violetArtistPage" width="300px" small outlined @click.native="clickUnFollow()">팔로잉</v-btn>
        <v-btn :disabled="disabled" v-else small raised color="info" width="300px" @click="clickFollow()">팔로우</v-btn>
    </v-btn-toggle>
    <v-btn-toggle v-else>
        <v-btn :disabled="disabled" v-if="violetFollowTap" small outlined width="100%" @click.native="clickUnFollow(item)">팔로잉</v-btn>
        <v-btn :disabled="disabled" v-else small raised color="info" width="100%" @click="clickFollow(item)">팔로우</v-btn>
    </v-btn-toggle>
</template>
<script>
import bus from '../../utils/bus';
import { mapGetters, mapMutations, mapActions } from 'vuex'
import { follows, dbQuery, dbWrite, dbDelete} from '../../firebase.js';
export default {
    data() {
        return{
            followsDocsArray: [],
            checkpage: "",
            disabled: false,
        }
    },
    props:['item'],
    watch:{
        violetArtistPage(){
            console.log('violet is changed')
            this.disabled = false
        },
        violetFollowTap(){
            this.disabled = false
        },
    },
    computed: {
        violetArtistPage(){
            return this.followsDocsArray.length !== 0
        },
        violetFollowTap(){
            if(this.checkpage=='followtap'){
                return this.item.isFollowedByCurrentUser !== 0
            }
            else{
                return false
            }
        },
        ...mapGetters({
            userProfile: 'getUserProfile',
        }),
    },
    methods: {
        async getFollowsDocsArray(){
            let a = await dbQuery('follows',"from","==", this.userProfile.data().uid, "to", "==", this.$route.params.id)
            await a.forEach(item=>{
                this.followsDocsArray.push(item)
            })
        },
        async clickFollow(item){
            await bus.$emit('start:spinner')
            this.$store.commit('changeNavBtnDisabled')
            this.disabled = true
            if(this.checkpage == "artistpage"){
                await follows.add({ //.doc(this.userProfile.id).set
                from : this.userProfile.data().uid,
                to : this.$route.params.id,
                createdAt : new Date(),
                userUid : this.userProfile.id
                }) 
                await this.getFollowsDocsArray()
                // await console.log(this.followsDocsArray)
            }else{
                await follows.add({
                from : this.userProfile.data().uid,
                to : item.uid,
                createdAt : new Date(),
                userUid : this.userProfile.id
                })
                item.isFollowedByCurrentUser=1
            }
            this.$store.commit('changeNavBtnDisabled')
            await bus.$emit('end:spinner')
             
        },
        async clickUnFollow(item){
            await bus.$emit('start:spinner')
            this.$store.commit('changeNavBtnDisabled')
            this.disabled = true
            if(this.checkpage == "artistpage"){
                // await console.log(this.followsDocsArray[0].id)
                await dbDelete('follows', this.followsDocsArray[0].id)
                this.followsDocsArray = []
                
            }else{
                let isFollowedByCurrentUserDocId = []
                let a = await dbQuery('follows',"from","==", this.userProfile.data().uid, "to", "==", item.uid)
                await a.forEach(isfollow=>{
                    isFollowedByCurrentUserDocId.push(isfollow.id)
                })
                await dbDelete('follows', isFollowedByCurrentUserDocId[0])
                item.isFollowedByCurrentUser=0
            }
            await bus.$emit('end:spinner')
            this.$store.commit('changeNavBtnDisabled')
        },
    },
    created(){
        if(this.$route.path == "/artist/".concat(this.$route.params.id)){
            this.getFollowsDocsArray()
            this.checkpage = "artistpage"
        }else{
            this.checkpage = "followtap"
        }
        
    }
}
</script>