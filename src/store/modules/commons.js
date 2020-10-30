import firebase from 'firebase/app'
import { arts, appContents, dbRead } from '../../firebase.js';
import { store } from '../store'
import bus from '../../utils/bus'
const state = {
    // init
    bottomOfWindow:false,
    showTopSheet:false,
    currentUser: '', // 현재 로그인한 유저(currentUser)
    userProfile: '', // 현재 로그인한 유저의 프로필 정보(userProfile)
    arts: [],
    artsItems: [],
    history: [],
    gridSix: true,
    navBtnDisabled: false,
    img:'',
    css: '',
    top:0,
    prevTop:0,
    historyTop:{},
    sortBy: 'createdAt',
    footer: {
        page: 1,
        itemsPerPage: 12,
      },
    filter: {
        // 장소, 장르, 주제, 부위 초기화
        locationSelected: '',
        genreClickedList: [],
        conceptClickedList: [],
        partClickedList: [],
    },
    globalSearch:'',
    eventImg:'',
}

const getters = {
    getBottomOfWindow(state){
        return state.bottomOfWindow
    },
    getGridSix(state){
        return state.gridSix
    },
    //init
    getCurrentUser(state) {
        return state.currentUser
    },
    getUserProfile(state) {
        return state.userProfile
    },
    getArts(state) {
        return state.arts
    },
    getRouterHistory(state){
        return state.history
    },
    getNavBtnDisabled(state){
        return state.navBtnDisabled
    },
    getImg(state){
        return state.img
    },
    getCss(state){
        return state.css
    },
    getText(state){
        return state.text
    },
    getTop(state){
        return state.top
    },
    getPrevTop(state){
        return state.prevTop
    },
    getHistoryTop(state){
        return state.historyTop
    },
    getSortBy(state){
        return state.sortBy
    },
    getFooter(state){
        return state.footer
    },
    getFilter(state){
        return state.filter
    },
    getGlobalSearch(state){
        return state.globalSearch
    },
    getArtsItems(state){
        return state.artsItems
    },
    getEventImg(state){
        return state.eventImg
    },
    getShowTopSheet(state){
        return state.showTopSheet
    }
}

const mutations = {
    setBottomOfWindow(state, value){
        state.bottomOfWindow = value
    },
    prevTopZero(state){
        state.prevTop = 0
    },
    changeShowTopSheet(state, bool){
        state.showTopSheet = bool
    },
    setGlobalSearch(state, search){
        console.log('bull')
        state.globalSearch = search
    },
    changeGridNum(state, fetchedData){
        console.log('changeGridSix')
        state.gridSix = !state.gridSix
    },
    //init
    setCurrentUser(state, fetchedData) {
        console.log('setCurrentUser')
        if (fetchedData) {
            state.currentUser = fetchedData
        }else{
            state.currentUser = null
        }
    },
    setUserProfile(state, fetchedData) {
        state.userProfile = fetchedData
    },
    // arts
    setArts(state, fetchedData){
        
        state.arts = fetchedData
    },
    //router history
    setRouterHistory(state, path) {
        let a = ['/home', '/search/all', '/favorite', '/mymenu', '/beforelogin']
        let k = a.includes(path)
        
        if(k){
            state.history = []
        }
        
        if(state.history[state.history.length - 1] !== path){
            state.history.push(path)
        }
        // console.log(state.history)
    },
    clickBack(state, component) {
        console.log('click back')
        if (state.history[state.history.length - 2].indexOf("/art/") != -1 && state.history[state.history.length - 1].indexOf("/art/") != -1){//현재와 이전이 모두 art면
            state.history.splice(-1, 1)
            // console.log(state.history)
            // console.log(state.history[state.history.length - 1])
            component.$router.push(state.history[state.history.length - 1])
        }else{
            state.history.splice(-1,1)
            // console.log(state.history)
            component.$router.push(state.history[state.history.length - 1])
        }
    },
    changeNavBtnDisabled(state, fetchedData){
        console.log('navBtnDisabled changed')
        // console.log(state.navBtnDisabled)
        state.navBtnDisabled = !state.navBtnDisabled
    },
    setImg(state, img){
        state.img = img
    },
    setCss(state, css){
        state.css = css
    },
    setText(state, text){
        state.text = text
    },
    setTop(state, top){
        state.prevTop = state.top
        state.top = top
    },
    setHistoryTop(state, val){
        state.historyTop[val.path] = val.top
    },
    setSortBy(state, sortBy){
        state.sortBy = sortBy
    },
    setUpFooter(state){
        state.footer.page += 1
    },
    setDownFooter(state){
        state.footer.page -= 1
    },
    setFooteritemsPerPage(state){
        state.footer.itemsPerPage += 12
    },
    setArtsItems(state, items){
        state.artsItems = items
    },
    setEventImg(state, img){
        state.eventImg = img
    },
}

const actions = {
    //init
    async fetchUserProfile(context){ 
        await console.log('fetchUserProfile')
        context.commit('changeNavBtnDisabled')
        firebase.auth().onAuthStateChanged(async user => {
            if(user){
                let doc = await dbRead('userProfiles', user.uid)
                // 그리고 넘겨줌
                context.commit('setUserProfile', doc)
            }else{
                context.commit('setUserProfile', null)
            }
        })
        context.commit('changeNavBtnDisabled')
    },
    // artList 
    async fetchArts(context) { // 여기서 출력해주는 artList는 artList의 item들을 담은 array임
        // alert('start')
        context.commit('changeNavBtnDisabled')
        let querySnapshot = await arts.get()
        const items = []
        querySnapshot.forEach(doc => { items.push(doc) })
        items.sort((t1,t2) => t1.data().createdAt > t2.data().createdAt ? -1 : 1)
        context.commit('setArts', items)
        // alert('middle')
        var a = []
        items.forEach( async art => {
            a.push({ ...art.data(), id:art.id})
        })
        context.commit('setArtsItems', a)
        context.commit('changeNavBtnDisabled')
        // alert('end')
    },
    async fetchImg(context){

        context.commit('changeNavBtnDisabled')
        let a = await appContents.doc('img').get()
        context.commit('setImg', a)
        context.commit('changeNavBtnDisabled')
    },
    async fetchCss(context){

        context.commit('changeNavBtnDisabled')
        let a = await appContents.doc('css').get()
        context.commit('setCss', a)
        context.commit('changeNavBtnDisabled')
    },
    async fetchText(context){

        context.commit('changeNavBtnDisabled')
        let a = await appContents.doc('text').get()
        context.commit('setText', a)
        context.commit('changeNavBtnDisabled')
    },
    async fetchEventImg(context){

        context.commit('changeNavBtnDisabled')
        var a = await appContents.doc('img').get()
        context.commit('setEventImg', a.data().home.eventImg)
        context.commit('changeNavBtnDisabled')
    },
}

export default {
    state,
    getters,
    mutations,
    actions,
  };