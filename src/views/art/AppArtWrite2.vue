<template>
    <div>
        <appbar :arrow="arrow" :writeModify="writeModify" @clickWriteModify="clickWriteModify" :disabled="disabled">{{ type === 'write' ? '글 쓰기' : '글 수정하기' }}</appbar>
        <v-row> 
            <v-col cols="12">
                <v-form ref="form" v-model="valid">
                    <!-- 사이즈  -->
                    <v-select :disabled="disabled" outlined v-model="size" :items="sizes" :rules="sizeRules" label="사이즈" required prepend-icon="print"></v-select>
                    <!-- 사이즈 끝 -->
                    
                    <!-- 가격 -->
                    <v-text-field :disabled="disabled" outlined type="number" v-model="price" :rules="priceRules" label="가격" hint="ex) 20만원" suffix="만원" prepend-icon="attach_money"></v-text-field>
                    <!-- 가격끝 -->

                    <!-- 예상시간 -->
                    <v-text-field :disabled="disabled" outlined type="number" v-model="timeExpected" :rules="timeExpectedRules" label="예상시간" hint="ex) 4시간" suffix="시간" prepend-icon="access_time"></v-text-field>
                    <!-- 예상 시간 끝 -->

                    <!-- 예상횟수 -->
                    <v-text-field  :disabled="disabled" outlined type="number" v-model="numExpected" :rules="numExpectedRules" label="예상횟수" hint="ex) 4회" suffix="회" prepend-icon="edit"></v-text-field>
                    <!-- 예상 횟수 끝 -->

                    <!-- 장소 시작 -->
                    <v-select
                        :disabled="disabled"
                        v-model="locationSelected"
                        :items="locations"
                        small-chips
                        outlined
                        required
                        prepend-icon="map"
                        label="장소">
                    </v-select>
                    <!-- 장소 끝 -->
                </v-form>
            </v-col>
        </v-row>

            <!-- 스낵바 -->
            <snack-bar :type="type" v-if="snackbar"></snack-bar>
            <!-- 스낵바 끝 -->
    </div>
</template>

<script>
import appbar from '../../components/appbar'
import { dbRead, dbUpdate, dbWrite } from '../../firebase';
import { mapGetters, mapMutations, mapActions } from 'vuex'
import firebase from 'firebase/app'
import imgView from '../../components/imgView'
import snackBar from '../../components/snackBar'
import bus from '../../utils/bus';

