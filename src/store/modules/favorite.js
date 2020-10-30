import { favorites } from '../../firebase.js';


const state = {
    favoritesDocsToArray: [],
}

const getters = {
    getFavoritesDocsToArray(state) {
        return state.favoritesDocsToArray
    }

}

const mutations = {
    setFavoritesDocsToArray(state, item) {
        state.favoritesDocsToArray = item
    }

}

const actions = {
    
    fetchFavoritesDocsToArray(context, userUid){
        context.commit('changeNavBtnDisabled')
        favorites.where('userUid', '==', userUid).get()
        .then(querySnapshot => {
            let item = []
            querySnapshot.forEach(
                doc => {
                    item.push(doc)
            })
            context.commit('setFavoritesDocsToArray', item)
        }).catch()  
        context.commit('changeNavBtnDisabled')
    },

    
}

export default {
    state,
    getters,
    mutations,
    actions,
  };