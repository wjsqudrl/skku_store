<template>
<v-app>
    <appbar :arrow="true">사진보관함</appbar>
    <v-row>
        <v-col cols="12">
            <v-bottom-sheet v-model="sheet" max-width="calc(100% - 0px)" scrollable inset>
                <template v-slot:activator="{ on }">
                    <v-row align="center" justify="center">
                        

                        <v-col cols="12" align="center" justify="center">
                            <v-card flat>
                                <v-card-title>
                                    사진 보관함 용량 상황
                                </v-card-title>
                                <v-divider></v-divider>
                                <v-card-text>
                                <v-progress-circular
                                    :rotate="-90"
                                    :size="300"
                                    :width="30"
                                    :value="value"
                                    color="success"
                                >
                                    {{ value }} %
                                </v-progress-circular>
                                </v-card-text>
                            </v-card>
                        </v-col>

                        
                        <v-col cols="12" align="center" justify="center">
                            <v-card flat>
                                <v-card-title>
                                    나의 사진 보관함 보기
                                </v-card-title>
                                <v-divider></v-divider>
                                <v-card-text>
                                    <v-row>
                                        <v-col cols="12">
                                            <v-btn fab x-large color="#B9090B" v-on="on">
                                                <v-icon>photo_library</v-icon>
                                            </v-btn>
                                        </v-col>
                                        <v-col cols="12">
                                            위 버튼을 클릭하면 나의 사진 보관함을 열어 볼 수 있어요
                                        </v-col>
                                    </v-row>
                                </v-card-text>
                            </v-card>
                        </v-col>

                        <v-col cols="12">   
                        </v-col>
                        <v-col cols="12">
                        </v-col>
                        <v-col cols="12">
                        </v-col>
                        <v-col cols="12">
                        </v-col>
                        <v-col cols="12">
                        </v-col>
                        <v-col cols="12">
                        </v-col>
                        <v-col cols="12">
                        </v-col>
                        <v-col cols="12">
                        </v-col>
                    </v-row>

                </template>

                    <v-card>
                        <v-card-title>
                            <v-spacer></v-spacer>
                            <v-btn x-small text @click="sheet = !sheet">
                                닫기
                            </v-btn>
                        </v-card-title>
                        <v-divider></v-divider>
                        <v-card-text>
                                <v-tabs color="grey darken-5" fixed-tabs >
                                    <!-- <v-tab :class="$vuetify.theme.isDark === true ? 'grey darken-1' : 'grey lighten-3'">Phone</v-tab> -->
                                    <v-tab>Instagram</v-tab>
                            
                                    <!-- <v-tab-item :class="$vuetify.theme.isDark === true ? 'grey darken-2' : 'grey lighten-3'">
                                        <v-row>
                                            <v-col cols="12">
                                                <v-card>
                                                    <v-card-text>
                                                        <v-row>
                                                            <v-col cols="12" justify="center" align="center">
                                                                나의 모바일 폰에서 가져오기
                                                            </v-col>
                                                            <v-col cols="12" justify="center" align="center">
                                                                <v-btn class="grey lighten-1" fab large>
                                                                    <v-icon>mdi-cloud-upload</v-icon>
                                                                </v-btn>
                                                            </v-col>
                                                        </v-row>
                                                    </v-card-text>
                                                </v-card>
                                            </v-col>
                                        </v-row>
                                    </v-tab-item> -->

                                    <v-tab-item>
                                        <v-row>
                                            <v-col v-if="instaItems ? instaItems.length === 0 : true" cols="12">
                                                <v-card flat text>
                                                    <v-card-text>
                                                        <v-row>
                                                            <v-col cols="12" justify="center" align="center">
                                                                인스타그램 계정에 저장된 사진 가져오기
                                                            </v-col>
                                                            <v-col cols="12" justify="center" align="center">
                                                                <v-btn to="/instagram" large fab class='fa-instagram'>
                                                                    <font-awesome-icon :icon="{ prefix: 'fab', iconName: 'instagram' }" size="2x"/>
                                                                </v-btn>
                                                            </v-col>
                                                        </v-row>
                                                    </v-card-text>
                                                </v-card>
                                            </v-col>
                                            <v-col cols="6" v-for="instaItem in instaItems">
                                                <v-img :src="instaItem.url" aspect-ratio="1">
                                                    <v-btn :disabled="disabled" @click.prevent="deletedPhoto(instaItem)" icon>
                                                        <v-icon>delete_outline</v-icon>
                                                    </v-btn>
                                                </v-img>
                                            </v-col>
                                        </v-row>
                                    </v-tab-item>
                                </v-tabs>
                        </v-card-text>
                    </v-card>
                    
            </v-bottom-sheet>

        </v-col>
        
    </v-row>


</v-app>
  
</template>


<script>
import { mapGetters, mapActions } from 'vuex'
import appbar from '../../components/appbar'
import axios from 'axios'
import { dbUpdate, dbRead } from '../../firebase.js'
import bus from '../../utils/bus';

export default {
    
  components: {
    appbar,
  },
  data(){
      return {
        code: '',
        token: '',
        sheet: false, 
        items: [],
        value: 0,
        show: false,
        disabled: false,
        instaItems:[],
      }
  },
  computed: {

    ...mapGetters({
      //init
      userProfile: 'getUserProfile',
      currentUser: 'getCurrentUser', // commons.js
    })
  }, 
  async created(){
        this.$store.commit('changeNavBtnDisabled')
        await bus.$emit('start:spinner')
        let querySnapshot = await this.$db.collection('userProfiles').doc(this.currentUser.uid).collection('photoLibrary').get()
        querySnapshot.forEach(doc => {
            this.items.push(doc)
            // console.log(doc.data())
        })
        this.$store.commit('changeNavBtnDisabled')
  },
  methods: {
      async deletedPhoto(instaItem){
            this.$store.commit('changeNavBtnDisabled')
            this.disabled = true
            await bus.$emit('start:spinner')
            // storage에서 이미지 remove
            try{
                // 이미지 업로드 된 것 삭제
                let a = await this.$storage.child('userProfiles').child(this.userProfile.id).child('photoLibrary').child('insta').child(instaItem.fileName).delete()
                console.log('img deleted')
                // userProfile에서 remove
                let b = await dbRead('userProfiles', this.userProfile.id)
                let input = b.data().instaUrl.filter(item => {
                    return item.fileName !== instaItem.fileName
                    })
                let c = await dbUpdate('userProfiles', this.userProfile.id, {
                    instaUrl: input,
                })
                console.log('db deleted')
                await this.fetchUserProfile(this)

            }catch{
                console.log('catch')
            }
            await bus.$emit('end:spinner')
             
            this.$store.commit('changeNavBtnDisabled')
            
    },
    ...mapActions({
        fetchUserProfile: 'fetchUserProfile',
      }),
      getInstaCode(){
        window.location.href = 'https://tattooup.github.io/'
      },
      async getInstaInfo(){
            if(this.code === ''){
                console.log('code is empty')
            }else {
                console.log('update!!')
                let a = await dbUpdate('userProfiles', this.userProfile.id, {instaCode:this.code})
                // console.log(a)
            }
            await this.fetchUserProfile(this)

      }
      
  },
  async mounted(){
        this.instaItems = this.userProfile.data().instaUrl
        await bus.$emit('end:spinner')
         
    },
    watch: {
        userProfile(){
            console.log('watch')
            this.instaItems = this.userProfile.data().instaUrl
            this.disabled = false
        }
    }
}
</script>

<style>
.fa-instagram {
  background: #125688 !important;
  color: white !important;
}
</style>