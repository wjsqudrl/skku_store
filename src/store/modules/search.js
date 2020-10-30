// AppSearch.vue의 Search 관련된 함수 모아 놓은 곳

const state = {
  filteredArray: [],  // 최종 출력 아이템 어레이
  locations: ['서울', '홍대', '강남', '이태원', '경기남부', '경기북부', '인천', '부산', '대구', '대전', '전북', '전남', '충북', '충남', '경북', '경남', '울산', '광주', '강원', '세종', '제주도'],// 정해진 상수들
}

const getters = {
  // 최종 출력 아이템 어레이
  getFilteredArray(state) {  
    return state.filteredArray
  },
  // 정해진 상수들
  getLocations(state) {
    return state.locations
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