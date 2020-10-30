const state = {

}

const getters = {
    
}

const mutations = {
    setUserProfileFromNewUser(state, payload){
        userProfiles.doc(payload.doc.user.uid).set({
            email: payload.doc.user.email,
            name: null,
            gender: null,
            isArtist: false,
            favoriteTattoos: [],
            latestTattoos: [],
            followList: [],
            uid: payload.doc.user.uid,
            displayName: payload.doc.user.displayName,//this.email.split('@', 1)[0],
            createdAt: new Date(),})
        .then(alert('가입이 완료 되었습니다.')).catch()
    }
}

export default {
    state,
    getters,
    mutations,
  };


