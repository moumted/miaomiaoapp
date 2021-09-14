const state = {
    name : '',
    userHead : ''
};
const mutations = {
    USERNAME(state, payload){
        state.name = payload.name,
        state.userHead = payload.userHead
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
