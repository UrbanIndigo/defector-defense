import Rodux from "@rbxts/rodux";
import unitReducer from "shared/store/reducers/unitReducer";
import gameInfoReducer from "./reducers/gameInfoReducer";
import healthReducer from "./reducers/gameInfoReducer";
import moneyReducer from "./reducers/moneyReducer";
import placementReducer from "./reducers/placementReducer";
import selectedUnit from "./reducers/selectedUnit";

const reducer = Rodux.combineReducers({
	moneyReducer,
	placementReducer,
	unitReducer,
	gameInfoReducer,
	selectedUnit,
});

const store = new Rodux.Store(reducer);

export default store;
