<template>
    <v-row class="black">
        <v-col style="margin:-10px -5px -10px -5px;" v-for="(item, i) in arts" :key="item.id" cols="12" >
            <v-card style="padding:0px 0px 0px 0px;margin-bottom:0px;" class="black" tile elevation="12" v-if="showItem(item)&&showItem1(item)">
                <v-row style="margin:0px 0px 0px 0px;" align="center">

                    <v-col cols="5" style="padding:13px 0px 0px 0px;">
                        <!-- {{item.data()}} -->
                        <div v-if="item.data().img ? item.data().img[0].url ? true : false : false">
                            <v-img style="height:8.6rem; width:8.6rem;" class="rounded-img grey darken-4" aspect-ratio="1" :src="item.data().img[0].url">
                            </v-img>
                        </div>
                        <div v-else>
                            <v-img class="rounded-img grey darken-4" aspect-ratio="0.995" src="../assets/back.jpg"> 
                            </v-img>
                        </div>
                    </v-col>
                    <!-- {{item.id}} -->
                    
                    <v-col cols="7" style="padding:0px 0px 0px 10px;">
                        <v-card-title  style="max-width: 100%; font-weight:600; font-size: 15px; padding:0px;">
                            {{ item.data().title }}
                        </v-card-title>
                        <v-card-text style="padding:0px;font-size:11px;color:rgba(255, 255, 255, 0.7);">
                            {{ dateTimeToFormatted(item.data().createdAt.toDate()) }}
                        </v-card-text>
                        <v-card-text style="padding:0px;">
                            <v-col cols="12" v-if="!item.data().consult.includes(userProfile.data().uid)" style="padding:5px 0px 0px 0px;">
                                <v-btn style="background-color:black" outlined @click="clickBtn(item)">
                                    <v-col cols="12" style="color:#3884FF;padding:0px 0px 0px 0px; overflow:hidden; font-size:12px; text-overflow:ellipsis; white-space:nowrap;">
                                        미처리
                                    </v-col>
                                    
                                </v-btn>
                            </v-col>
                            <v-col cols="12" v-else-if="item.data().consult.includes(userProfile.data().uid)&&!item.data().reserved" style="padding:5px 0px 0px 0px;">
                                <v-btn style="background-color:black" outlined @click="clickBtn(item)">
                                    <v-col cols="12" style="color:green;padding:0px 0px 0px 0px; overflow:hidden; font-size:12px; text-overflow:ellipsis; white-space:nowrap;">
                                        견적발송
                                    </v-col>
                                </v-btn>
                            </v-col>
                            <v-col cols="12" v-else-if="item.data().reserved&&item.data().storeUid===userProfile.data().uid" style="padding:5px 0px 0px 0px;">
                                <v-btn style="background-color:black" outlined @click="clickBtn(item)">
                                    <v-col cols="12" style="color:green;padding:0px 0px 0px 0px; overflow:hidden; font-size:12px; text-overflow:ellipsis; white-space:nowrap;">
                                        예약확정
                                    </v-col>
                                </v-btn>
                            </v-col>
                        </v-card-text>
                    </v-col>
                </v-row>
                <v-row>
                    <v-divider style="border-color:#333333; color:#333333;"></v-divider>
                </v-row>
            </v-card>
            
        </v-col>
        <v-bottom-sheet v-model="show" max-width="calc(100% - 0px)" scrollable inset>
            <v-card style="border-top-left-radius:30px; border-top-right-radius:30px; background-color:#1a1c1f;">
                <v-card-title>
                    견적서작성
                    <v-spacer></v-spacer>
                    <v-btn class="mt-6" text @click="clickClose">
                        닫기
                    </v-btn>
                    
                </v-card-title>
                <v-divider style="border-color:#707070; color:#707070;"></v-divider>
                
                <!-- <v-card-text>
                    사진 상세 설명 : {{ askContent }}
                </v-card-text> -->
                
                <v-card-text>
                    <v-row>
                            <!-- <img-view :disabled="disabled" type="write" @fileUpdate="fileUpdate" ></img-view> -->
                        <v-col cols="12">
                        <v-carousel width="100%" height="100%" :hide-delimiters="askImg.length === 1 ? true : false" :show-arrows="askImg.length === 1 ? false : true">
                            <v-carousel-item
                                v-for="(item,i) in askImg"
                                :key="i"
                            >
                                <v-img class="grey darken-4" :src="item.url">
                                </v-img>
                            </v-carousel-item>
                        </v-carousel>
                        </v-col>
                        <v-col cols="12">
                        기종 : {{ askTitle }}
                        </v-col>
                        <v-col cols="12">
                        사진 상세 설명 : {{ askContent }}
                        </v-col>
                        <v-col cols="12">
                            수리 유형 : <v-chip style="margin-right:3px" v-for="(tag, i) in askHashTag" :key="i">{{ tag }}</v-chip>
                        </v-col>
                        <v-col cols="12" v-if="!checkConsult&&!checkReserved">
                        <!-- {{askId}} -->
                            <v-form ref="form" v-model="valid">
                                <v-text-field type="number" :disabled="disabled" outlined v-model="title" :counter="50" :rules="titleRules" label="수리금액" required prepend-icon="attach_money" suffix="만원"></v-text-field>
                                <v-textarea :disabled="disabled" outlined v-model="content" :counter="400" :rules="contentRules" label="견적상세설명" required prepend-icon="border_color"></v-textarea>
                                <v-text-field type="number" :disabled="disabled" outlined v-model="day" :counter="50" :rules="titleRules" label="예상 수리기간" required prepend-icon="schedule" suffix="일"></v-text-field>
                                <v-combobox
                                    :disabled="disabled"
                                    v-model="hashtag"
                                    hide-selected
                                    label="기타 서비스"
                                    multiple
                                    dense
                                    small-chips
                                    outlined
                                    prepend-icon="tag"
                                    :delimiters="[' ', ',']"
                                    hint="최대 3개 까지">
                                </v-combobox>
                                
                            </v-form>
                            <v-btn :disabled="disabled" v-show="valid&&hashtag.length!==0" width="100%" color="info" @click="clickWriteModify" style="padding:0px;font-size:13px;">견적요청</v-btn>
                        </v-col>
                        <v-col cols="12" v-if="checkConsult&&!checkReserved">
                        <!-- {{askId}} -->
                            <v-form ref="form" v-model="valid">
                                <v-text-field type="number" disabled outlined v-model="title" :counter="50" :rules="titleRules" label="수리금액" required prepend-icon="attach_money" suffix="만원"></v-text-field>
                                <v-textarea disabled outlined v-model="content" :counter="400" :rules="contentRules" label="견적상세설명" required prepend-icon="border_color"></v-textarea>
                                <v-text-field type="number" disabled outlined v-model="day" :counter="50" :rules="titleRules" label="예상 수리기간" required prepend-icon="schedule" suffix="일"></v-text-field>
                                <v-combobox
                                    disabled
                                    v-model="hashtag"
                                    hide-selected
                                    label="기타 서비스"
                                    multiple
                                    dense
                                    small-chips
                                    outlined
                                    prepend-icon="tag"
                                    :delimiters="[' ', ',']"
                                    hint="최대 3개 까지">
                                </v-combobox>
                                
                            </v-form>
                        </v-col>
                        <v-col cols="12" v-if="checkReserved">
                        <!-- {{askId}} -->
                            <v-form ref="form" v-model="valid">
                                <v-text-field type="number" disabled outlined v-model="title" :counter="50" :rules="titleRules" label="수리금액" required prepend-icon="attach_money" suffix="만원"></v-text-field>
                                <v-textarea disabled outlined v-model="content" :counter="400" :rules="contentRules" label="견적상세설명" required prepend-icon="border_color"></v-textarea>
                                <v-text-field type="number" disabled outlined v-model="day" :counter="50" :rules="titleRules" label="예상 수리기간" required prepend-icon="schedule" suffix="일"></v-text-field>
                                <v-combobox
                                    disabled
                                    v-model="hashtag"
                                    hide-selected
                                    label="기타 서비스"
                                    multiple
                                    dense
                                    small-chips
                                    outlined
                                    prepend-icon="tag"
                                    :delimiters="[' ', ',']"
                                    hint="최대 3개 까지">
                                </v-combobox>
                                
                            </v-form>
                            <v-col cols="12">
                            예약자명 : {{ reservedName }}
                            </v-col>
                            <v-col cols="12">
                            예약시간 : {{ reservedDate }}
                            </v-col>
                            <v-col cols="12">
                            연락처 : {{ reservedNumber }} 
                            <v-btn class="info" block @click="call(reservedNumber)">
                            전화하기
                            </v-btn>
                            </v-col>
                        </v-col>
                        
                    <!-- <v-btn :disabled="disabled" v-show="valid&&hashtag.length!==0" width="100%" color="info" @click="clickWriteModify" style="padding:0px;font-size:13px;">견적요청</v-btn> -->
                    </v-row>
                </v-card-text>

                <v-divider style="border-color:#707070; color:#707070;"></v-divider>
            
            </v-card>
        </v-bottom-sheet>
            
        
    </v-row>
    
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import favoriteBtn from './favoriteBtn'
import { dbRead, dbQuery,dbUpdate} from '../firebase'
import numLikes from './numLikes'
import cardListSmallImg from './cardListSmallImg'
import rating from './rating'
import bus from '../utils/bus.js';
import firebase from 'firebase/app'
import search from '../store/modules/search'
import favorite from '../store/modules/favorite'
export default {
    name:'cardListSmall',
    computed:{
        ...mapGetters({
            currentUser: 'getCurrentUser',
            token: 'getToken',
            userProfile: 'getUserProfile',
            titleRules: 'getTitleRules', // write.js
            contentRules: 'getContentRules', // write.js

            // writeModifyImg: 'getWriteModifyImg',
            // writeModifyTitle: 'getWriteModifyTitle',
            // writeModifyContent: 'getWriteModifyContent',
            // writeModifyHashTag: 'getWriteModifyHashTag',
        }),
        checkPage(){
            return this.type==="favorite"
        },
        writeResult() {
            let a = {
                // 글 쓰기 관련 변수
                title: this.title,
                content: this.content,
                hashtag: this.hashtag,
                day:this.day,
                // 자동으로 입력되어야 할 변수
                authorEmail: this.askAuthorEmail,
                authorUid: this.askAuthorUid,
                storeUid: this.userProfile.id,
                // 자동으로 입력되어야 할 변수
                createdAt: new Date(),
                check:false,
                storeToken: this.token
                
                
                // state:"noCheck"
                }
            return a 
        },
        
        
    },
    components: {
        favoriteBtn,
        cardListSmallImg,
        numLikes,
        rating
    },
    data(){
        return {
            items: [],
            loadingImg: true,
            valid:false,
            show:false,
            disabled:false,

            title: '',
            content: '',
            hashtag: '',
            day:'',
            askId:'',

            // showDialog:false,
            askAuthorEmail: '',
            askAuthorUid: '',
            askStoreUid: '',
            askImg:[],
            askHashTag:[],
            askTitle:'',
            askContent:'',

            checkConsult:false,
            checkReserved:false,

            reservedName:'',
            reservedDate:'',
            reservedNumber:'',
        }
    },
    props: ['arts','type'],
    created(){
        console.log(this.type)
        if(this.currentUser === null){
            console.log('if')
            
        }else{
            console.log('else')
            //this.arts = this.arts.sort((t1,t2) => t1.createdAt > t2.createdAt ? -1 : 1)
        }
        
    },
    methods:{
        showItem(item){
            return item.data().reserved ? item.data().storeUid ===this.userProfile.data().uid ? true : false : true 
        },
        showItem1(item){
            return this.$route.name==="search" ? (!item.data().consult.includes(this.userProfile.data().uid)&&!item.data().reserved) ? true : false : this.$route.name==="favorite" ? item.data().consult.includes(this.userProfile.data().uid)&&!item.data().reserved ? true : false :true
        },
        ...mapMutations({
            // changeGridNum: 'changeGridNum',
            // setWriteModifyImg: 'setWriteModifyImg',
            // setWriteModifyTitle: 'setWriteModifyTitle',
            // setWriteModifyContent: 'setWriteModifyContent',
            // setWriteModifyHashTag: 'setWriteModifyHashTag',
        }),
        
        dateTimeToFormatted(dt) {
            let min = 60 * 1000;
            let c = new Date()
            let d = new Date(dt);
            let minsAgo = Math.floor((c - d) / (min));

            let result = {
                'raw': d.getFullYear() + '-' + (d.getMonth() + 1 > 9 ? '' : '0') + (d.getMonth() + 1) + '-' + (d.getDate() > 9 ? '' : '0') +  d.getDate() + ' ' + (d.getHours() > 9 ? '' : '0') +  d.getHours() + ':' + (d.getMinutes() > 9 ? '' : '0') +  d.getMinutes() + ':'  + (d.getSeconds() > 9 ? '' : '0') +  d.getSeconds(),
                'formatted': '',
            };

            if (minsAgo < 60) { // 1시간 내
                result.formatted = minsAgo + '분 전';
            } else if (minsAgo < 60 * 24) { // 하루 내
                result.formatted = Math.floor(minsAgo / 60) + '시간 전';
            } else { // 하루 이상
                result.formatted = Math.floor(minsAgo / 60 / 24) + '일 전';
            };

            return result.formatted;
        },
        clickClose(){
            this.title= ''
            this.content= ''
            this.hashtag= ''
            this.day= ''
            this.show=false
        },
        async clickBtn(item){
            var input2 = {check:true}
            // dbUpdate('ask', id, input2)
            // if item.data().consult.includes(userProfile.data().uid)
            this.checkReserved=item.data().reserved&&item.data().storeUid===this.userProfile.data().uid
            this.checkConsult=item.data().consult.includes(this.userProfile.data().uid)&&!item.data().reserved
            console.log(this.checkConsult)
            console.log(this.$route.name)
            console.log(this.token)
            this.askId=item.id
            this.askAuthorEmail=item.data().authorEmail
            this.askAuthorUid=item.data().authorUid
            // this.askStoreUid=item.data().storeUid
            this.askImg=item.data().img
            this.askTitle=item.data().title
            this.askContent=item.data().content
            this.askHashTag=item.data().hashtag
            if (this.checkConsult&&!this.checkReserved){//내가 상담중이라면
                var query =  await this.$db.collection('ask').doc(item.id).collection('write').where("storeUid","==",this.userProfile.data().uid).get()
                console.log(query)
                var docs=[]
                query.forEach(doc=>{
                    docs.push(doc)
                })
                console.log(docs[0])    
                this.title=docs[0].data().title
                this.content=docs[0].data().content
                this.hashtag=docs[0].data().hashtag
                this.day=docs[0].data().day
            }else if(this.checkReserved){
                var query =  await this.$db.collection('ask').doc(item.id).collection('write').where("storeUid","==",this.userProfile.data().uid).get()
                console.log(query)
                var docs=[]
                query.forEach(doc=>{
                    docs.push(doc)
                })
                console.log(docs[0])    
                this.title=docs[0].data().title
                this.content=docs[0].data().content
                this.hashtag=docs[0].data().hashtag
                this.day=docs[0].data().day

                var db =  await this.$db.collection('ask').doc(item.id).get()
                console.log(db.data())
                this.reservedName=db.data().name
                this.reservedDate=db.data().date
                this.reservedNumber=db.data().number
            }
            
            
            this.show=!this.show
            console.log(this.show)
        },
        async clickWriteModify(type){
            this.disabled = true
            // storage에 이미지 업로드
            this.$store.commit('changeNavBtnDisabled')
            await bus.$emit('start:spinner')
            // let a = await dbRead("userProfiles",this.askStoreUid)
            // console.log(a)
            // console.log(this.askStoreUid)
            // let input = {...this.writeResult,storeName:a.data().displayName, address:a.data().address}
            await this.$db.collection('ask').doc(this.askId).update({
                consult: firebase.firestore.FieldValue.arrayUnion(this.userProfile.id),
                count: firebase.firestore.FieldValue.arrayUnion(this.userProfile.id)
            })
            // firestore에 업로드
            let w = await this.$db.collection('ask').doc(this.askId).collection('write').add( 
                {...this.writeResult,storeName:this.userProfile.data().displayName, address:this.userProfile.data().address, phoneNum:this.userProfile.data().phoneNum, storeAvatarUrl:this.userProfile.data().userAvatarUrl}
            )
            // await this.$db.collection('ask').doc(this.$route.params.reviewId).collection('comments').doc(id)
            // for(var i in this.writeModifyImg) { 
            //     var uploadTaskSnapshot = await this.$storage.child('ask').child(this.currentUser.uid).child(w.id).child(i).child('ask_'+i).put(this.writeModifyImg[i].file)
            //     var url = await uploadTaskSnapshot.ref.getDownloadURL()
            //     //let name = uploadTaskSnapshot.metadata.name

            //     this.uploadedImg.push({url:url})
            // }

            var input2 = {check:false}
            await dbUpdate('ask', this.askId, input2)
            // this.setWriteModifyImg([])
            // this.writeModifyImg=[]
            // await this.fetchArts()
            this.title = ''
            this.content = ''
            this.hashtag = []
            this.askImg=[]
            this.day=''
            await bus.$emit('end:spinner')
            this.$store.commit('changeNavBtnDisabled')
            this.show = false
            this.disabled = false
        },
        async call(reservedNumber){
            this.$store.commit('changeNavBtnDisabled')
            await bus.$emit('start:spinner')
            this.disabled = true
            window.location.href = "tel:"+reservedNumber

            this.disabled = false
            await bus.$emit('end:spinner')
            this.$store.commit('changeNavBtnDisabled')
        }

    },
    mounted(){
        // this.title = this.writeModifyTitle
        // this.content = this.writeModifyContent
        // this.hashtag = this.writeModifyHashTag
    },
    watch: {
        // title(){
        //     this.title = this.title.replace(/[^0-9]/g, '');
        //     // this.title=''
        //     console.log(this.title)
        //     // if (this.title===''){
        //     //     alert("숫자만 입력해주세요")
        //     //     console.log(123)
        //     // }
        //     // alert("숫자만 입력해주세요")
        //     // alert(this.title)
        // },
        // content(){
        //     // this.setWriteModifyContent(this.content)
        // },
        // day(){
        //     this.day = this.day.replace(/[^0-9]/g, '');
        // },
        hashtag (val) {
            if (val.length > 3) {
                this.$nextTick(() => this.hashtag.pop())
            }
            // this.setWriteModifyHashTag(this.hashtag)
        },
   
  }
}
</script>

<style scoped>

/* 무료타투 버튼 */
.v-btn:not(.v-btn--text):not(.v-btn--outlined):hover:before {
    opacity: 0;
}
.inner {
    transition: transform 0.3s;
}
.inner:hover {
    -webkit-transform: scale(0.95);
    -ms-transform: scale(0.95);
    transform: scale(0.95)
}

.card{
    padding:20px;
    /* margin-top:14px; */
}
/* 조회수, 좋아요 card-text */
.v-card__text{
    /* padding:0px 0px 0px 0px;
    line-height: 0rem;
    align-items: baseline; */
}
/* 조회수, 좋아요 아이콘 높낮이 조절 */
.v-icon.v-icon{
    line-height: 0.02;
    align-items: center;
}
.text-ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  word-wrap: break-word;
}
/* 이미지 둥글게 */
.rounded-img{
    border-radius: 12px 12px 12px 12px;
}
</style>