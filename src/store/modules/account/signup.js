import { userProfiles } from '../../../firebase.js';
import { following } from '../../../firebase.js';
import { follower } from '../../../firebase.js';

const state = {
  signUpEmail:'',
  signUpPassword:'',
}

const getters = {
  getSignUpEmail(state){
    return state.signUpEmail
  },
  getSignUpPassword(state){
    return state.signUpPassword
  },
}

const mutations = {
  setSignUpEmail(state, fetchedData){
    state.signUpEmail = fetchedData
  },
  setSignUpPassword(state, fetchedData){
    state.signUpPassword = fetchedData
  },
}

const actions = {
    
   
    
}

export default {
    state,
    getters,
    mutations,
    actions,
  };


