import { AnyEntity } from "@rbxts/matter";
import { Unit } from "shared/components";

export interface SelectedUnitChanged {
	type: string;
	unit: AnyEntity | undefined;
}

const changeSelectedUnit = (unit: AnyEntity | undefined): SelectedUnitChanged => {
	return {
		type: "selectedUnitChanged",
		unit,
	};
};

export default changeSelectedUnit;
