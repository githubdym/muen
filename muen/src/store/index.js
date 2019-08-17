import {createStore,combineReducers,applyMiddleware} from "redux"
import thunk from 'redux-thunk'

import userAll from "./reducers/userAll"
import {getTeamId} from './reducers/getTeamId'
import teamManage from './reducers/teamManage'
const reducers=combineReducers({
        userAll,teamManage,getTeamId
})



let Store=createStore(reducers,applyMiddleware(thunk))


export default Store