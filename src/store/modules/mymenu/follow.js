const state = {
    tab: '',
}

const getters = {
    getTab(state){
        return state.tab
    }
}

const mutations = {
    setTab(state, tab){
        state.tab = tab
    }
}

const actions = { 
}

export default {
    state,
    getters,
    mutations,
    actions,
  };