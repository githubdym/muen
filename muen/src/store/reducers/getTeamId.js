import {get } from '../../request/index'

export const getTeamId=function(state=[],action){
    switch(action.type){
        case 'getTeammember':
            let newState=JSON.parse(JSON.stringify(state));
            console.log(action.data)
            newState.push(action.data)
            return [...newState];

        default:
            return [...state];
    } 

}

export function getData(data){
    return function(next){
    
    get(`/group/members?groupId=${data}`).then(res=>{
            next({type:'getTeammember',data:res.result})
        }); 
    }
}