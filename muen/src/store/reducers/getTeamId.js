import {get } from '../../request/index'

export const getTeamId=function(state=[],action){
    switch(action.type){
        case 'getTeammember':
            let newState=JSON.parse(JSON.stringify(state));
            newState.length=0;
            newState.push(action.data);
        
            return [...newState];
        case 'getDefaultMember':
            let newState2=JSON.parse(JSON.stringify(state))
            newState2.push(action.data);
            return [...newState2];
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
export function getDefault(data){
    return function(next){
    
    get(`/group/members?groupId=${data}`).then(res=>{
            next({type:'getDefaultMember',data:res.result})
        }); 
    }

}