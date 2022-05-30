import { combineReducers } from "redux";
import { nameReducer,classReducer,emailReducer,phoneReducer,idReducer,dataReducer } from "./reducers";

const reducers = combineReducers({
    emailReducer:emailReducer,
    nameReducer:nameReducer,
    classReducer:classReducer,
    phoneReducer:phoneReducer,
    idReducer:idReducer,
    dataReducer:dataReducer
})

export default reducers;