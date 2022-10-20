import { UnitDescriptor } from "shared/units";

export interface PlacementChanged {
	type: string;
	placingUnit: UnitDescriptor | undefined;
}

const placementChanged = (placingUnit: UnitDescriptor | undefined): PlacementChanged => {
	return {
		type: "placementChanged",
		placingUnit: placingUnit,
	};
};

export default placementChanged;
