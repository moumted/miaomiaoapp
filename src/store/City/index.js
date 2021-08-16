const state = {
    name:window.localStorage.getItem("cityname") || '江苏',
    id : '1'
};
const mutations = {
    CITY_STATE(state,payload){
            state.name = payload.cityname,
            state.id = payload.cityid
    }

};
const actions = {
    
};


export default{
    namespace:true,
    state,
    mutations,
    actions
}
