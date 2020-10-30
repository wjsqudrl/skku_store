import { dbQuery } from "../firebase"
import bus from '../utils/bus'

export default {
    data() {
        return {
            originalDisplayName: '', // db 저장 변수
            newDisplayName: '',
            errMsg: '',
            
            checkUserDisplayDone: false,
            
            checkBtnClicked: false,
        }
    },
    computed: {
    },
    created() {
    },
    methods: {
        async checkUserDisplayName(){
            this.$store.commit('changeNavBtnDisabled')
            await bus.$emit('start:spinner')
            let querySnapshot = await dbQuery('userProfiles', 'displayName', '==', this.newDisplayName)
            let item = []
            this.saveErrMsg = ''
            querySnapshot.forEach(doc => {item.push(doc)})
            if(item.length === 0){ // 중복이 없으면
                this.errMsg = '사용할 수 있는 닉네임 입니다.'
                this.checkUserDisplayDone = true
                
            }else{ // 중복이 있으면
                if(this.newDisplayName === this.originalDisplayName){ // 본인 닉네임이랑 같으면
                    this.errMsg = '회원님의 기존 닉네임 입니다.'
                }else{ // 남의 닉네임이랑 같으면
                    this.errMsg = '이미 사용된 닉네임 입니다.'
                }
            }
            await bus.$emit('end:spinner')
            this.$store.commit('changeNavBtnDisabled')
            this.checkBtnClicked = true
        },
        reCheckUserDisplayName(){
            this.checkBtnClicked = false
            this.newDisplayName = ''
            if(this.errMsg === '사용할 수 있는 닉네임 입니다.'){
                console.log('if')
                this.checkUserDisplayDone = false
            }
            this.errMsg = ''
            this.saveErrMsg = ''
        },
    },
}