export default {
    components:{
        appbar,
        imgView,
        snackBar,
        bus
        
    },
    watch:{
        size(){
            this.setWriteModifySize(this.size)
        },
        price(){
            this.setWriteModifyPrice(this.price)
        },
        timeExpected(){
            this.setWriteModifyTimeExpected(this.timeExpected)
        },
        numExpected(){
            this.setWriteModifyNumExpected(this.numExpected)
        },

        locationSelected(){
            this.setWriteModifyLocationSelected(this.locationSelected)
        },
    },
    mounted(){
         
        this.size = this.writeModifySize
        this.price = this.writeModifyPrice
        this.timeExpected = this.writeModifyTimeExpected
        this.numExpected = this.writeModifyNumExpected

        this.locationSelected = this.writeModifyLocationSelected
    },
    computed: {
        writeResult() {
        let a = {
            // 글 쓰기 관련 변수
            title: this.writeModifyTitle,
            content: this.writeModifyContent,
            size: this.writeModifySize,
            price: this.writeModifyPrice,
            timeExpected: this.writeModifyTimeExpected,
            numExpected: this.writeModifyNumExpected,
            genre: this.writeModifyGenre,
            concept: this.writeModifyConcept,
            part: this.writeModifyPart,
            hashtag: this.writeModifyHashTag,
            tag: this.tag,
            location: this.writeModifyLocationSelected,
            
            // 자동으로 입력되어야 할 변수
            authorEmail: this.currentUser.email,
            authorUid: this.currentUser.uid,

            // 자동으로 입력되어야 할 변수
            createdAt: new Date(),
            modifiedAt: null, //나중에 수정 페이지에서 저장될 예정,, 미리 만들어 둔 것
            hits: 0,
            likes: null,
            }
        return a 
        },
                // 입력 관련 변수
        tag() {
            return [this.writeModifyGenre, this.writeModifyConcept, this.writeModifyPart, ...this.writeModifyHashTag]
        },
        ...mapGetters({
            //init
            userProfile: 'getUserProfile',
            currentUser: 'getCurrentUser',

            sizes: 'getSizes', // write.js
            
            writeModifySize: 'getWriteModifySize',
            writeModifyPrice: 'getWriteModifyPrice',
            writeModifyTimeExpected: 'getWriteModifyTimeExpected',
            writeModifyNumExpected: 'getWriteModifyNumExpected',
            locations: 'getLocations',
            writeModifyLocationSelected: 'getWriteModifyLocationSelected',

            sizeRules: 'getSizeRules', // write.js
            priceRules: 'getPriceRules', // write.js
            timeExpectedRules: 'getTimeExpectedRules', // write.js
            numExpectedRules: 'getNumExpectedRules', // write.js    
            writeModifyGenre: 'getWriteModifyGenre',
            writeModifyConcept: 'getWriteModifyConcept',
            writeModifyPart: 'getWriteModifyPart',
            writeModifyHashTag: 'getWriteModifyHashTag',        //init
            

            writeModifyImg: 'getWriteModifyImg',
            writeModifyTitle: 'getWriteModifyTitle',
            writeModifyContent: 'getWriteModifyContent',
            writeModifyLocationSelected: 'getWriteModifyLocationSelected',
        }),

        type() {
        if(this.$route.params.id === 'new'){
            return 'write'
        }else{
            return 'modify'
        }
        },

        writeModify(){
            return this.valid && this.locationSelected.length !== 0
        }
    },
    data(){
        return{
            valid: true,

            snackbar: false,
            // 이미지 관련 변수
            uploadedImg:[],
            disabled:false,
            arrow:true,

            // 입력 관련 변수
            size: '',
            price: '',
            timeExpected: '',
            numExpected: '',
            locationSelected: '',

            }
    },

    beforeDestroy(){
        // 
    },
    methods:{

        async clickWriteModify(type){
            this.disabled = true
            if(this.type === 'write'){
                this.artWrite()
            }else {
                this.artModify()
            }
        },

        async artWrite(){
            // storage에 이미지 업로드
            this.$store.commit('changeNavBtnDisabled')
            await bus.$emit('start:spinner')

            let input = {...this.writeResult}

            // firestore에 업로드
            let w = await dbWrite('arts', input)
            
            for(var i in this.writeModifyImg) { 
                var uploadTaskSnapshot = await this.$storage.child('arts').child(this.currentUser.uid).child(w.id).child(i).child('art_'+i).put(this.writeModifyImg[i].file)
                var url = await uploadTaskSnapshot.ref.getDownloadURL()
                //let name = uploadTaskSnapshot.metadata.name

                this.uploadedImg.push({url:url})
            }

            var input2 = {...this.writeResult, img:this.uploadedImg}
            await dbUpdate('arts', w.id, input2)
            this.setWriteModifyImg([])
            await this.fetchArts()
            await bus.$emit('end:spinner')
            this.$store.commit('changeNavBtnDisabled')
            this.snackbar = true
        },
        ...mapMutations({
            
            setWriteModifyImg: 'setWriteModifyImg',
            setWriteModifyGenre: 'setWriteModifyGenre',
            setWriteModifyConcept: 'setWriteModifyConcept',
            setWriteModifyPart: 'setWriteModifyPart',
            setWriteModifyHashTag: 'setWriteModifyHashTag',
            setWriteModifySize: 'setWriteModifySize',
            setWriteModifyPrice: 'setWriteModifyPrice',
            setWriteModifyTimeExpected: 'setWriteModifyTimeExpected',
            setWriteModifyNumExpected: 'setWriteModifyNumExpected',
            setWriteModifyLocationSelected: 'setWriteModifyLocationSelected',
        }),
        ...mapActions({
            fetchUserProfile: 'fetchUserProfile', // commons.js
            fetchArts: 'fetchArts',
        }),

        async clickNext(){
            this.disabled = true
            this.$router.push('/artwrite3/' + this.$route.params.id)
        }
    }

}
</script>

<style>

</style>