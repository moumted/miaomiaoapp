import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    citynum:''
  },
  mutations: {
    cityid(state,data){
      console.log("111111111",data)
      state.citynum = data
    }
  },
  actions: {
  },
  modules: {
  }
})
