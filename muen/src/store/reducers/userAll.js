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
        case "ADD":
        let AddState=JSON.parse(JSON.stringify(state));
        AddState.push(action.data)
        return AddState
        case "CHANGE_LIST":
        let ChangeList=JSON.parse(JSON.stringify(state));
        ChangeList.length=0;
        ChangeList=action.data
        return ChangeList
        default :
        return state
    }
}











export default userAll