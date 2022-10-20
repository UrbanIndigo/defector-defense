import Rodux from "@rbxts/rodux";
import { UnitInstance } from "shared/units";
import { MoneyChanged } from "../../../client/store/actions/moneyChanged";
import { UnitAdded } from "../actions/unitAdded";

interface State {
	units: UnitInstance[];
}

const unitReducer = Rodux.createReducer<State, UnitAdded>(
	{
		units: [],
	},
	{
		unitAdded: (state, action) => {
			state = {
				units: [action.unit, ...state.units],
			};
			return state;
		},
	},
);

export default unitReducer;
