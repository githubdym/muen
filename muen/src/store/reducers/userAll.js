let userAll=function(state=[],action){
    switch(action.type){
        case "GET_LIST":
        state=action.data
        let newState=JSON.parse(JSON.stringify(state))
        return newState;
        default :
        return state
    }
}











export default userAll