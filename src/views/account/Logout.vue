<template>
    <snack-bar :type="type"></snack-bar>
</template>

<script>
import snackBar from '../../components/snackBar'
import firebase from 'firebase/app'
import { mapGetters, mapActions } from 'vuex'
import { Plugins, registerWebPlugin} from '@capacitor/core';
import {dbUpdate} from '../../firebase'
import { FacebookLogin } from "@rdlabo/capacitor-facebook-login"

export default {
    components: {
        snackBar,
    },
    computed: {
        ...mapGetters({
            userProfile: 'getUserProfile',
            token: 'getToken',
        }),
    },
    methods: {
        ...mapActions({
            fetchUserProfile: 'fetchUserProfile', // commons.js
        }),
    },
    async created() {
        await registerWebPlugin(FacebookLogin);
    },
    async mounted(){
        this.$store.commit('changeNavBtnDisabled')
        // this.$store.commit('setToken')
        console.log(this.token)
        if(this.userProfile.data().signInMethod==="facebook"){
            await Plugins.FacebookLogin.logout();
            await firebase.auth().signOut()
        }else if(this.userProfile.data().signInMethod==="google"){
            await Plugins.GoogleAuth.signOut()
            await firebase.auth().signOut()
        }else{
            var uid = firebase.auth().currentUser.uid
            console.log(this.token)
            console.log("token remove")
            var input = {
                token: firebase.firestore.FieldValue.arrayRemove(this.token),
            }
            await dbUpdate('userProfiles', uid, input)
            await firebase.auth().signOut()
        }
        this.$store.commit('changeNavBtnDisabled')
        // this.$store.commit('setToken')
    },
    data() {
        return {
            type: 'logout',
        }
    }
}
</script>

<style>

</style>