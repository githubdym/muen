import {get } from '../../request/index'

let getTeamId=function(state=[],action){
    switch(action.type){
        case 'getTeammember':
            let newState=JSON.parse(JSON.stringify(state));
           get(`/group/members?groupId=${action.data}`).then(res=>{
                newState=res.result;    
            }); 
            if(newState.length>0){
                return newState;
            }
            console.log(newState);
            return newState;

        default:
            return state;
    } 

}
export default getTeamId