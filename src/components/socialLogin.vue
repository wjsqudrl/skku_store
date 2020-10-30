<template>
    <v-col cols="12" justify="center" align="center">
      <v-row align="center" justify="center">
        <v-col cols="3" v-for="item in items" :key="item.name">
          <v-btn :disabled="disabled" fab :class="item.class" @click="clickBtn">
            <font-awesome-icon :icon="{ prefix: 'fab', iconName: item.name }" size="2x"/>
          </v-btn> 
        </v-col>
      </v-row>
    </v-col>
</template>

<script>
import firebase from 'firebase/app' 
import { mapActions } from 'vuex'

export default {
    methods: {
        clickBtn(){
            this.disabled = true
            this.item.method
        },
        ...mapActions({
            fetchUserProfile: 'fetchUserProfile', // commons.js
        }),
        async setUserProfile(doc){
          this.$store.commit('changeNavBtnDisabled')
            let input = {
              email: doc.user.email,
              name: null,
              gender: null,
              isArtist: false,
              uid: doc.user.uid,
              displayName: doc.user.displayName,//this.email.split('@', 1)[0],
              emailAlarm: false,
              pushAlarm: false,
              createdAt: new Date(),
              isDark: false,
            }
            await this.$db.collection('userProfiles').doc(doc.user.uid).set(input)
            this.$store.commit('changeNavBtnDisabled')
        },

        async facebookSignIn() {
            console.log('facebookSignIn')
            this.$store.commit('changeNavBtnDisabled')
            const provider = new firebase.auth.FacebookAuthProvider()
            let doc = await firebase.auth().signInWithPopup(provider)
            this.$store.commit('changeNavBtnDisabled')
            if (doc.additionalUserInfo.isNewUser === true){
              await this.setUserProfile(doc)
              await this.fetchUserProfile(this) // this.userProfile 값을 초기화  // commons.js
              this.$router.push('/setuserprofile/' + this.userUid)
            }else{
              await this.fetchUserProfile(this) // this.userProfile 값을 초기화  // commons.js
              this.$router.push('/home')
              this.$router.go(0)
            }
        },


        async googleSignIn() {
            console.log('googleSignIn')
            this.$store.commit('changeNavBtnDisabled')
            const provider = new firebase.auth.GoogleAuthProvider()
            let doc = await firebase.auth().signInWithPopup(provider)
            this.$store.commit('changeNavBtnDisabled')
            if (doc.additionalUserInfo.isNewUser === true){
              await this.setUserProfile(doc)
              await this.fetchUserProfile(this) // this.userProfile 값을 초기화  // commons.js
              this.$router.push('/setuserprofile/' + this.userUid)
            }else{
              await this.fetchUserProfile(this) // this.userProfile 값을 초기화  // commons.js
              this.$router.push('/home')
              this.$router.go(0)
            }
        },
        async twitterSignIn() {
            console.log('twitterSignIn')
        }
    },
    data() {
        return {
            disabled: false,
            items: [
                {
                    name: 'facebook',
                    content: '페이스북으로 로그인',
                    class: 'fa-facebook',
                    method: this.facebookSignIn,
                },
                {
                    name: 'google',
                    content: '구글로 로그인',
                    class: 'fa-google',
                    method: this.googleSignIn,

                },
                {
                    name: 'twitter',
                    content: '트위터로 로그인',
                    class: 'fa-twitter',
                    method: this.twitterSignIn,

                },
            ]
        }
    }

}
</script>

<style scoped>
/* Facebook */
.fa-facebook {
  background: #3B5998 !important;
  color: white !important;
}
.fa-twitter {
  background: #55ACEE !important;
  color: white !important;
}
.fa-google {
  background: #dd4b39 !important;
  color: white !important;
}
</style>