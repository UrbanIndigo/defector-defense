import Rodux from "@rbxts/rodux";
import unitReducer from "shared/store/reducers/unitReducer";
import playerMoneyReducer from "./reducers/playerMoneyReducer";

const reducer = Rodux.combineReducers({ playerMoneyReducer });

const store = new Rodux.Store(reducer);

export default store;
