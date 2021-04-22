import { favorites, ask, userProfiles, dbRead, token } from '../../firebase.js';
import { bus } from '../../utils/bus'

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
    
    async fetchFavoritesDocsToArray(context, userUid){
        context.commit('changeNavBtnDisabled')
        // const item = [];
        let a = await dbRead("userProfiles", userUid)
        // var latLng = a.data().LatLng
        await ask.onSnapshot(function(querySnapshot) {
            let item = [];
            let latLng =  a.data().latLng
            querySnapshot.forEach(function(doc) {
                var startLatRads= doc.data().LatLng.lat * Math.PI / 180
                var startLngRads = doc.data().LatLng.lng * Math.PI / 180
                var destLatRads = latLng.lat * Math.PI / 180
                var destLngRads = latLng.lng * Math.PI / 180
                var Radius = 6371
                console.log(startLatRads, startLngRads, destLatRads, destLngRads)
                var distance = Math.acos(Math.sin(startLatRads) * Math.sin(destLatRads) + Math.cos(startLatRads) * Math.cos(destLatRads) * Math.cos(startLngRads - destLngRads)) * Radius;
                console.log(distance)
                if (doc.data().storeUid === userUid){
                    if (doc.data().reserved){
                        //fetch-snackbar-reserved
                    }
                    item.push(doc);
                } else if (distance <= 3){
                    item.push(doc);
                } else if (isNaN(distance)){
                    item.push(doc);
                }else{
                    return
                }

            });
            item.sort((t1, t2) => t1.data().createdAt > t2.data().createdAt ? -1 : 1)
            console.log("New item: ", item);
            context.commit("setFavoritesDocsToArray", item);
        });
        context.commit('changeNavBtnDisabled')
        
    },

    
}

export default {
    state,
    getters,
    mutations,
    actions,
  };