import {createStore,combineReducers} from "redux"

import userAll from "./reducers/userAll"
import getTeamId from './reducers/getTeamId'
import teamManage from './reducers/teamManage'
const reducers=combineReducers({
        userAll,teamManage,getTeamId
})



let Store=createStore(reducers)


export default Store