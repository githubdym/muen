
let teamManage=function(state=[],action){
    switch(action.type){
        case 'get':
            state=action.data;
            return state;
        default :
        return state
    }
}
export default teamManage