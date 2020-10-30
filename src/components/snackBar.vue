<template>
    <v-col cols="12">
        <v-scroll-x-transition>
            <v-snackbar
            v-model="snackbar"
            :vertical="true"
            :timeout="2000"
            color="success">
            {{ result.content }}
            <v-btn :disabled="disabled" outlined @click="clickBtn" v-if="!(type==='exitApp')">OK</v-btn>
            </v-snackbar>
        </v-scroll-x-transition>
    </v-col>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import firebase from 'firebase/app'

export default {
    props: ['type'],
    methods: {
        ...mapMutations({
            clickBack: 'clickBack'
        }),
        clickBtn(){
            this.disabled = true
            this.result.method()
        },
        afterWrite(){
            clearTimeout(this.t)
            this.$router.push('/home')  // /home으로 가라
            this.$router.go(0)
        },
        afterReviewWrite(){
            clearTimeout(this.t)
            this.clickBack(this) // 수동으로 뒤로 가라
        },
        afterModify(){
            clearTimeout(this.t)
            this.clickBack(this) // 수동으로 뒤로 가라
        },
        afterLogin(){
            clearTimeout(this.t)
            this.$router.push('/home')  // /home으로 가라
            // this.$router.go(0)
        },
        logoutBtnClick(){
            clearTimeout(this.t)
            this.$router.push('/logout')
        },
        afterLogout(){
            clearTimeout(this.t)
            this.$router.push('/home')
            this.$router.go(0)
        },
        afterSignup(){
            clearTimeout(this.t)
            this.$router.push('/home')
            this.$router.go(0)
        },
        afterReview(){
            clearTimeout(this.t)
            this.clickBack(this)
        },
        afterAccountSettings(){
            clearTimeout(this.t)
            this.clickBack(this)
        },
        async afterSignupWithEmail(){
            clearTimeout(this.t)
            await firebase.auth().signOut()
            this.$router.push('/home')
            this.$router.go(0)
        },
        afterDelete(){
            clearTimeout(this.t)
            this.clickBack(this) // 수동으로 뒤로 가라
        },
        afterReset(){
            clearTimeout(this.t)
            this.clickBack(this) // 수동으로 뒤로 가라
        },
        afterexitApp(){
            clearTimeout(this.t)
            // this.clickBack(this) // 수동으로 뒤로 가라
        },
        afterWriteModifyCancel(){
            clearTimeout(this.t)
        }
    },
    created() { 
        if(this.type !== 'logoutBtnClick' || this.type !== 'writeModifyBack'){
            this.t = setTimeout(() => {
                this.goBack = true
            }, 3000)
        }   
    },
    computed: {
        result() {
            return this.items.filter(item => item.type === this.type)[0]
        },
        ...mapGetters({
            history: 'getRouterHistory'
        })
    },
    watch: {
        goBack(){
            console.log('goBack On')
            this.result.method()
        }
    },
    data() {
        return {
            disabled: false,
            goBack: false,
            snackbar: true,
            t:'',
            // 글쓰기, 수정하기, 로그인, 로그아웃, 회원가입,
            items: [
                {
                    type: 'write',
                    content: '글쓰기가 완료 되었습니다.',
                    method: this.afterWrite
                },
                {
                    type: 'reviewwrite',
                    content: '리뷰 쓰기가 완료 되었습니다.',
                    method: this.afterReviewWrite
                },
                {
                    type: 'modify',
                    content: '수정이 완료 되었습니다.',
                    method: this.afterModify
                },
                {
                    type: 'login',
                    content: '로그인이 완료 되었습니다.',
                    method: this.afterLogin
                },
                {
                    type: 'logoutBtnClick',
                    content: '정말 로그아웃을 하시겠습니까?',
                    method: this.logoutBtnClick
                },
                {
                    type: 'logout',
                    content: '로그아웃이 완료 되었습니다.',
                    method: this.afterLogout
                },
                {
                    type: 'signup', // SetUserProfile.vue
                    content: '회원가입이 완료 되었습니다.',
                    method: this.afterSignup
                },
                {
                    type: 'review',
                    content: '리뷰작성이 완료 되었습니다.',
                    method: this.afterReview
                },
                {
                    type: 'accountSettings',
                    content: '회원정보 수정이 완료 되었습니다.',
                    method: this.afterAccountSettings
                },
                {
                    type: 'signupWithEmail',
                    content: '이메일 인증을 완료 한 후 로그인을 다시 해 주세요.',
                    method: this.afterSignupWithEmail
                },
                {
                    type: 'delete',
                    content: '삭제가 완료 되었습니다',
                    method: this.afterDelete
                },
                {
                    type: 'reset',
                    content: '해당 이메일로 비밀번호 재설정 링크가 발송 되었습니다.',
                    method: this.afterReset
                },
                {
                    type: 'exitApp',
                    content: '한번더 클릭하시면 앱이 꺼집니다.',
                    method: this.afterexitApp
                },
                {
                    type: 'writeModifyCancel',
                    content: '취소하면 작성하신 내용이 전부 삭제 되며 취소 버튼을 한번 더 누르시면 취소가 됩니다 ',
                    method: this.afterWriteModifyCancel
                },
            ]
        }
    }

}
</script>

<style>

</style>