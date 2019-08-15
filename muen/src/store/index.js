import {createStore,combineReducers} from "redux"

import userAll from "./reducers/userAll"
const reducers=combineReducers({
        userAll,
})



let Store=createStore(reducers)


export default Store