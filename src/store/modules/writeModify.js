
const state = {
    writeModifyImg: [],

    writeModifyTitle: '',
    writeModifyContent: '',
    writeModifyLocationSelected:'',

    writeModifySize: '',
    writeModifyPrice: '',
    writeModifyTimeExpected: '',
    writeModifyNumExpected: '',

    writeModifyGenre: '',
    writeModifyConcept: '',
    writeModifyPart: '',
    writeModifyHashTag: '',
}

const getters = {
    getWriteModifyImg(state){
        return state.writeModifyImg
    },

    getWriteModifyTitle(state){
        return state.writeModifyTitle
    },
    getWriteModifyContent(state){
        return state.writeModifyContent
    },
    getWriteModifyLocationSelected(state){
        return state.writeModifyLocationSelected
    },

    getWriteModifySize(state){
        return state.writeModifySize
    },
    getWriteModifyPrice(state){
        return state.writeModifyPrice
    },
    getWriteModifyTimeExpected(state){
        return state.writeModifyTimeExpected
    },
    getWriteModifyNumExpected(state){
        return state.writeModifyNumExpected
    },


    getWriteModifyGenre(state){
        return state.writeModifyGenre
    },
    getWriteModifyConcept(state){
        return state.writeModifyConcept
    },
    getWriteModifyPart(state){
        return state.writeModifyPart
    },
    getWriteModifyHashTag(state){
        return state.writeModifyHashTag
    },
}

const mutations = {
    setWriteModifyImg(state, img){
        state.writeModifyImg = img
    },

    setWriteModifyTitle(state, title){
        state.writeModifyTitle = title
    },
    setWriteModifyContent(state, content){
        state.writeModifyContent = content
    },
    setWriteModifyLocationSelected(state, locationSelected){
        state.writeModifyLocationSelected = locationSelected
    },


    setWriteModifySize(state, size){
        state.writeModifySize = size
    },
    setWriteModifyPrice(state, price){
        state.writeModifyPrice = price
    },
    setWriteModifyTimeExpected(state, timeExpected){
        state.writeModifyTimeExpected = timeExpected
    },
    setWriteModifyNumExpected(state, numExpected){
        state.writeModifyNumExpected = numExpected
    },

    setWriteModifyGenre(state, genre){
        state.writeModifyGenre = genre
    },
    setWriteModifyConcept(state, concept){
        state.writeModifyConcept = concept
    },
    setWriteModifyPart(state, part){
        state.writeModifyPart = part
    },
    setWriteModifyHashTag(state, hashTag){
        state.writeModifyHashTag = hashTag
    },
    
    setWriteModifyCancel(state, fetchedData){
        state.writeModifyImg = []

        state.writeModifyTitle = ''
        state.writeModifyContent = ''
        state.writeModifyLocationSelected =''
    
        state.writeModifySize = ''
        state.writeModifyPrice = ''
        state.writeModifyTimeExpected = ''
        state.writeModifyNumExpected = ''
    
        state.writeModifyGenre = ''
        state.writeModifyConcept = ''
        state.writeModifyPart = ''
        state.writeModifyHashTag = ''
    }
}

const actions = {
    //init
    // async fetchUserProfile(context, payload){
    //     context.commit('setUserProfile', doc)
    // },
}

export default {
    state,
    getters,
    mutations,
    actions,
  };