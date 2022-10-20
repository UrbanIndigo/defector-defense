import { UnitDescriptor, UnitInstance } from "shared/units";

export interface UnitAdded {
	type: string;
	unit: UnitInstance;
	cframe: CFrame;
}

const unitAdded = (unit: UnitInstance, cframe: CFrame): UnitAdded => {
	return {
		type: "unitAdded",
		unit,
		cframe,
	};
};

export default unitAdded;
