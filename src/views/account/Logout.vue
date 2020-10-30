<template>
    <snack-bar :type="type"></snack-bar>
</template>

<script>
import snackBar from '../../components/snackBar'
import firebase from 'firebase/app'
import { mapGetters, mapActions } from 'vuex'
import { Plugins, registerWebPlugin} from '@capacitor/core';
import { FacebookLogin } from "@rdlabo/capacitor-facebook-login"

export default {
    components: {
        snackBar,
    },
    computed: {
        ...mapGetters({
            userProfile: 'getUserProfile',
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
        if(this.userProfile.data().signInMethod==="facebook"){
            await Plugins.FacebookLogin.logout();
            await firebase.auth().signOut()
        }else if(this.userProfile.data().signInMethod==="google"){
            await Plugins.GoogleAuth.signOut()
            await firebase.auth().signOut()
        }else{
            await firebase.auth().signOut()
        }
        this.$store.commit('changeNavBtnDisabled')
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