import { AnyEntity } from "@rbxts/matter";
import Rodux from "@rbxts/rodux";
import { Unit } from "shared/components";
import { SelectedUnitChanged } from "../actions/changeSelectedUnit";

interface State {
	selectedUnit: AnyEntity | undefined;
}

const selectedUnit = Rodux.createReducer<State, SelectedUnitChanged>(
	{
		selectedUnit: undefined,
	},
	{
		selectedUnitChanged: (state, action) => {
			state = {
				selectedUnit: action.unit,
			};
			return state;
		},
	},
);

export default selectedUnit;
