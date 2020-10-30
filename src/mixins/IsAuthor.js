import { dbQuery, dbRead } from "../firebase"

export default {
    data() {
        return {
            authorProfile: '',
            authorDoc: '',
        }
    },
    computed: {
        isAuthor() {
            return this.userProfile ? this.authorProfile ? this.userProfile.data().uid === this.authorProfile.data().uid ? true : false : false : false
        },
        isAuthorShow(){
            return this.authorProfile ? true : false
        }
    },
    async created() {
    },
    async mounted(){
        this.$store.commit('changeNavBtnDisabled')
        await this.getAuthorDoc(this.authorDocType)
        await this.getAuthorProfile(this.authorDocType)
        this.$store.commit('changeNavBtnDisabled')
    },
    methods: {
        // 글 내용 초기화 authorDoc
        async getAuthorDoc(type) {
            this.$store.commit('changeNavBtnDisabled')
            // authorDoc 받아오기
            // console.log(type)
            if(type === 'art'){
                let doc = await dbRead('arts', this.$route.params.writeId)
                this.authorDoc = doc
            }else if(type === 'art/comment'){
                let doc = await this.$db.collection('arts').doc(this.$route.params.writeId).collection('comments').doc(this.comment.id).get()
                this.authorDoc = doc
            }else if(type === 'review/comment'){
                let doc = await this.$db.collection('reviews').doc(this.$route.params.reviewId).collection('comments').doc(this.comment.id).get()
                this.authorDoc = doc
            }else if(type === 'review'){
                let doc = await dbRead('reviews', this.$route.params.reviewId)
                this.authorDoc = doc
            }else{
            }
            this.$store.commit('changeNavBtnDisabled')
        },
        async getAuthorProfile(type){
            this.$store.commit('changeNavBtnDisabled')
            // authorProfile 받아오기
            if(type === 'mypage' || type === 'accountsettings'){
                let querySnapshot = await dbQuery('userProfiles', 'uid', '==', this.$route.params.id)
                querySnapshot.forEach(
                doc => {
                    this.authorProfile = doc
                })
            }else{
                let querySnapshot = await dbQuery('userProfiles', 'uid', '==', this.authorDoc.data().authorUid)
                querySnapshot.forEach(
                doc => {
                    this.authorProfile = doc
                })
            }
            this.$store.commit('changeNavBtnDisabled')
        }

    }
}