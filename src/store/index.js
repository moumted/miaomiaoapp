import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    datalist:true
  },
  mutations: {
    cityid(state,data){
      console.log("111111111",data)
      state.datalist = false
    }
  },
  actions: {
  },
  modules: {
  }
})
