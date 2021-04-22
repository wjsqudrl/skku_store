import { reviews, dbQuery, dbRead } from "../../../firebase.js";

// AppMyReviews.vue에서 나오는 function들


const state = {
    reviewsDocsToArray: [],
    reviewToMe: [],
}

const getters = {
    getReviewsDocsToArray(state){
        return state.reviewsDocsToArray
    },
    getReviewToMe(state){
        return state.reviewToMe
    }
}

const mutations = {
    setReviewsDocsToArray(state, fetchedData) {
        state.reviewsDocsToArray = fetchedData
    },
    setReviewToMe(state, fetchedData) {
        state.reviewToMe = fetchedData
    }

}

const actions = {
    // reviews
    async fetchReviewsDocsToArray(context, userId) { // 여기서 출력해주는 artList는 artList의 item들을 담은 array임
        context.commit('changeNavBtnDisabled')
        let querySnapshot = await dbQuery('reviews', 'authorUid', '==', userId)
        let items = []
        querySnapshot.forEach(doc => {items.push(doc)})
        context.commit('setReviewsDocsToArray', items)
        context.commit('changeNavBtnDisabled')
    },
    async fetchReviewToMe(context, userId) {
        // console.log(userId)
        context.commit('changeNavBtnDisabled')
        let items2 = []
        let querySnapshot2 = await dbQuery('reviews', 'storeUid', '==', userId)
        querySnapshot2.forEach(doc=>{items2.unshift(doc);})

        context.commit('setReviewToMe', items2)
        context.commit('changeNavBtnDisabled')
    },
}

export default {
    state,
    getters,
    mutations,
    actions,
  };