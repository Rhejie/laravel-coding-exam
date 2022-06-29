import { createStore } from 'vuex'
import {isLoggedIn} from '../composables/auth/auth_service'
import UserProfile from '../interfaces/UserProfile'
export default createStore({
  state: {
    isLoggedIn: false,
    apiURL: 'http://app-api.test/api',
    profile: {} as UserProfile 
  },
  getters: {

  },
  mutations: {
    authenticate(state, payload) {
      state.isLoggedIn = isLoggedIn()
      if(state.isLoggedIn) {
        state.profile = payload
      }
      else {
        state.profile = {} as UserProfile;
      }
    }
  },
  actions: {
    authenticate(context, payload) {
      context.commit('authenticate', payload)
    }
  },
  modules: {
  }
})
