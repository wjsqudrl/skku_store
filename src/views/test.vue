<template>
    <v-app>
    <v-container>

      <v-row align="center">
        
        <file-upload
          :custom-action="customAction"
          extensions="gif,jpg,jpeg,png,webp"
          accept="image/png,image/gif,image/jpeg,image/webp"
          :multiple="false"
          :size="1024 * 1024 * 10"
          v-model="files"
          @input-filter="inputFilter"
          @input-file="inputFile"
          ref="upload">
            <v-avatar size="80">
                <v-icon x-large v-if="!this.userProfile.data().userAvatarUrl">account_circle</v-icon>
                <v-img v-else :src="userProfile.data().userAvatarUrl" />
            </v-avatar>
            <v-btn v-show="!userProfile.data().userAvatarUrl" icon>
                <v-icon>add_a_photo</v-icon>
            </v-btn>
        </file-upload>
        <v-btn v-show="userProfile.data().userAvatarUrl" @click.prevent="deletedAvatar" icon>
            <v-icon>delete_outline</v-icon>
        </v-btn>
           
            

      </v-row>
      <v-row>
        <img :src="tumbnail[0]"/>
      </v-row>
      <v-row>
        <img :src="tumbnail[1]"/>
      </v-row>
      <v-row>
        <img :src="tumbnail[2]"/>
      </v-row>
      <v-row>
        <img :src="tumbnail[3]"/>
      </v-row>
    </v-container>
    </v-app>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
// Img upload 관련
import { dbUpdate } from './../firebase.js';

export default {
  data() {
    return {
      // img upload 관련
      files: [],
      tumbnail: [],
    }
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

    // image uploads 관련
    async customAction(file, component){
        console.log('customAction')
        let uploadTaskSnapshot = await customAction(file, component, 'userProfiles', this.userProfile.id)
        await this.fetchUserProfile(this)

        return uploadTaskSnapshot
    },
    inputFilter(newFile, oldFile, prevent){// inputFile이 들어오면 실행 됨
      return inputFilter(newFile, oldFile, prevent)
    },
    inputFile(newFile, oldFile){ // inputFile이 들어오고 filtering 후 실행 됨
      this.$refs.upload.active = true // inputFile이 들어오면 upload 진행 시작 --> customAction실행
    },
    async deletedAvatar() {
        await deletedAvatar(this, this.userProfile.data().userAvatarFileName, this.userProfile.id)
        await this.fetchUserProfile(this)
    }
  },
  async created(){
    // console.log(this.tumbnail)
    let uploadTaskSnapshot = await this.$storage.child('arts').child('MyCcblmf6dVq01NvXRNChh1HvyK2').child('FbzRPf6pdRKe0iSjhHa7').child('0').child('thumb_100x100_art_0')
    let uploadTaskSnapshot1 = await this.$storage.child('arts').child('MyCcblmf6dVq01NvXRNChh1HvyK2').child('FbzRPf6pdRKe0iSjhHa7').child('0').child('thumb_150x150_art_0')
    let uploadTaskSnapshot2 = await this.$storage.child('arts').child('MyCcblmf6dVq01NvXRNChh1HvyK2').child('FbzRPf6pdRKe0iSjhHa7').child('0').child('thumb_200x200_art_0')
    let uploadTaskSnapshot3 = await this.$storage.child('arts').child('MyCcblmf6dVq01NvXRNChh1HvyK2').child('FbzRPf6pdRKe0iSjhHa7').child('0').child('thumb_300x300_art_0')
    // let url = await uploadTaskSnapshot.ref.getDownloadURL()
    let tumbnail = []
    await uploadTaskSnapshot.getDownloadURL().then(function(url) {
      tumbnail.push(url)
    })
    await uploadTaskSnapshot1.getDownloadURL().then(function(url) {
      tumbnail.push(url)
    })
    await uploadTaskSnapshot2.getDownloadURL().then(function(url) {
      tumbnail.push(url)
    })
    await uploadTaskSnapshot3.getDownloadURL().then(function(url) {
      tumbnail.push(url)
    })
    this.tumbnail = tumbnail
  }
}
</script>

<style scoped>

</style>
