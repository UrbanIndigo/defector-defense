import Rodux from "@rbxts/rodux";
import { UnitDescriptor } from "shared/units";
import { PlacementChanged } from "../actions/placementChanged";

interface State {
	placingUnit: UnitDescriptor | undefined;
}

const placementReducer = Rodux.createReducer<State, PlacementChanged>(
	{
		placingUnit: undefined,
	},
	{
		placementChanged: (state, action) => {
			state = {
				placingUnit: action.placingUnit,
			};
			return state;
		},
	},
);

export default placementReducer;
