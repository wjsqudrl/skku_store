const state = {
    data: "",
    service: "",
    open: "firebase"

}

const getters = {
    getData(state) {
        return state.data
    },
    getService(state) {
        return state.service
    },
    getOpen(state) {
        return state.open
    },
}

const mutations = {
}

const actions = {
}

export default {
    state,
    getters,
    mutations,
    actions,
  };