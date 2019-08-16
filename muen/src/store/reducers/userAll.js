let userAll=function(state=[],action){
    switch(action.type){
        case "GET_LIST":
        state=action.data
        let newState=JSON.parse(JSON.stringify(state))
        return newState;
        case "DEL":
        let DelState=JSON.parse(JSON.stringify(state))
        let index=DelState.findIndex(item=>item.key===action.data)
        DelState.splice(index,1)
        return DelState
        case "REPLACE":
        let RelState=JSON.parse(JSON.stringify(state));
        let Relindex=RelState.findIndex(item=>item.key===action.data.userId)
        RelState.splice(Relindex,1,action.data)
        console.log(RelState)
        return RelState
        default :
        return state
    }
}











export default userAll