<template>
    <div>
        <v-dialog ref="dialogView" v-model="dialog" width="350">
            <!-- userAvatarThumbUrl이 있으면 업로드 버튼 -->
            <file-upload
                :custom-action="customAction"
                extensions="gif,jpg,jpeg,png,webp"
                accept="image/png,image/gif,image/jpeg,image/webp"
                :multiple="true"
                :size="1024 * 1024 * 10"
                v-model="files"
                @input-filter="inputFilter"
                @input-file="inputFile"
                ref="upload"
                :disabled="disabled">
                <v-card class="grey darken-3">
                    <v-row>
                        <v-col align="center" cols="12">
                            <v-btn tile block text >사진 업로드</v-btn>
                        </v-col>
                    </v-row>
                </v-card>
            </file-upload>
        
            <template v-slot:activator="{ on }">
                <v-btn :disabled="disabled" icon v-on="on">
                    <v-icon>add_a_photo</v-icon>
                </v-btn>
            </template>

            <v-bottom-sheet v-model="sheet" max-width="calc(100% - 0px)" scrollable inset>
      
                <template v-slot:activator="{ on }">
                    
                    <v-card class="grey darken-3">
                    <v-row>
                        <v-col cols="12" align="center">
                        <v-btn :disabled="disabled" tile block text @click="dialog = false">취소</v-btn>
                        </v-col>
                    </v-row>
                    </v-card>
                    <br>
                    <br>
                    <v-card class="grey darken-3">
                        <v-row >
                            <v-col align="center" cols="12">  
                                <v-btn v-on="on" tile block text>나의 사진 보관함</v-btn>
                            </v-col>
                        </v-row>
                    </v-card>
                    <br>

                </template>

                

                <v-card style="border-top-left-radius:30px; border-top-right-radius:30px; background-color:#1a1c1f;">
                        <v-card-title>
                            <v-spacer></v-spacer>
                            <v-btn x-small text @click="sheet = !sheet">
                                닫기
                            </v-btn>
                        </v-card-title>
                        <v-divider></v-divider>
                        <v-card-text >
                                <v-tabs style="background-color:#1a1c1f;" fixed-tabs >
                                    <!-- <v-tab :class="$vuetify.theme.isDark === true ? 'grey darken-1' : 'grey lighten-3'">Phone</v-tab> -->
                                    <v-tab style="background-color:#1a1c1f;" >Instagram</v-tab>
                            
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

                                    <v-tab-item >
                                        <v-row style="background-color:#1a1c1f;">
                                            <v-col v-if="instaItems ? instaItems.length === 0 : true" cols="12">
                                                <v-card flat text style="background-color:#1a1c1f;">
                                                    <v-card-text>
                                                        <v-row>
                                                            <v-col cols="12" justify="center" align="center">
                                                                인스타그램 계정에 저장된 사진을 가져오시려면 <br>
                                                                https://tattooup.co.kr/artist 에 로그인하신 후<br>
                                                                "인스타그램 사진 연동" 메뉴에서 사진을 다운해주세요. <br>
                                                                연동이 끝나면 앱을 다시 켜주세요.
                                                            </v-col>
                                                            <!-- <v-col cols="12" justify="center" align="center">
                                                                <v-btn to="/instagram" large fab class='fa-instagram'>
                                                                    <font-awesome-icon :icon="{ prefix: 'fab', iconName: 'instagram' }" size="2x"/>
                                                                </v-btn>
                                                            </v-col> -->
                                                        </v-row>
                                                    </v-card-text>
                                                </v-card>
                                            </v-col>
                                            <v-col style="background-color:#1a1c1f;" cols="6" v-for="instaItem in instaItems">
                                                <v-card @click="uploadInstaImg(instaItem)" >
                                                    <v-img class="grey darken-4" ref="imgs" :src="instaItem.url" aspect-ratio="1"></v-img>
                                                </v-card>
                                            </v-col>
                                        </v-row>
                                    </v-tab-item>
                                </v-tabs>
                        </v-card-text>
                    </v-card>
                    
            </v-bottom-sheet>

        </v-dialog>

    </div>
</template>

<script>

import { mapGetters } from 'vuex'
import { dbUpdate } from '../firebase.js'
import axios from 'axios'

export default {
    // 이 컴포넌트의 역할은 이미지가 업로드 되면, emit을 통해서 file자체를 상위 컴포넌트로 옮겨준는 것이다!
    mounted(){
        this.instaItems = this.userProfile ? this.userProfile.data().instaUrl : []
    },
    props: ['item', 'disabled'],
    data() {
        return {
            dialog: false,
            sheet: false, 
            // img upload 관련
            files: [],
            instaItems:[],
        }
    },
    computed: {
        ...mapGetters({
            currentUser: 'getCurrentUser',
            userProfile: 'getUserProfile',
        })
    },
    watch: {
        sheet(){
            if(this.sheet === false){
                this.dialog = false
            }
        }
    
    },
    methods: {
        async uploadInstaImg(item){
            this.$store.commit('changeNavBtnDisabled')
            var array = [];
            // console.log(item)
            let refs = await this.$storage.child('userProfiles').child(this.currentUser.uid).child('photoLibrary').child('insta')
            let file1 = await refs.child(item.fileName)
            var xhr = new XMLHttpRequest();
            xhr.responseType = 'blob';
            let vm = this
            xhr.onload = await function(event) {
                let blob = xhr.response;
                console.log('onload')
                // console.log(blob)
                var file = new File([blob], item.fileName, {type: 'image/png'})
                vm.$emit('uploaded', {file:file, name:item.fileName, blob:item.url})
                vm.sheet = !vm.sheet
            };
            await xhr.open('GET', item.url);
            await xhr.send();
    
            // for (var i = 0; i < item.blob._binaryString.length; i++) {
            //     array.push(item.blob._binaryString.charCodeAt(i));
            // }
            // var blob = new Blob([new Uint8Array(array)], {type: 'image/png'});
            this.$store.commit('changeNavBtnDisabled')
        },
        // image uploads 관련
        async customAction(file, component){
            console.log('customAction')

            // for storage upload
            this.$emit('uploaded', file) // 부모 컴포넌트로 전달 여기선 부모가 avatarView.vue
            // console.log(file)
            this.$refs.dialogView.onClickOutside()
        },
        
        inputFilter(newFile, oldFile, prevent){// inputFile이 들어오면 실행 됨
            console.log('inputFilter')
            if (newFile && !oldFile) {
                // Before adding a file
                // Filter system files or hide files
                if (/(\/|^)(Thumbs\.db|desktop\.ini|\..+)$/.test(newFile.name)) {
                    return prevent()
                }
                // Filter php html js file
                if (/\.(php5?|html?|jsx?)$/i.test(newFile.name)) {
                    return prevent()
                }
            }
            // Create a blob field
            newFile.blob = ''
            let URL = window.URL || window.webkitURL
            if (URL && URL.createObjectURL) {
                newFile.blob = URL.createObjectURL(newFile.file)
                // console.log(newFile.blob)
            }
        },

        inputFile(newFile, oldFile){ // inputFile이 들어오고 filtering 후 실행 됨
            console.log('inputFile')
            this.$refs.upload.active = true // inputFile이 들어오면 upload 진행 시작 --> customAction실행
        },
    }
}
</script>

<style>

</style>