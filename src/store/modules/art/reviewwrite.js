import { reviews } from '../../../firebase.js';
import { arts } from '../../../firebase.js';

// AppArtWrite.vue의 Write 관련된 함수 모아 놓은 곳

const state = {
    writeIdFromArt: '',
    artAuthorUid: '',
    
}

const getters = {
    getWriteIdFromArt(state) {
        return state.writeIdFromArt
    },
    getArtAuthorUid(state){
        console.log('getArtAuthorUid')
        return state.artAuthorUid
    }
}

const mutations = {
    setWriteIdFromArt(state, writeId) {
        console.log('setWriteIdFromArt')
        state.writeIdFromArt = writeId
    },
    setArtAuthorUid(state, authorUid) {
        console.log('setArtAuthorUid')
        state.artAuthorUid = authorUid
    }
    
}

const actions = {  
    
    doReviewWrite(context, result) {
        context.commit('changeNavBtnDisabled')
        // console.log(result)
        reviews.add({
            ...result, // 글 쓰기 관련 변수 + 이미지 관련변수 + 자동입력 되어야할 변수
            
            
        })
        .then().catch();
        context.commit('changeNavBtnDisabled')
      },
      fetchArtAuthorUid(context, writeId){
        console.log('fetchArtAuthorUid')
        context.commit('changeNavBtnDisabled')
        // console.log(writeId)
        arts.doc(writeId).get().then(
            doc => {
                console.log('fetchArtAuthorUid')
                // console.log(doc.data())
                context.commit('setArtAuthorUid', doc.data().authorUid)
            }
        ).catch()
        context.commit('changeNavBtnDisabled')
    },

    
}

export default {
    state,
    getters,
    mutations,
    actions,
  };