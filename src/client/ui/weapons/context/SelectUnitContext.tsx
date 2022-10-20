import Roact, { createContext } from "@rbxts/roact";
import Hooks, { CoreHooks } from "@rbxts/roact-hooks";
import { RunService } from "@rbxts/services";
import { UnitDescriptor } from "shared/units";

interface SelectUnitContextValue {
	selectedUnitSlot: Readonly<UnitDescriptor | undefined>;
	setSelectedUnitSlot: Hooks.Dispatch<Hooks.BasicStateAction<UnitDescriptor | undefined>>;

	isPlacingUnit: Readonly<boolean>;
	setIsPlacingUnit: Hooks.Dispatch<Hooks.BasicStateAction<boolean>>;
}

const SelectUnitProvider: Hooks.FC = (props, { useState, useEffect }) => {
	const [selectedUnitSlot, setSelectedUnitSlot] = useState<UnitDescriptor | undefined>(undefined);
	const [isPlacingUnit, setIsPlacingUnit] = useState<boolean>(false);

	useEffect(() => {
		if (!RunService.IsRunning()) {
			return;
		}

		// const placementController = Dependency(PlacementController);

		// placementController.onPlaceBegan.Event.Connect(() => {
		// 	setIsPlacingUnit(true);
		// });

		// placementController.onPlaceEnded.Event.Connect(() => {
		// 	setIsPlacingUnit(false);
		// });
	}, []);

	return (
		<SelectUnitContext.Provider value={{ selectedUnitSlot, setSelectedUnitSlot, isPlacingUnit, setIsPlacingUnit }}>
			{props[Roact.Children]}
		</SelectUnitContext.Provider>
	);
};

export default new Hooks(Roact)(SelectUnitProvider);

const SelectUnitContext = createContext<SelectUnitContextValue | undefined>(undefined);

export const useSelectUnitContext = ({ useContext }: CoreHooks) => {
	const context = useContext(SelectUnitContext);
	if (!context) {
		error("useContext must be called within a Provider");
	}
	return context;
};
