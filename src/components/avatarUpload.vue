<template>
    <div v-if="authorProfile">
        <!-- userAvatarThumbUrl이 있으면 업로드 버튼 -->
        <file-upload
            :disabled="disabled"
            v-if="!authorProfile.data().userAvatarUrl"
            :custom-action="customAction"
            extensions="gif,jpg,jpeg,png,webp"
            accept="image/png,image/gif,image/jpeg,image/webp"
            :multiple="false"
            :size="1024 * 1024 * 10"
            v-model="files"
            @input-filter="inputFilter"
            @input-file="inputFile"
            ref="upload">
            <v-btn :disabled="disabled" icon>
                <v-icon :disabled="disabled">add_a_photo</v-icon>
            </v-btn>
        </file-upload>

        <!-- userAvatarThumbUrl이 없으면 지우기 버튼 -->
        <v-btn :disabled="disabled" v-else @click.prevent="deletedAvatar" icon>
            <v-icon :disabled="disabled">delete_outline</v-icon>
        </v-btn>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { dbUpdate } from '../firebase.js'
import bus from '../utils/bus';
export default {
    props: ['authorProfile'],
    data() {
        return {
            // img upload 관련
            files: [],
            disabled: false,
        }
    },
    computed: {
        ...mapGetters({
            userProfile: 'getUserProfile',
        })
    },
    methods: {
        ...mapActions({
            fetchUserProfile: 'fetchUserProfile',
        }),
        // image uploads 관련
        async customAction(file, component){
            console.log(component)
             
            await bus.$emit('start:spinner')
            this.disabled = true
            
            this.$store.commit('changeNavBtnDisabled')
            let uploadTaskSnapshot = await component.$storage.child('userProfiles').child(this.userProfile.id).child('avatar').child('avatar').put(file.file)
            //let name = uploadTaskSnapshot.metadata.name
            let url = await uploadTaskSnapshot.ref.getDownloadURL()
            let input = {userAvatarUrl:url}
            this.$store.commit('changeNavBtnDisabled')
            await dbUpdate('userProfiles', this.userProfile.id, input)
            // for storage upload
            this.$emit('renewAuthorProfile')
            this.fetchUserProfile(this)
            this.disabled = false
            await bus.$emit('end:spinner')
             

            return uploadTaskSnapshot
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
        },
        inputFile(newFile, oldFile){ // inputFile이 들어오고 filtering 후 실행 됨
            console.log('inputFile_avatar')
            this.$refs.upload.active = true // inputFile이 들어오면 upload 진행 시작 --> customAction실행
        },
        async deletedAvatar(fileName, docId){
             
            await bus.$emit('start:spinner') 
            this.disabled = true
            console.log('deleteAvate')
            // storage에서 이미지 remove
            try{


                // avatar 이미지 업로드 된 것 삭제
                this.$store.commit('changeNavBtnDisabled')
                let a = await this.$storage.child('userProfiles').child(this.userProfile.id).child('avatar')
                //원본사진 삭제
                await a.child('avatar').delete().then().catch(function(error){console.log(error)})
                //tumbnail_100, 150, 200, 300
                await a.child('thumb_300x300_'+'avatar').delete().then().catch(function(error){console.log(error)})
                this.$store.commit('changeNavBtnDisabled')
                // userProfile에서 remove
                let input = {userAvatarUrl:null, thumbAvatar:null}
                await dbUpdate('userProfiles', this.authorProfile.id, input)
                
                this.$emit('renewAuthorProfile')
                this.fetchUserProfile(this)
                await bus.$emit('end:spinner')
                 
                this.disabled = false
            }catch{
                await bus.$emit('end:spinner')
                 
                this.disabled = false
            }
            
        }
    }
}
</script>

<style>
</style>