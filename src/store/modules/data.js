const state = {
    // 규칙
    displayNameRules: {
        required: value => !!value || '닉네임은 필수 입니다.',
        max: v => (v && v.length <= 15) || '닉네임은 15글자 이내로 작성 바랍니다.',
    },
    titleRules: [
        v => !!v || '수리금액은 필수 입니다.',
        v => (v && v.length <= 50) || '금액은 숫자로 작성 바랍니다.',
    ],
    contentRules: [
        v => !!v || '내용은 필수 입니다.',
        v => (v && v.length <= 400) || '내용은 400글자 이내로 작성 바랍니다.',
    ],
    sizeRules: [v => !!v || '사이즈 선택은 필수 입니다.'],
    priceRules: [v => !!v || '가격은 필수입니다.'],
    timeExpectedRules: [v => !!v || '예상시간은 필수입니다.'],
    numExpectedRules: [v => !!v || '예상횟수는 필수입니다.'],
    genreRules: [v => !!v || '장르 선택은 필수입니다.'],
    conceptRules: [v => !!v || '컨셉 선택은 필수입니다.'],
    partRules: [v => !!v || '부위 선택은 필수입니다.'],

    // login, signup
    emailPasswordRules: {
        required: value => !!value || 'Required.',
        min: v => (v.length >= 6 || v.length === 0) || 'Min 6 characters',
        email: value => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return pattern.test(value) || 'Invalid e-mail.'
        }
    },

}

const getters = {
    // AppSearch.vue and AppArtWrite.vue
    // 이미 정해진 내용
    getGenres(state) {
        return state.genres
    },
    getConcepts(state) {
        return state.concepts
    },
    getParts(state) {
        return state.parts
    },
    getSizes(state){
        return state.sizes
    },

    // Rules
    getDisplayNameRules(state){
        return state.displayNameRules
    },
    getTitleRules(state){
        return state.titleRules
    },
    getContentRules(state){
        return state.contentRules
    },
    getSizeRules(state){
        return state.sizeRules
    },
    getPriceRules(state){
        return state.priceRules
    },
    getTimeExpectedRules(state){
        return state.timeExpectedRules
    },
    getNumExpectedRules(state){
        return state.numExpectedRules
    },
    getGenreRules(state){
        return state.genreRules
    },
    getConceptRules(state){
        return state.conceptRules
    },
    getPartRules(state){
        return state.partRules
    },
    // login, signup
    getEmailPasswordRules(state){
        return state.emailPasswordRules
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