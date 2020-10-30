<template>
    <div>

            <v-system-bar lights-out></v-system-bar>
            
            <v-carousel v-model="imgIdx" hide-delimiter-background :continuous="false" :height="imgList.length === 0 ? '10px' : '300px'">
                <v-carousel-item v-for="(item, i) in imgList" :key="i">
                    <v-row class="fill-height" align="center" justify="center" >
                        <v-col cols="12">
                            <v-img class="grey darken-4" :src="item.url"><v-btn :disabled="disabled" v-if="type === 'write' || type === 'reviewwrite'" @click.prevent="deleteImg(i)" icon>
                                <v-icon >delete_outline</v-icon>
                            </v-btn></v-img>
                        </v-col>
                    </v-row>
                </v-carousel-item>
                
            </v-carousel>

            <v-list two-line>
            <v-list-item>

                <v-list-item-avatar>
                    <v-btn icon :disabled="true"><v-icon>photo</v-icon></v-btn>
                </v-list-item-avatar>

                <v-list-item-content>
                    
                    <v-list-item-title v-if="imgIdx===0">대표 이미지</v-list-item-title>
                    <v-list-item-title v-else>추가 이미지</v-list-item-title>
                    
                    <v-list-item-subtitle>{{ imgList.length === 0 ? 0 : imgIdx+1 }} / {{ imgList.length === 0 ?  imgList.length + 1 : imgList.length }}</v-list-item-subtitle>
                    <v-list-item-subtitle color="error" v-if="!imgValid"> 대표 이미지 1장은 필수 입니다.</v-list-item-subtitle>
                    
                    <v-list-item-subtitle v-else></v-list-item-subtitle>
                </v-list-item-content>

                <v-list-item-action>
                    <img-upload :disabled="disabled" v-if="type === 'write' || type === 'reviewwrite'" :item="imgList" @uploaded="uploaded"></img-upload>
                </v-list-item-action> 

            </v-list-item>
                
            <v-list-item :class="$vuetify.theme.isDark === true ? 'grey darken-1' : 'grey lighten-3'">
                {{ type === 'modify' ? '사진 수정은 불가 합니다' : '사진은 한번 글을 쓰면 수정이 불가 합니다' }} 
            </v-list-item>

            </v-list>
        
    </div>        
</template>

<script>
import imgUpload from '../components/imgUpload'
export default {
    props:['img', 'type', 'disabled'],
    components: {
        imgUpload
    },
    mounted() {
        console.log('imgView created')
        this.imgList = this.img
    },
    data() {
        return {
            imgList: [],
            imgIdx: 0,
        }
    },
    computed: {
        imgValid(){
            console.log('imgValid')
            return false
        },
    },
    watch:{
        imgList() {
            console.log('imgList is changed!')
            this.$emit('fileUpdate', this.imgList)
            // console.log(this.imgList)
        }
    },
    methods: {
        async uploaded(file) {
            console.log('uploaded!')
            // file 에서 [{url, name}] 가져온 것.
            // console.log(file)
            let input = {url:file.blob, name:file.name, file:file.file}
            // console.log(input)
            this.imgList.push(input)
        },
        async deleteImg(i){
            this.imgList.splice(i, 1)
        }
    },
}
</script>

<style>
</style>